using MakeUpServiceAdmin.DTO;
using MakeUpServiceAdmin.DTO.AreaDto;
using MakeUpServiceAdmin.ViewModel.AreaVm;
using Newtonsoft.Json;

namespace MakeUpServiceAdmin.Service
{
    public class AreaService
    {
        private readonly HttpClient _httpClient;
        public AreaService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<List<GetAreaDto>> GetAllAreaAsync()
        {
            var response = await _httpClient.GetAsync("api/admin/areas/areas");
            if (response.IsSuccessStatusCode)
            {
                var areas = await response.Content.ReadFromJsonAsync<List<GetAreaDto>>();
                return areas ?? new List<GetAreaDto>();

            }
            else
            {
                throw new Exception($"Failed to retrieve areas. Status code: {response.StatusCode}");
            }
        }
        public async Task<List<GetAreaDto>> GetAllActiveAreaAsync()
        {
            var response = await _httpClient.GetAsync("api/admin/areas/active-areas");
            if (response.IsSuccessStatusCode)
            {
                var areas = await response.Content.ReadFromJsonAsync<List<GetAreaDto>>();
                return areas ?? new List<GetAreaDto> { new GetAreaDto() };
            }
            else
            {
                throw new Exception($"Failed to retrieve areas. Status code: {response.StatusCode}");
            }
        }
        public async Task<(bool IsSuccess, string message)> CreateAreaAsync(CreateAreaVm model, string idempotencyKey)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, "api/admin/areas/create");
            request.Headers.Add("X-Idempotency-Key", idempotencyKey);
            request.Content = JsonContent.Create(model);

            var response = await _httpClient.SendAsync(request);

            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (true, responseContent.Message ?? "Area created successfully.");
            }
            else
            {
                var errorResponse = await response.Content.ReadFromJsonAsync<ApiResponse>();
                throw new Exception(errorResponse?.Error ?? "Failed to create area.");
            }
        }
        public async Task<(bool IsSuccess, string message)> UpdateAreaAsync(UpdateServiceVm model)
        {
            var response = await _httpClient.PostAsJsonAsync("api/admin/areas/update", model);
            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (true, responseContent.Message ?? "Area updated successfully.");

            }
            else
            {
                var errorResponse = await response.Content.ReadFromJsonAsync<ApiResponse>();
                throw new Exception(errorResponse?.Error ?? "Failed to update area.");
            }
        }
        public async Task<(bool IsSuccess, string message)> ToggelAreaAsync(int areaID)
        {
            var response = await _httpClient.PostAsync($"api/admin/areas/toggle-status/{areaID}", null);
            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (true, responseContent.Message ?? "Area toggled successfully.");
            }
            else
            {
                var errorResponse = await response.Content.ReadFromJsonAsync<ApiResponse>();
                throw new Exception(errorResponse?.Message ?? "Failed to toggle area.");
            }
        }
    }
}
