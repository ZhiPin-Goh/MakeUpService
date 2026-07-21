namespace MakeUpServiceAdmin.ViewModel.BannerVm
{
    public class CreateBannerVm
    {
        public string Title { get; set; }
        public IFormFile ImageUrl { get; set; }
        public string? TargetUrl { get; set; }
    }
}
