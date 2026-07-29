using MakeUpService.Service;
using Microsoft.AspNetCore.Mvc;

namespace MakeUpService.Controllers
{
    public class AreaController : Controller
    {
        private readonly AreaService _services;
        public AreaController(AreaService services)
        {
            _services = services;
        }
        [HttpGet("area/areas")]
        public async Task<IActionResult> GetAllAreas()
        {
            var areas = await _services.GetAllAreasAsync();
            return Json(areas);
        }
    }
}
