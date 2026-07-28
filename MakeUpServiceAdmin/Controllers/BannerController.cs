using MakeUpServiceAdmin.Service;
using MakeUpServiceAdmin.ViewModel.BannerVm;
using MakeUpServiceAdmin.Views.Banner;
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
        [Route("banners/get-all-banners")]
        [HttpGet]
        public async Task<IActionResult> GetAllBanners()
        {
            var banners = await _services.GetAllBannersAsync();
            return View(banners);
        }
        [Route("banners/create-banner")]
        public IActionResult CreateBanner()
        {
            return View();
        }
        [HttpPost("banners/create-banner")]
        public async Task<IActionResult> CreateBanner([FromForm] CreateBannerVm model, [FromHeader(Name = "X-Idempotency-Key")] string idempotencyKey)
        {
            if (string.IsNullOrEmpty(model.TargetUrl))
            {
                model.TargetUrl = "#";
            }
            else if (!model.TargetUrl.StartsWith("http://") && !model.TargetUrl.StartsWith("https://") && model.TargetUrl != "#")
            {
                model.TargetUrl = "https://" + model.TargetUrl;
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
        [Route("banners/update-banner")]
        public IActionResult UpdateBanner(int bannerID)
        {
            return View();
        }
        [HttpPost("banners/update-banner")]
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
            if (!string.IsNullOrEmpty(model.TargetUrl) && !model.TargetUrl.StartsWith("http://") && !model.TargetUrl.StartsWith("https://") && model.TargetUrl != "#")
            {
                model.TargetUrl = "https://" + model.TargetUrl;
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
        [HttpPost("banners/toggle-banner/{bannerID}")]
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
        [HttpPost("banners/update-sort-order")]
        public async Task<IActionResult> UpdateSortOrder([FromBody] List<UpdateBannerSortOrderVm> model)
        {
            if (model == null || !model.Any())
            {
                return Json(new { success = false, message = "Invalid data." });
            }
            try
            {
                var result = await _services.UpdateBannersSortOrderAsync(model);
                return Json(new { success = result.IsSuccess, message = result.Message });
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex.Message });
            }
        }
    }
}
