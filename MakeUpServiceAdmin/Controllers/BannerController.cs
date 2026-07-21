using MakeUpServiceAdmin.Service;
using MakeUpServiceAdmin.ViewModel.BannerVm;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MakeUpServiceAdmin.Controllers
{
    [Authorize]
    public class BannerController : Controller
    {
        private readonly BannerService _services;
        public BannerController(BannerService services)
        {
            _services = services;
        }
        [Route("get-all-banners")]
        [HttpGet]
        public async Task<IActionResult> GetAllBanners()
        {
            var banners = await _services.GetAllBannersAsync();
            return View(banners);
        }
        // Pop up details design
        [HttpGet("get-banner-details/{bannerID}")]
        public async Task<IActionResult> GetBannerDetails(int bannerID)
        {
            if (bannerID <= 0)
            {
                TempData["ErrorMessage"] = "Invalid banner ID.";
                return View();
            }
            var bannerDetails = await _services.GetBannerDetailsAsync(bannerID);
            return View(bannerDetails);
        }
        [Route("create-banner")]
        public IActionResult CreateBanner()
        {
            return View();
        }
        [HttpPost("create-banner")]
        public async Task<IActionResult> CreateBanner([FromForm] CreateBannerVm model, [FromHeader(Name = "X-Idempotency-Key")] string idempotencyKey)
        {
            if (!ModelState.IsValid)
            {
                return Json(new
                {
                    success = false,
                    message = "Invalid banner data."
                });
            }
            if (string.IsNullOrEmpty(model.TargetUrl))
            {
                model.TargetUrl = "#";
            }
            var result = await _services.CreateBannerAsync(model, idempotencyKey);
            if (result.IsSuccess)
            {
                return Json(new
                {
                    success = true,
                    message = result.message
                });
            }
            else
            {
                return Json(new
                {
                    success = false,
                    message = result.message
                });
            }
        }
        [Route("update-banner")]
        public IActionResult UpdateBanner(int bannerID)
        {
            return View();
        }
        [HttpPost("update-banner")]
        public async Task<IActionResult> UpdateBanner([FromForm] UpdateBannerVm model)
        {
            if (!ModelState.IsValid)
            {
                return Json(new
                {
                    success = false,
                    message = "Invalid banner data."
                });
            }
            if (model.BannerID <= 0)
            {
                return Json(new
                {
                    success = false,
                    message = "Invalid banner ID."
                });
            }
            var result = await _services.UpdateBannerAsync(model);
            if (result.IsSuccess)
            {
                return Json(new
                {
                    success = true,
                    message = result.Message
                });

            }
            else
            {
                return Json(new
                {
                    success = false,
                    message = result.Message
                });
            }
        }
        [HttpPost("toggle-banner/{bannerID}")]
        public async Task<IActionResult> ToggleBanner(int bannerID)
        {
            if (bannerID <= 0)
            {
                return Json(new
                {
                    success = false,
                    message = "Invalid banner ID."
                });
            }
            var result = await _services.ToggleBannerAsync(bannerID);
            if (result.IsSuccess)
            {
                return Json(new
                {
                    success = true,
                    message = result.Message
                });
            }
            else
            {
                return Json(new
                {
                    success = false,
                    message = result.Message
                });
            }
        }
    }
}
