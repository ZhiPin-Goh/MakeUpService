namespace MakeUpServiceAdmin.DTO.ScheduleBlockerDto
{
    public class ScheduleBlockerDto
    {
        public int ScheduleBlockerID { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool IsFullDay { get; set; }
        public string Reason { get; set; }
    }
}
