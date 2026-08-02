using MakeUpServiceAdmin.Service;
using MakeUpServiceAdmin.ViewModel.BookingVm;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace MakeUpServiceAdmin.Controllers
{
    [Authorize]
    public class BookingController : Controller
    {
        private readonly BookingService _services;
        public BookingController(BookingService services)
        {
            _services = services;
        }
        [Route("bookings")]
        public ActionResult Booking()
        {
            return View();
        }
        [Route("bookings/search")]
        [HttpGet]
        public async Task<IActionResult> SearchBooking(SearchBookingVm model)
        {
            model ??= new SearchBookingVm();
            var result = await _services.SearchBookingAsync(model);
            return View(result);
        }

        // Pop up details design
        [Route("bookings/details/{bookingID}")]
        [HttpGet]
        public async Task<IActionResult> GetBookingDetails(int bookingID)
        {
            if (bookingID <= 0)
            {
                return Json(new { success = false, message = "Invalid booking ID." });
            }
            var result = await _services.GetBookingDetailsAsync(bookingID);
            return Json(result);
        }
        [Route("bookings/create")]
        public IActionResult CreateBooking()
        {
            return View();
        }
        [HttpPost("bookings/create")]
        public async Task<IActionResult> CreateBooking([FromBody] CreateBookingVm model, [FromHeader(Name = "X-Idempotency-Key")] string idempotencyKey)
        {
            if (model == null)
            {
                return Json(new
                {
                    success = false,
                    error = "Invalid booking data format. Please check the time and date fields."
                });
            }

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
            if (model.Pax < 1 || model.Pax > 5)
            {
                return Json(new
                {
                    success = false,
                    message = "Pax must be between 1 and 5"
                });
            }
            if (model.AppointmentDate < DateTime.Today)
            {
                return Json(new
                {
                    success = false,
                    message = "Appointment date cannot be in the past"
                });
            }

            var result = await _services.CreateBookingAsync(model, idempotencyKey);
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
        // Booking Status: Pending(default booking), Approved, Rejected, Completed, Cancelled
        [HttpPost("bookings/toggle-status")]
        public async Task<IActionResult> ToggleBooking([FromBody] ToggleBookingVm model)
        {
            if (model.BookingID <= 0)
            {
                return Json(new
                {
                    success = false,
                    error = "Invalid booking ID"
                });
            }
            var result = await _services.ToggleBookingAsync(model);
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
        [HttpPost("bookings/update-travel-fee")]
        public async Task<IActionResult> UpdateTravelFee([FromBody] UpdateTravelFeeVm model)
        {
            if (model.BookingID <= 0)
            {
                return Json(new
                {
                    success = false,
                    error = "Invalid booking ID"
                });
            }
            if (model.NewTravelFee < 0)
            {
                return Json(new
                {
                    success = false,
                    error = "Travel fee cannot be negative"
                });
            }

            var result = await _services.UpdateTravelFeeAsync(model);
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
