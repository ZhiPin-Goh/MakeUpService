using MakeUpService.Dto.ServiceDto;

namespace MakeUpService.Service
{
    public class ClientMakeUpService
    {
        private readonly HttpClient _httpClient;
        public ClientMakeUpService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public async Task<List<ServiceDto>> GetAllServicesAsync()
        {
            var response = await _httpClient.GetAsync("api/user/services/services");
            if (response.IsSuccessStatusCode)
            {
                var services = await response.Content.ReadFromJsonAsync<List<ServiceDto>>();
                return services ?? new List<ServiceDto>();
            }
            else
            {
                return new List<ServiceDto>();
            }
        }
        public async Task<List<ServiceDto>> HomeServicesAsync()
        {
            var response = await _httpClient.GetAsync("api/user/services/random-services");
            if (response.IsSuccessStatusCode)
            {
                var services = await response.Content.ReadFromJsonAsync<List<ServiceDto>>();
                return services ?? new List<ServiceDto>();
            }
            else
            {
                return new List<ServiceDto>();
            }
        }
        public async Task<ServiceDetailsDto> GetServiceDetailsAsync(int id)
        {
            var response = await _httpClient.GetAsync($"api/user/services/service/{id}");
            if (response.IsSuccessStatusCode)
            {
                var serviceDetails = await response.Content.ReadFromJsonAsync<ServiceDetailsDto>();
                return serviceDetails ?? new ServiceDetailsDto();
            }
            else
            {
                return new ServiceDetailsDto();
            }
        }
    }
}
