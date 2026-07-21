namespace MakeUpServiceAdmin.DTO.ServiceDto
{
    public class ServiceDetailsDto
    {
        public int ServiceID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int EstimatedDurationMinutes { get; set; } //这个属性表示服务的预计持续时间，以分钟为单位。
        public string ImageUrl { get; set; }
        public string Status { get; set; }
    }
}   
