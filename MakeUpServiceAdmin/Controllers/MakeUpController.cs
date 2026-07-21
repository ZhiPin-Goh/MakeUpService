using MakeUpServiceAdmin.Service;
using MakeUpServiceAdmin.ViewModel.ServiceVm;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MakeUpServiceAdmin.Controllers
{
    [Authorize]
    public class MakeUpController : Controller
    {
        private readonly MakeUpService _services;
        public MakeUpController(MakeUpService services)
        {
            _services = services;
        }
        [Route("service")]
        [HttpGet]
        public async Task<IActionResult> SearchService(SearchServiceVm model)
        {
            model ??= new SearchServiceVm();
            var result = await _services.SearchServiceAsync(model);
            return View(result);
        }
        [Route("create")]
        public IActionResult CreateService()
        {
            return View();
        }
        [HttpPost("create")]
        public async Task<IActionResult> CreateService([FromForm]CreateServiceVm model, string idempotencyKey)
        {
            if (string.IsNullOrEmpty(idempotencyKey))
            {
                return Json(new
                {
                    success = false,
                    message = "Invalid banner data."
                });
            }
            var result = await _services.CreateServiceAsync(model, idempotencyKey);
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
        [Route("update-service")]
        public IActionResult UpdateService(int serviccID)
        {
            return View();
        }
        [HttpPost("upate")]
        public async Task<IActionResult> UpdateService([FromForm] UpdateServiceVm model)
        {
            if(model.ServiceID <=0)
            {
                return Json(new
                {
                    success = false,
                    message = "Invalid Service ID."
                });
            }
            var result = await _services.UpdateServiceAsync(model);
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
                    success = true,
                    message = result.Message
                });
            }
        }
        [HttpPost("toggle-status/{id}")]
        public async Task<IActionResult> ToggleService(int id)
        {
            if (id <= 0)
            {
                return Json(new
                {
                    success = false,
                    message = "Invalid Service ID."
                });
            }
            var result = await _services.ToggleServiceAsync(id);
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
