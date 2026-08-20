using MakeUpServiceAdmin.ViewModel.AuthVm;
using System.Net.Http.Headers;

namespace MakeUpServiceAdmin.Service
{
    public class AuthService
    {
        private readonly IConfiguration _config;
        private readonly HttpClient _httpClient;
        public AuthService(IConfiguration config, HttpClient httpClient)
        {
            _config = config;
            _httpClient = httpClient;
        }
        private string BaseUrl => _config["RestApi:BaseUrl"];
        public class LoginResponse
        {
            public bool Success { get; set; }
            public string? AccessToken { get; set; }
            public string? RefreshToken { get; set; }
            public string? Message { get; set; }
            public string? Error { get; set; }
        }
        public async Task<LoginResponse> LoginAsync(LoginVm model)
        {
            var loginDto = new LoginVm
            {
                UserName = model.UserName,
                Password = model.Password
            };
            var response = await _httpClient.PostAsJsonAsync($"{BaseUrl}api/admin/auth/login", loginDto);
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadFromJsonAsync<LoginResponse>();
                return result ?? new LoginResponse { Success = false, Message = "Invalid response from server." };
            }
            else
            {
                try
                {
                    var errorResponse = await response.Content.ReadFromJsonAsync<LoginResponse>();
                    return errorResponse ?? new LoginResponse { Success = false, Message = "Invalid response from server." };

                }
                catch (Exception ex)
                {
                    return new LoginResponse { Success = false, Message = $"Error parsing response: {ex.Message}" };
                }
            }
        }

        public async Task<bool> LogoutAsync(TokenRequestVm model)
        {
            var token = model.AccessToken;
            if (!string.IsNullOrEmpty(token))
            {
                _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            }

            var response = await _httpClient.PostAsJsonAsync($"{BaseUrl}api/admin/auth/revoke-token", model);
            if (response.IsSuccessStatusCode)
            {
                return true;
            }
            return false;
        }
    }
}
