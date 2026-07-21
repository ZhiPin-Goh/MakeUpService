using MakeUpServiceAdmin.DTO.DashbaordDto;

namespace MakeUpServiceAdmin.Service
{
    public class DashboardService
    {
        private readonly HttpClient _httpClient;
        public DashboardService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<DashboardDto> GetDashboardAsync()
        {
            var response = await _httpClient.GetAsync("api/admin/dashboard/stats");
            if(response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadFromJsonAsync<DashboardDto>();
                return result ?? new DashboardDto();
            }
            else
            {
                // Handle error response
                throw new Exception($"Error fetching dashboard stats: {response.ReasonPhrase}");
            }
        }
    }
}
