using MakeUpServiceAdmin.DTO;
using MakeUpServiceAdmin.DTO.BookingDto;
using MakeUpServiceAdmin.DTO.ServiceDto;
using MakeUpServiceAdmin.ViewModel.ServiceVm;

namespace MakeUpServiceAdmin.Service
{
    public class MakeUpService
    {
        private readonly HttpClient _httpClient;
        public MakeUpService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<PaginatedResponse<ServiceDto>> SearchServiceAsync(SearchServiceVm model)
        {
            var queryParams = new List<string>();
            if (!string.IsNullOrEmpty(model.Name))
                queryParams.Add($"name={model.Name}");
            if (!string.IsNullOrEmpty(model.Status))
                queryParams.Add($"status={model.Status}");
            if (model.ServiceID.HasValue)
                queryParams.Add($"serviceID={model.ServiceID.Value}");
            if (model.MinPrice.HasValue)
                queryParams.Add($"minPrice={model.MinPrice.Value}");

            queryParams.Add($"pageNumber={model.PageNumber}");
            queryParams.Add($"pageSize={model.PageSize}");

            var queryString = queryParams.Any() ? "?" + string.Join("&", queryParams) : "";
            var response = await _httpClient.PostAsync($"api/admin/services/search{queryString}", null);
            if (response.IsSuccessStatusCode)
            {
                var services = await response.Content.ReadFromJsonAsync<PaginatedResponse<ServiceDto>>();
                return services;
            }
            else
            {
                return new PaginatedResponse<ServiceDto>();
            }
        }
        public async Task<ServiceDetailsDto> GetServiceDetailsAsync(int id)
        {
            var response = await _httpClient.GetAsync($"api/admin/services/details/{id}");
            if (response.IsSuccessStatusCode)
            {
                var serviceDetails = await response.Content.ReadFromJsonAsync<ServiceDetailsDto>();
                return serviceDetails;
            }
            else
            {
                return new ServiceDetailsDto();
            }
        }
        public async Task<(bool IsSuccess, string Message)> CreateServiceAsync(CreateServiceVm model, string idempotencyKey)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, "api/admin/services/create");
            request.Headers.Add("X-Idempotency-Key", idempotencyKey);
            request.Content = new MultipartFormDataContent
            {
                {new StringContent(model.Name), "Name" },
                {new StringContent(model.Description), "Description" },
                {new StringContent(model.Price.Value.ToString()), "Price" },
                {new StringContent(model.EstimatedDurationMinutes.Value.ToString()), "EstimatedDurationMinutes" },
                {new StreamContent(model.ImageUrl.OpenReadStream()), "ImageUrl", model.ImageUrl.FileName },
            };

            var response = await _httpClient.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (true, responseContent.Message ?? "Service created successfully");
            }
            else
            {
                var errorResponse = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (false, errorResponse.Error ?? "Failed to create service");
            }
        }
        public async Task<(bool IsSuccess, string Message)> UpdateServiceAsync(UpdateServiceVm model)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, "api/admin/services/update");
            var content = new MultipartFormDataContent
            {
                {new StringContent(model.ServiceID.ToString()), "ServiceID" }
            };
            if(!string.IsNullOrEmpty(model.Name))
            {
                content.Add(new StringContent(model.Name), "Name");
            }
            if(!string.IsNullOrEmpty(model.Description))
            {
                content.Add(new StringContent(model.Description), "Description");
            }
            if (model.Price.HasValue)
            {
                content.Add(new StringContent(model.Price.Value.ToString()), "Price");
            }
            if(model.EstimatedDurationMinutes.HasValue)
            {
                content.Add(new StringContent(model.EstimatedDurationMinutes.Value.ToString()), "EstimatedDurationMinutes");
            }
            if(model.ImageUrl != null)
            {
                content.Add(new StreamContent(model.ImageUrl.OpenReadStream()), "ImageUrl", model.ImageUrl.FileName);
            }
            request.Content = content;
            var response = await _httpClient.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return(true, responseContent.Message ?? "Service updated successfully");
            }
            else
            {
                var errorResponse = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (false, errorResponse.Error ?? "Failed to update service");
            }
        }
        public async Task<(bool IsSuccess, string Message)> ToggleServiceAsync(int id)
        {
            var response = await _httpClient.PostAsync($"api/admin/services/toggle-status/{id}", null);
            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return(true, responseContent.Message);
            }
            else
            {
                var errorResponse = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (false, errorResponse.Error);
            }
        }
    }
}
