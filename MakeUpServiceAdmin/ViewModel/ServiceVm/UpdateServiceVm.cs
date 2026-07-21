namespace MakeUpServiceAdmin.ViewModel.ServiceVm
{
    public class UpdateServiceVm
    {
        public int ServiceID { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public int? EstimatedDurationMinutes { get; set; }
        public IFormFile? ImageUrl { get; set; }
    }
}
