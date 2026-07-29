using MakeUpService.Service;
using Microsoft.AspNetCore.Mvc;

namespace MakeUpService.Controllers
{
    public class BannersController : Controller
    {
        private readonly BannersService _services;
        public BannersController(BannersService services)
        {
            _services = services;
        }
        [HttpGet("banners/banners")]
        public async Task<IActionResult> GetAllBanners()
        {
            var banners = await _services.GetAllBannersAsync();
            return Json(banners);
        }
    }
}
