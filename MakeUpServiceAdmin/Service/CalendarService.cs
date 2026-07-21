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
            var response = await _httpClient.PostAsJsonAsync("api/admin/calendar/get-calendar", model);
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
