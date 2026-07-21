using MakeUpServiceAdmin.DTO;
using MakeUpServiceAdmin.DTO.BannersDto;
using MakeUpServiceAdmin.ViewModel.BannerVm;

namespace MakeUpServiceAdmin.Service
{
    public class BannerService
    {
        private readonly HttpClient _httpClient;
        public BannerService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<List<GetAllBannersDto>> GetAllBannersAsync()
        {
            var response = await _httpClient.GetAsync("api/admin/banner/getbanners");
            if (response.IsSuccessStatusCode)
            {
                var banners = await response.Content.ReadFromJsonAsync<List<GetAllBannersDto>>();
                return banners ?? new List<GetAllBannersDto>();
            }
            else
            {
                return new List<GetAllBannersDto>();
            }
        }
        public async Task<BannerDetailsDto> GetBannerDetailsAsync(int bannerID)
        {
            var response = await _httpClient.GetAsync($"api/admin/banner/getbanner/{bannerID}");
            if (response.IsSuccessStatusCode)
            {
                var bannerDetails = await response.Content.ReadFromJsonAsync<BannerDetailsDto>();
                return bannerDetails ?? new BannerDetailsDto();
            }
            else
            {
                return new BannerDetailsDto();
            }
        }
        public async Task<(bool IsSuccess, string message)> CreateBannerAsync(CreateBannerVm model, string idempotencyKey)
        {
            var request = new HttpRequestMessage(HttpMethod.Post, "api/admin/banner/create");
            request.Headers.Add("X-Idempotency-Key", idempotencyKey);
            request.Content = new MultipartFormDataContent
            {
                { new StringContent(model.Title), "Title" },
                { new StreamContent(model.ImageUrl.OpenReadStream()), "ImageUrl", model.ImageUrl.FileName },
                { new StringContent(model.TargetUrl ?? string.Empty), "TargetUrl" }
            };
            var response = await _httpClient.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (true, responseContent.Message ?? "Banner created successfully.");
            }
            else
            {
                var errorResponse = await response.Content.ReadFromJsonAsync<ApiResponse>();
                throw new Exception(errorResponse?.Error ?? "Failed to create banner.");
            }
        }
        public async Task<(bool IsSuccess, string Message)> UpdateBannerAsync(UpdateBannerVm model)
        {
            var request = new HttpRequestMessage(HttpMethod.Put, "api/admin/banner/update");
            var content = new MultipartFormDataContent
            {
                { new StringContent(model.BannerID.ToString()), "BannerID" }
            };
            if (!string.IsNullOrEmpty(model.Title))
            {
                content.Add(new StringContent(model.Title), "Title");
            }
            if (model.ImageUrl != null)
            {
                content.Add(new StreamContent(model.ImageUrl.OpenReadStream()), "ImageUrl", model.ImageUrl.FileName);
            }
            if (!string.IsNullOrEmpty(model.TargetUrl))
            {
                content.Add(new StringContent(model.TargetUrl), "TargetUrl");
            }
            if (model.SortOrder.HasValue)
            {
                content.Add(new StringContent(model.SortOrder.Value.ToString()), "SortOrder");
            }
            request.Content = content;
            var response = await _httpClient.SendAsync(request);
            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (true, responseContent.Message ?? "Banner updated successfully.");
            }
            else
            {
                var errorResponse = await response.Content.ReadFromJsonAsync<ApiResponse>();
                throw new Exception(errorResponse?.Error ?? "Failed to update banner.");
            }
        }
        public async Task<(bool IsSuccess, string Message)> ToggleBannerAsync(int bannerID)
        {
            var response = await _httpClient.PostAsync($"api/admin/banner/toggle-status/{bannerID}", null);
            if (response.IsSuccessStatusCode)
            {
                var responseContent = await response.Content.ReadFromJsonAsync<ApiResponse>();
                return (true, responseContent.Message ?? "Banner status toggled successfully.");

            }
            else
            {
                var errorResponse = await response.Content.ReadFromJsonAsync<ApiResponse>();
                throw new Exception(errorResponse?.Error ?? "Failed to toggle banner status.");
            }
        }
    }
}
