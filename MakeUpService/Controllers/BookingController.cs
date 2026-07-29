using MakeUpService.Service;
using MakeUpService.ViewModel.BookingVm;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace MakeUpService.Controllers
{
    public class BookingController : Controller
    {
        private readonly BookingService _services;
        public BookingController(BookingService services)
        {
            _services = services;
        }
        [Route("booking/my-bookings")]
        public IActionResult Booking()
        {
            return View();
        }
        [HttpGet("booking/price")]
        public async Task<IActionResult> GetBookingPrice([FromBody] CalculateBookingPriceVm model)
        {
            var result = await _services.CalculateBookingPriceAsync(model);
            return Json(result);
        }
        [HttpPost("booking/submit")]
        public async Task<IActionResult> SubmitBooking([FromBody] CreateBookingVm model, [FromHeader(Name = "X-Idempotency-Key")] string idempotencyKey)
        {
        
            if (string.IsNullOrEmpty(idempotencyKey))
            {
                return Json(new
                {
                    success = false,
                    message = "Idempotency key is required."
                });
            }
            string phonePattern = @"^01[0-9]\d{7,8}$";
            string emailPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
            if (!Regex.IsMatch(model.PhoneNumber, phonePattern))
            {
                return Json(new
                {
                    success = false,
                    message = "Invalid phone number format"
                });
            }
            if (!Regex.IsMatch(model.Email, emailPattern))
            {
                return Json(new
                {
                    success = false,
                    message = "Invalid email format"
                });
            }
            var result = await _services.CreateBookingAsync(model, idempotencyKey);
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
