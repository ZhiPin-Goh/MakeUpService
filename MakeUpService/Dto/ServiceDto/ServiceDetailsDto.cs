namespace MakeUpService.Dto.ServiceDto
{
    public class ServiceDetailsDto
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int EstimatedDurationMinutes { get; set; }
        public string ImageUrl { get; set; }
    }
}
