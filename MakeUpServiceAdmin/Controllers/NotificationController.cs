using MakeUpServiceAdmin.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MakeUpServiceAdmin.Controllers
{
    [Authorize]
    public class NotificationController : Controller
    {
        private readonly NotificationService _services;
        public NotificationController(NotificationService services)
        {
            _services = services;
        }
        [Route("getnotifications")]
        [HttpGet]
        public async Task<IActionResult> GetNotifications()
        {
            var notifications = await _services.GetNotificationsAsync();
            return View(notifications);
        }
        [HttpGet("unreadcount")]
        public async Task<IActionResult> GetUnreadNotificationCount()
        {
            var count = await _services.UnreadCountAsync();
            return Json(new { count });
        }
        // Open notification details and mark as read, return the result to the modal
        [HttpPost("markasread")]
        public async Task<IActionResult> MarkAsRead(int notificationID)
        {
            var notification = await _services.MarkAsReadAsync(notificationID);
            if (notification != null)
            {
                return View(notification);
            }
            return View();
        }
    }
}
