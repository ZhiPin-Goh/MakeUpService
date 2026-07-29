using MakeUpService.ChatRequest;
using MakeUpService.Service;
using Microsoft.AspNetCore.Mvc;

namespace MakeUpService.Controllers
{
    public class ChatController : Controller
    {
        private readonly ChatService _services;
        public ChatController(ChatService services)
        {
            _services = services;
        }
        [Route("/chat")]
        public IActionResult Chat()
        {
            return View();
        }
        [HttpPost("chat/send")]
        public async Task<IActionResult> SendMessage([FromBody] AiChatRequest model)
        {
            var result = await _services.SendMessageAsync(model);
            if (result.IsSuccess)
            {
                return Json(new { success = true, message = result.Reply });
            }
            else
            {
                return Json(new { success = false, message = result.Reply });
            }
        }
    }
}
