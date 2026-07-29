namespace MakeUpService.Service
{
    public class BannersService
    {
        private readonly HttpClient _httpClient;
        public BannersService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }
        public class BannersDto
        {
            public string Title { get; set; }   
            public string ImageUrl { get; set; }
            public string TargetUrl { get; set; }
            public int SortOrder { get; set; }
        }
        public async Task<List<BannersDto>> GetAllBannersAsync()
        {
            var response = await _httpClient.GetAsync("api/user/banners/banners");
            if (response.IsSuccessStatusCode)
            {
                var banners = await response.Content.ReadFromJsonAsync<List<BannersDto>>();
                return banners ?? new List<BannersDto>();
            }
            else
            {
                return new List<BannersDto>();
            }
        }
    }
}
