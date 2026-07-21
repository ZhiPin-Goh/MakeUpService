using MakeUpServiceAdmin.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MakeUpServiceAdmin.Controllers
{
    [Authorize]
    public class DashboardController : Controller
    {
        private readonly DashboardService _services;
        public DashboardController(DashboardService services)
        {
            _services = services;
        }
        [Route("dashboard")]
        [HttpGet]
        public async Task<IActionResult> Dashboard()
        {
            var dashboardData = await _services.GetDashboardAsync();
            return View(dashboardData);
        }
    }
}
