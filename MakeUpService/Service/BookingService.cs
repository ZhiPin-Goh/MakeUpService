using MakeUpService.Dto;
using MakeUpService.Dto.BookingDto;
using MakeUpService.ViewModel.BookingVm;

namespace MakeUpService.Service
{
    public class BookingService
    {
        private readonly HttpClient _httpClient;
        public BookingService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<string> GetLocationSuggestionsAsync(string query, CancellationToken cancellationToken = default)
        {
            if (string.IsNullOrWhiteSpace(query) || query.Length < 3)
            {
                return "[]";
            }

            var response = await _httpClient.GetAsync($"api/user/booking/complete-location?query={Uri.EscapeDataString(query)}", cancellationToken);
            response.EnsureSuccessStatusCode();

            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadAsStringAsync(cancellationToken);
            }
            return "[]";
        }
        public async Task<BookingPriceDto> CalculateBookingPriceAsync(CalculateBookingPriceVm model)
        {
            var response = await _httpClient.PostAsJsonAsync("api/user/booking/booking-price", model);
            if (response.IsSuccessStatusCode)
            {
                var bookingPrice = await response.Content.ReadFromJsonAsync<BookingPriceDto>();
                return bookingPrice;
            }
            else
            {
                var errorContent = await response.Content.ReadFromJsonAsync<ApiResponse>();
                throw new Exception($"Error calculating booking price: {errorContent?.Error ?? "Unknown error"}");
            }
        }
        public async Task<(bool IsSuccess, string Message)> CreateBookingAsync(CreateBookingVm model, string idempotencyKey)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, "api/user/booking/create")
            {
                Content = JsonContent.Create(model)
            };
            request.Headers.Add("X-Idempotency-Key", idempotencyKey);
            var response = await _httpClient.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (true, responseContent?.Message ?? "Booking created successfully.");
            }
            else
            {
                var errorContent = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (false, errorContent?.Message ?? "An error occurred while creating the booking.");
            }
        }
    }
}
