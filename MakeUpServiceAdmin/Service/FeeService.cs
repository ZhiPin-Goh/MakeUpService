using MakeUpServiceAdmin.DTO.TravelDto;
using MakeUpServiceAdmin.ViewModel.FeeVm;

namespace MakeUpServiceAdmin.Service
{
    public class FeeService
    {
        private readonly HttpClient _httpClient;
        public FeeService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<TravelFeeDto> CalculateTravelFeeAsync(TravelFeeRequestVm model)
        {
            var response = await _httpClient.PostAsJsonAsync("api/admin/fee/calculate", model);
            if (response.IsSuccessStatusCode)
            {
                var travelFeeDto = await response.Content.ReadFromJsonAsync<TravelFeeDto>();
                return travelFeeDto ?? new TravelFeeDto { IsSuccess = false, Error = "Failed to deserialize response." };
            }
            else
            {
                var errorContent = await response.Content.ReadFromJsonAsync<TravelFeeDto>();
                return new TravelFeeDto { IsSuccess = false, Error = errorContent?.Error ?? "An error occurred while calculating the travel fee." };
            }
        }
        public async Task<string> GetLocationSuggestionsAsync(string query, CancellationToken cancellationToken = default)
        {
            if(string.IsNullOrWhiteSpace(query) || query.Length < 3)
            {
                return "[]";
            }

            var response = await _httpClient.GetAsync($"api/admin/fee/location-suggestions?query={Uri.EscapeDataString(query)}", cancellationToken);
            response.EnsureSuccessStatusCode();

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadAsStringAsync(cancellationToken);
            }
            return "[]";
        }
    }
}
