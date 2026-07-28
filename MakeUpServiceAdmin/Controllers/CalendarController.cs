using MakeUpServiceAdmin.Service;
using MakeUpServiceAdmin.ViewModel.CalendarVm;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MakeUpServiceAdmin.Controllers
{
    [Authorize]
    public class CalendarController : Controller
    {
        private readonly CalendarService _services;
        public CalendarController(CalendarService services)
        {
            _services = services;
        }
        [Route("calendar/calendar-event")]
        [HttpGet]
        public async Task<IActionResult> CalendarEvent(SelectDateVm model)
        {
            var events = await _services.CalendarEventAsync(model);
            return View(events);
        }

        [HttpGet("calendar/api/events")]
        public async Task<IActionResult> GetEventsApi(DateTime start, DateTime end)
        {
            var model = new SelectDateVm { Start = start, End = end };
            var events = await _services.CalendarEventAsync(model);
            return Json(events);
        }
    }
}
