using System.ComponentModel.DataAnnotations;

namespace MakeUpServiceAdmin.ViewModel.BookingVm
{
    public class ToggleBookingVm
    {
        [Required]
        public int BookingID { get; set; }
        [Required]
        public string Status { get; set; }
    }
}
