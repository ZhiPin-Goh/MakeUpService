using MakeUpService.Service;
using MakeUpService.ViewModel.FeedbackVm;
using Microsoft.AspNetCore.Mvc;

namespace MakeUpService.Controllers
{
    public class FeedbackController : Controller
    {
        private readonly FeedbackService _services;
        public FeedbackController(FeedbackService services)
        {
            _services = services;
        }
        [Route("/feedback")]
        public IActionResult Feedback()
        {
            return View();
        }
        [HttpPost("feedback/submit")]
        public async Task<IActionResult> SubmitFeedback([FromBody] CreateFeedbackVm model)
        {
            var result = await _services.SubmitFeedbackAsync(model);
            if(result.IsSuccess)
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
