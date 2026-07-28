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
            var response = await _httpClient.GetAsync("api/admin/notifications/unreadcount");
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
            var response = await _httpClient.GetAsync("api/admin/notifications/unread");
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
        public class MarkAsReadResponse
        {
            public string Message { get; set; }
            public NotificationDto Notification { get; set; }
        }

        public async Task<NotificationDto> MarkAsReadAsync(int notificationID)
        {
            var response = await _httpClient.PostAsJsonAsync("api/admin/notifications/markasread", new { notificationID });
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadFromJsonAsync<MarkAsReadResponse>();
                return result?.Notification;
            }
            else
            {
                throw new Exception($"Failed to mark notification as read. Status code: {response.StatusCode}");
            }
        }
    }
}
