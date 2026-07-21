namespace MakeUpServiceAdmin.DTO.CalendarDto
{
    public class CalendarEventDto
    {
        public string ID { get; set; }
        public string Title { get; set; }
        public string Start { get; set; }
        public string End { get; set; }
        public string Color { get; set; }
        public bool AllDay { get; set; }
        public string EventType { get; set; }
    }
}
