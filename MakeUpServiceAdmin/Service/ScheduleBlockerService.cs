using MakeUpServiceAdmin.DTO;
using MakeUpServiceAdmin.DTO.ScheduleBlockerDto;
using MakeUpServiceAdmin.ViewModel.ScheduleBlockerVm;

namespace MakeUpServiceAdmin.Service
{
    public class ScheduleBlockerService
    {
        private readonly HttpClient _httpClient;
        public ScheduleBlockerService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<List<ScheduleBlockerDto>> GetScheduleBlockerAsync()
        {
            var response = await _httpClient.GetAsync("api/admin/schedule-blocker/schedule-blockers");
            if (response.IsSuccessStatusCode)
            {
                var scheduleBlockers = await response.Content.ReadFromJsonAsync<List<ScheduleBlockerDto>>();
                return scheduleBlockers ?? new List<ScheduleBlockerDto>();
            }
            else
            {
                return new List<ScheduleBlockerDto>();
            }
        }
        public async Task<(bool IsSuccess, string Message)> CreateScheduleBlockerAsync(CreateVm model)
        {
            var response = await _httpClient.PostAsJsonAsync("api/admin/schedule-blocker/create", model);
            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (true, responseContent?.Message ?? "Schedule blocker created successfully.");
            }
            else
            {
                var errorContent = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (false, errorContent?.Message ?? "Failed to create schedule blocker.");
            }
        }
        public async Task<(bool IsSuccess, string Message)> DeleteScheduleBlockerAsync(int id)
        {
            var response = await _httpClient.DeleteAsync($"api/admin/schedule-blocker/delete/{id}");
            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (true, responseContent?.Message ?? "Schedule blocker deleted successfully.");

            }
            else
            {
                var errorContent = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (false, errorContent?.Message ?? "Failed to delete schedule blocker.");
            }
        }
    }
}
