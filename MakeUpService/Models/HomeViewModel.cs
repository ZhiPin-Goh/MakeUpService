using MakeUpService.Dto.ServiceDto;
using static MakeUpService.Service.BannersService;

namespace MakeUpService.Models
{
    public class HomeViewModel
    {
        public List<BannersDto> Banners { get; set; } = new List<BannersDto>();
        public List<ServiceDto> Services { get; set; } = new List<ServiceDto>();
    }
}
