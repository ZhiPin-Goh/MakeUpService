using MakeUpServiceAdmin.Service;
using MakeUpServiceAdmin.ViewModel.AreaVm;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MakeUpServiceAdmin.Controllers
{
    [Authorize]
    public class AreaController : Controller
    {
        private readonly AreaService _services;
        public AreaController(AreaService services)
        {
            _services = services;
        }
        [HttpGet("area/areas")]
        public async Task<IActionResult> GetAreas()
        {
            try
            {
                var areas = await _services.GetAllAreaAsync();
                return View(areas);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("api/areas/list")]
        public async Task<IActionResult> GetAreasList()
        {
            var areas = await _services.GetAllActiveAreaAsync();
            return Json(areas);
        }
        [Route("area/create-area")]
        public IActionResult CreateArea()
        {
            return View();
        }
        [HttpPost("area/create-area")]
        public async Task<IActionResult> CreateArea([FromBody] CreateAreaVm model, [FromHeader(Name = "X-Idempotency-Key")] string idempotencyKey)
        {
            if (model.Price <= 0)
            {
                return Json(new { success = false, message = "Price must be greater than zero." });
            }
            var response = await _services.CreateAreaAsync(model, idempotencyKey);
            if (response.IsSuccess)
            {
                return Json(new { success = true, message = response.message });
            }
            else
            {
                return Json(new { success = false, message = response.message });
            }
        }
        [Route("area/edit-area")]
        public IActionResult EditArea(int areaID)
        {
            return View();
        }
        // Update view use pop up design
        [HttpPost("area/update-area")]
        public async Task<IActionResult> UpdateArea([FromBody] UpdateServiceVm model)
        {
            if (!ModelState.IsValid)
            {
                return Json(new
                {
                    success = false,
                    message = "Invalid data."
                });
            }
            if (model.AreaID == 0)
            {
                return Json(new
                {
                    success = false,
                    message = "Area ID is required."
                });
            }
            if (model.BaseFee <= 0)
            {
                return Json(new
                {
                    success = false,
                    message = "Base fee must be greater than zero."
                });
            }
            var response = await _services.UpdateAreaAsync(model);
            if (response.IsSuccess)
            {
                return Json(new { success = true, message = response.message });
            }
            else
            {
                return Json(new { success = false, message = response.message });
            }
        }
        [HttpPost("area/toggle-area/{areaID}")]
        public async Task<IActionResult> ToggleArea(int areaID)
        {
            if (areaID == 0)
            {
                return Json(new
                {
                    success = false,
                    message = "Area ID is required."
                });
            }
            var response = await _services.ToggelAreaAsync(areaID);
            if (response.IsSuccess)
            {
                return Json(new { success = true, message = response.message });
            }
            else
            {
                return Json(new { success = false, message = response.message });
            }
        }
    }
}
