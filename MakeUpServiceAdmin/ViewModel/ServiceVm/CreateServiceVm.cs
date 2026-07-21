namespace MakeUpServiceAdmin.ViewModel.ServiceVm
{
    public class CreateServiceVm
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal? Price { get; set; }
        public IFormFile? ImageUrl { get; set; }
        public int? EstimatedDurationMinutes { get; set; }
    }
}
