namespace MakeUpServiceAdmin.DTO.ServiceDto
{
    public class ServiceDto
    {
        public int ServiceID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public decimal Price { get; set; }
        public int EstimatedDurationMinutes { get; set; }
        public string Status { get; set; }
    }
}
