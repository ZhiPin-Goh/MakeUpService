namespace MakeUpServiceAdmin.DTO.DashbaordDto
{
    public class DashboardDto
    {
        public int PendingCount { get; set; }
        public int TodayCount { get; set; }
        public int UnreadFeedbackCount { get; set; }
        public decimal mMnthRevenus { get; set; }
        public List<UpcommingDto> UpComing { get; set; } = new List<UpcommingDto>();
        public List<TopServiceDto> TopServicesType { get; set; } = new List<TopServiceDto>();
    }
    public class UpcommingDto
    {
        public int BookingID { get; set; }
        public DateTime AppointmentDate { get; set; }
        public string LocationAddress { get; set; }
        public string ServiceName { get; set; }
        public string Status { get; set; }
    }
    public class TopServiceDto
    {
        public string ServiceName { get; set; }
        public int Count { get; set; }
    }
}
