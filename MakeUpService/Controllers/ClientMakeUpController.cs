using HashidsNet;
using MakeUpService.Service;
using Microsoft.AspNetCore.Mvc;

namespace MakeUpService.Controllers
{
    public class ClientMakeUpController : Controller
    {
        private readonly ClientMakeUpService _services;
        private readonly Hashids _hashids;
        public ClientMakeUpController(ClientMakeUpService services)
        {
            _services = services;
            _hashids = new Hashids("ServiceIdSalt", 10);
        }
        [Route("services/my-services")]
        [HttpGet]
        public async Task<IActionResult> GetAllService()
        {
            var services = await _services.GetAllServicesAsync();
            return View(services);
        }
        [HttpGet("services/home-services")]
        public async Task<IActionResult> GetHomeService()
        {
            var services = await _services.HomeServicesAsync();
            return Json(services);
        }
        [Route("services/{hashid}")]
        [HttpGet]
        public async Task<IActionResult> GetServiceDetails(string hashid)
        {
            var decoded = _hashids.Decode(hashid);
            if(decoded.Length == 0)
            {
                return NotFound();
            }
            int id = decoded[0];
            var result = await _services.GetServiceDetailsAsync(id);
            return View(result);
        }
    }
}
