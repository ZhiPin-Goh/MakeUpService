using MakeUpServiceAdmin.DTO;
using MakeUpServiceAdmin.DTO.FeedbackDto;
using MakeUpServiceAdmin.ViewModel.FeedbackVm;

namespace MakeUpServiceAdmin.Service
{
    public class FeedbackService
    {
        private readonly HttpClient _httpClient;
        public FeedbackService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<PaginatedResponse<FeedbackSummaryDto>> SearchFeedbackAsync(SearchFeedbackVm model)
        {
            var queryParams = new List<string>();
            if (model.FeedbackID.HasValue)
                queryParams.Add($"feedbackID={model.FeedbackID.Value}");
            if (!string.IsNullOrEmpty(model.Name))
                queryParams.Add($"name={model.Name}");
            if (model.CreatedAt.HasValue)
                queryParams.Add($"createdAt={model.CreatedAt.Value.ToString("yyyy-MM-dd")}");
            if (model.IsResolved.HasValue)
                queryParams.Add($"isResolved={model.IsResolved.Value}");

            queryParams.Add($"pageNumber={model.PageNumber}");
            queryParams.Add($"pageSize={model.PageSize}");

            var queryString = queryParams.Any() ? "?" + string.Join("&", queryParams) : "";
            var response = await _httpClient.PostAsync($"api/admin/feedback/search{queryString}", null);
            if (response.IsSuccessStatusCode)
            {
                var paginatedResponse = await response.Content.ReadFromJsonAsync<PaginatedResponse<FeedbackSummaryDto>>();
                return paginatedResponse;

            }
            else
            {
                return new PaginatedResponse<FeedbackSummaryDto>();
            }
        }
        public async Task<FeedbackDetailsDto> GetFeedbackDetailsAsync(int feedbackID)
        {
            var response = await _httpClient.GetAsync($"api/admin/feedback/details/{feedbackID}");
            if (response.IsSuccessStatusCode)
            {
                var feedbackDetails = await response.Content.ReadFromJsonAsync<FeedbackDetailsDto>();
                return feedbackDetails ?? new FeedbackDetailsDto();
            }
            else
            {
                throw new Exception($"Failed to retrieve feedback details. Status code: {response.StatusCode}");
            }
        }
        public async Task<(bool IsSuccess, string Message)> FeedbackResolveAsync(int feedbackID)
        {
            var response = await _httpClient.PostAsync($"api/admin/feedback/resolve/{feedbackID}", null);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (true, content?.Message ?? "Feedback resolved successfully.");
            }
            else
            {
                var errorMessage = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (false, errorMessage?.Message ?? $"Failed to resolve feedback. Status code: {response.StatusCode}");
            }
        }
    }
}
