using MakeUpServiceAdmin.DTO;
using MakeUpServiceAdmin.DTO.SettingsDto;
using MakeUpServiceAdmin.ViewModel.SettingVm;

namespace MakeUpServiceAdmin.Service
{
    public class SettingService
    {
        private readonly HttpClient _httpClient;
        public SettingService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<List<SettingDto>> GetSettingsAsync()
        {
            var response = await _httpClient.GetAsync("api/admin/settingsadmin/get-settings");
            if (response.IsSuccessStatusCode)
            {
                var settings = await response.Content.ReadFromJsonAsync<List<SettingDto>>();
                return settings ?? new List<SettingDto>();
            }
            else
            {
                // Handle error response
                return new List<SettingDto>();
            }
        }
        public async Task<SettingDto> GetSettingDetailsAsync(string key)
        {
            var response = await _httpClient.GetAsync($"api/admin/settingsadmin/get-setting/{key}");
            if (response.IsSuccessStatusCode)
            {
                var setting = await response.Content.ReadFromJsonAsync<SettingDto>();
                return setting ?? new SettingDto();
            }
            else
            {
                return new SettingDto();
            }
        }
        public async Task<(bool IsSuccess, string Message)> UpdateSettingAsync(SettingVm model)
        {
            var response = await _httpClient.PutAsJsonAsync("api/admin/settingsadmin/update-setting", model);
            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (true, responseContent?.Message ?? "Setting updated successfully.");
            }
            else
            {
                var errorMessage = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (false, errorMessage?.Error ?? "Failed to update setting.");
            }
        }
    }
}
