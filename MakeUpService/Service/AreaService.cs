
namespace MakeUpService.Service
{
    public class AreaService
    {
        private readonly HttpClient _httpClient;
        public AreaService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public class AreaDto
        {
            public int AreaID { get; set; }
            public string Name { get; set; }
            public decimal BasePrice { get; set; }
        }
        public async Task<List<AreaDto>> GetAllAreasAsync()
        {
            var response = await _httpClient.GetAsync("api/user/area/areas");
            if (response.IsSuccessStatusCode)
            {
                var areas = await response.Content.ReadFromJsonAsync<List<AreaDto>>();
                return areas ?? new List<AreaDto>();
            }
            else
            {
                return new List<AreaDto>();
            }
        }
    }
}
