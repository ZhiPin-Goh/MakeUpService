namespace MakeUpServiceAdmin.ViewModel.BannerVm
{
    public class UpdateBannerVm
    {
        public int BannerID { get; set; }
        public string? Title { get; set; }
        public IFormFile? ImageUrl { get; set; }
        public string? TargetUrl { get; set; }
        public int? SortOrder { get; set; }
    }
}
