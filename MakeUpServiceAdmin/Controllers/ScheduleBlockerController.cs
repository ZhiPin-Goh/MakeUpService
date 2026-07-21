using MakeUpServiceAdmin.Service;
using MakeUpServiceAdmin.ViewModel.ScheduleBlockerVm;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MakeUpServiceAdmin.Controllers
{
    [Authorize]
    public class ScheduleBlockerController : Controller
    {
        private readonly ScheduleBlockerService _scheduleBlockerService;
        public ScheduleBlockerController(ScheduleBlockerService scheduleBlockerService)
        {
            _scheduleBlockerService = scheduleBlockerService;
        }
        [Route("scheduleblocker")]
        [HttpGet]
        public async Task<IActionResult> GetAllScheduleBlocker()
        {
            var scheduleBlockers = await _scheduleBlockerService.GetScheduleBlockerAsync();
            return View(scheduleBlockers);
        }
        // Pop up for create schedule blocker design
        [HttpPost("create")]
        public async Task<IActionResult> CreateScheduleBlocker([FromBody] CreateVm model)
        {
            if(model.EndDate < model.StartDate)
            {
                return Json(new { success = false, message = "End date cannot be earlier than start date." });
            }
            var result = await _scheduleBlockerService.CreateScheduleBlockerAsync(model);
            if(result.IsSuccess)
            {
                return Json(new { success = true, message = result.Message });
            }
            else
            {
                return Json(new { success = false, message = result.Message });
            }
        }
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteScheduleBlocker(int id)
        {
            var result = await _scheduleBlockerService.DeleteScheduleBlockerAsync(id);
            if (result.IsSuccess)
            {
                return Json(new { success = true, message = result.Message });
            }
            else
            {
                return Json(new { success = false, message = result.Message });
            }
        }
    }
}
