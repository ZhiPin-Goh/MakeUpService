using MakeUpServiceAdmin.Service;
using MakeUpServiceAdmin.ViewModel.FeeVm;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MakeUpServiceAdmin.Controllers
{
    [Authorize]
    public class FeeController : Controller
    {
        private readonly FeeService _services;
        public FeeController(FeeService services)
        {
            _services = services;
        }
        [Route("fee/calculate-travel-fee")]
        public IActionResult SearchFee()
        {
            return View();
        }
        [HttpPost("fee/calculate-travel-fee")]
        public async Task<IActionResult> CalculateTravelFee([FromBody] TravelFeeRequestVm model)
        {
            if (!ModelState.IsValid)
            {
                return Json(new
                {
                    IsSuccess = false,
                    Message = "Invalid request data."
                });
            }
            var result = await _services.CalculateTravelFeeAsync(model);
            if (result.IsSuccess)
            {
                return Json(new
                {
                    IsSuccess = true,
                    TravelFee = result.TravelFee,
                    DistanceKm = result.DistanceKm,
                    DistanceFee = result.DistanceFee,
                    AreaFee = result.AreaFee
                });
            }
            else
            {
                return Json(new
                {
                    IsSuccess = false,
                    Message = result.Error ?? "An error occurred while calculating the travel fee."
                });
            }
        }
        [HttpGet("fee/searchlocation")]
        public async Task<IActionResult> SearchLocation(string query, CancellationToken cancellationToken)
        {
            string jsonString = await _services.GetLocationSuggestionsAsync(query, cancellationToken);
            
            return Content(jsonString, "application/json");
        }
    }
}
