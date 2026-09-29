using MakeUpServiceAdmin.Service;
using MakeUpServiceAdmin.ViewModel.FeedbackVm;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MakeUpServiceAdmin.Controllers
{
    [Authorize]
    public class FeedbackController : Controller
    {
        private readonly FeedbackService _services;
        public FeedbackController(FeedbackService services)
        {
            _services = services;
        }
        [Route("feedback")]
        [HttpGet]
        public async Task<IActionResult> Feedback(SearchFeedbackVm model)
        {
            model ??= new SearchFeedbackVm();
            var result = await _services.SearchFeedbackAsync(model);
            return View(result);
        }
        // Use pop up modal to show feedback details and resolve feedback
        [HttpGet("feedback/details/{feedbackID}")]
        public async Task<IActionResult> FeedbackDetails(int feedbackID)
        {
            if(feedbackID <= 0)
            {
                ViewBag.ErrorMessage = "Invalid feedback ID.";
                return View();
            }
            var result = await _services.GetFeedbackDetailsAsync(feedbackID);
            return View(result);
        }
        // Open the details run the resolve feedback function, and return the result to the modal
        [HttpPost("feedback/resolve")]
        public async Task<IActionResult> FeedbackResolve(int feedbackID)
        {
            if (feedbackID <= 0)
            {
                return Json(new { success = false, message = "Invalid feedback ID." });
            }
           var result = await _services.FeedbackResolveAsync(feedbackID);
            return Json(new { success = result.IsSuccess});
        }
        [HttpPost("feedback/clear-resolve")]
        public async Task<IActionResult> ClearResolvedFeedback()
        {
            var result = await _services.ClearResolveFeedbackAsync();
            return Json(new { success = result.IsSuccess, message = result.Message });
        }
    }
}
