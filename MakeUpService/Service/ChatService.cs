using MakeUpService.ChatRequest;
using MakeUpService.Dto;

namespace MakeUpService.Service
{
    public class ChatService
    {
        private readonly HttpClient _httpClient;
        public ChatService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
       
        public class ChatResponseDto
        {
            public string Reply { get; set; }
        }
        public async Task<(bool IsSuccess, string Reply)> SendMessageAsync(AiChatRequest model)
        {
            var response = await _httpClient.PostAsJsonAsync("api/chat/send", model);
            if (response.IsSuccessStatusCode)
            {
                var chatResponse = await response.Content.ReadFromJsonAsync<ChatResponseDto>();
                return (true, chatResponse?.Reply ?? string.Empty);
            }
            else
            {
                var errorContent = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (false, errorContent?.Message ?? string.Empty);
            }
        }
    }
}
