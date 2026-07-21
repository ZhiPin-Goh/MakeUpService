using System.ComponentModel.DataAnnotations;

namespace MakeUpServiceAdmin.ViewModel.FeeVm
{
    public class TravelFeeRequestVm
    {
        public int? AreaID { get; set; }
        [Required]
        public string ClientAddress { get; set; }
    }
}
