using MakeUpServiceAdmin.DTO;
using MakeUpServiceAdmin.DTO.BookingDto;
using MakeUpServiceAdmin.ViewModel.BookingVm;

namespace MakeUpServiceAdmin.Service
{
    public class BookingService
    {
        private readonly HttpClient _httpClient;
        public BookingService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }   
        public async Task<PaginatedResponse<BookingSummaryDto>> SearchBookingAsync(SearchBookingVm model)
        {
          var queryParams = new List<string>();
            if (!string.IsNullOrEmpty(model.PhoneNumber))
                queryParams.Add($"phoneNumber={model.PhoneNumber}");
            if(!string.IsNullOrEmpty(model.Status))
                queryParams.Add($"status={model.Status}");
            if (model.BookingID.HasValue)
                queryParams.Add($"bookingID={model.BookingID.Value}");
            if (model.ServiceID.HasValue)
                queryParams.Add($"serviceID={model.ServiceID.Value}");
            if(model.AreaID.HasValue)
                queryParams.Add($"areaID={model.AreaID.Value}");
            if(model.AppointmentDate.HasValue)
                queryParams.Add($"startDate={model.AppointmentDate.Value:yyyy-MM-dd}");

            queryParams.Add($"pageNumber={model.PageNumber}");
            queryParams.Add($"pageSize={model.PageSize}");

            var queryString = queryParams.Any() ? "?" + string.Join("&", queryParams) : "";
            var response = await _httpClient.PostAsync($"api/admin/bookings/search{queryString}", null);
            if (response.IsSuccessStatusCode)
            {
                var bookings = await response.Content.ReadFromJsonAsync<PaginatedResponse<BookingSummaryDto>>();
                return bookings ?? new PaginatedResponse<BookingSummaryDto> { Data = new List<BookingSummaryDto>() };
            }

            return new PaginatedResponse<BookingSummaryDto> { Data = new List<BookingSummaryDto>() };

        }
        public async Task<BookingDetailsDto> GetBookingDetailsAsync(int bookingID)
        {
            var response = await _httpClient.GetAsync($"api/admin/bookings/details/{bookingID}");
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadFromJsonAsync<BookingDetailsDto>();
                return result;
            }
            else
            {
                throw new Exception($"Failed to get booking details. Status code: {response.StatusCode}");
            }
        }
        public async Task<(bool IsSuccess, string Message)> CreateBookingAsync(CreateBookingVm model, string idempotencyKey)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, "api/admin/bookings/manual-booking")
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
                var errorMessage = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (false, errorMessage?.Message ?? $"Failed to create booking. Status code: {response.StatusCode}");
            }
        }
        public async Task<(bool IsSuccess, string Message)> ToggleBookingAsync(ToggleBookingVm model)
        {
            var response = await _httpClient.PostAsJsonAsync("api/admin/bookings/toggle-status", model);
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (true, result?.Message ?? "Booking status updated successfully.");
            }
            else
            {
                var errorMessage = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (false, errorMessage?.Message ?? "Failed to update booking status.");
            }
        }
    }
}
