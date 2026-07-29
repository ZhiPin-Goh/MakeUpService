using MakeUpService.Dto;
using MakeUpService.ViewModel.FeedbackVm;

namespace MakeUpService.Service
{
    public class FeedbackService
    {
        private readonly HttpClient _httpClient;
        public FeedbackService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<(bool IsSuccess, string Message)> SubmitFeedbackAsync(CreateFeedbackVm model)
        {
            var response = await _httpClient.PostAsJsonAsync("api/user/feedbacks/submit", model);
            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadFromJsonAsync<ApiResponse>();
                
                return (true, responseContent?.Message ?? "Feedback submitted successfully.");
            }
            else
            {
                var errorContent = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (false, errorContent?.Error ?? "An error occurred while submitting feedback.");
            }
        }
    }
}
