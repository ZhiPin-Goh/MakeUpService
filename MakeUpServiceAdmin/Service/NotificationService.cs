using MakeUpServiceAdmin.DTO.NotificationDto;

namespace MakeUpServiceAdmin.Service
{
    public class NotificationService
    {
        private readonly HttpClient _httpClient;
        public NotificationService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<int> UnreadCountAsync()
        {
            var response = await _httpClient.GetAsync("api/admin/notification/unreadcount");
            if (response.IsSuccessStatusCode)
            {
                var count = await response.Content.ReadFromJsonAsync<int>();
                return count;
            }
            else
            {
                return 0;
            }
        }
        public async Task<List<NotificationDto>> GetNotificationsAsync()
        {
            var response = await _httpClient.GetAsync("api/admin/notification/unread");
            if (response.IsSuccessStatusCode)
            {
                var notifications = await response.Content.ReadFromJsonAsync<List<NotificationDto>>();
                return notifications ?? new List<NotificationDto>();
            }
            else
            {
                return new List<NotificationDto>();
            }
        }
        public async Task<NotificationDto> MarkAsReadAsync(int notificationID)
        {
            var response = await _httpClient.PostAsJsonAsync("api/admin/notification/markasread", new { notificationID });
            if (response.IsSuccessStatusCode)
            {
                var notification = await response.Content.ReadFromJsonAsync<NotificationDto>();
                return notification;

            }
            else
            {
                throw new Exception($"Failed to mark notification as read. Status code: {response.StatusCode}");
            }
        }
    }
}
