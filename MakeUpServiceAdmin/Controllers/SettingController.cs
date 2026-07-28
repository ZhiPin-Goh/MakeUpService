using MakeUpServiceAdmin.Service;
using MakeUpServiceAdmin.ViewModel.SettingVm;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MakeUpServiceAdmin.Controllers
{
    [Authorize]
    public class SettingController : Controller
    {
        private readonly SettingService _services;
        public SettingController(SettingService services)
        {
            _services = services;
        }
        [Route("settings/system-settings")]
        [HttpGet]
        public async Task<IActionResult> GetSettings()
        {
            var result = await _services.GetSettingsAsync();
            return View(result);
        }
        [HttpGet("setting/settings-details/{key}")]
        public async Task<IActionResult> GetSettingDetails(string key)
        {
            if (string.IsNullOrEmpty(key))
            {
                return Json(new { success = false, message = "Key is required." });
            }

            var result = await _services.GetSettingDetailsAsync(key);
            return View(result);
        }
        [HttpPost("settings/update")]
        public async Task<IActionResult> UpdateSetting([FromBody] SettingVm model)
        {
            if (string.IsNullOrEmpty(model.Key))
            {
                return Json(new
                {
                    success = false,
                    message = "Key is required."
                });
            }
            var result = await _services.UpdateSettingAsync(model);
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
