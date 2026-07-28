using MakeUpServiceAdmin.DTO.CalendarDto;
using MakeUpServiceAdmin.ViewModel.CalendarVm;

namespace MakeUpServiceAdmin.Service
{
    public class CalendarService
    {
        private readonly HttpClient _httpClient;
        public CalendarService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<List<CalendarEventDto>> CalendarEventAsync(SelectDateVm model)
        {
            var startStr = model.Start.ToString("yyyy-MM-dd");
            var endStr = model.End.ToString("yyyy-MM-dd");
            var response = await _httpClient.GetAsync($"api/admin/calendar/get-calendar?Start={startStr}&End={endStr}");
            
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadFromJsonAsync<List<CalendarEventDto>>();
                return result ?? new List<CalendarEventDto>();
            }
            else
            {
                // Handle error response
                throw new Exception($"Error fetching calendar events: {response.ReasonPhrase}");
            }
        }
    }
}
