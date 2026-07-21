using System.ComponentModel.DataAnnotations;

namespace MakeUpServiceAdmin.ViewModel.ScheduleBlockerVm
{
    public class CreateVm
    {
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        [Required]
        public bool IsFullDay { get; set; }
        public string? Reason { get; set; }
    }
}
