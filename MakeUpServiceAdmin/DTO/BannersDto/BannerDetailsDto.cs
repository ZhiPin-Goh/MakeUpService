namespace MakeUpServiceAdmin.DTO.BannersDto
{
    public class BannerDetailsDto
    {
        public int BannersID { get; set; }
        public string Title { get; set; }
        public string ImageUrl { get; set; }
        public string Status { get; set; }
        public int SortOrder { get; set; }
        public string TargetUrl { get; set; }
    }
}
