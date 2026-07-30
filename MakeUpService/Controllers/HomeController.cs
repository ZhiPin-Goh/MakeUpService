using MakeUpService.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Http;
using System.Diagnostics;
using MakeUpService.Service;

namespace MakeUpService.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly BannersService _bannersService;
        private readonly ClientMakeUpService _clientMakeUpService;

        public HomeController(ILogger<HomeController> logger, BannersService bannersService, ClientMakeUpService clientMakeUpService)
        {
            _logger = logger;
            _bannersService = bannersService;
            _clientMakeUpService = clientMakeUpService;
        }

        public async Task<IActionResult> Index()
        {
            var bannersTask = _bannersService.GetAllBannersAsync();
            var servicesTask = _clientMakeUpService.HomeServicesAsync();

            await Task.WhenAll(bannersTask, servicesTask);

            var viewModel = new HomeViewModel
            {
                Banners = bannersTask.Result,
                Services = servicesTask.Result
            };

            return View(viewModel);
        }

        [Route("/privacy-policy")]
        public IActionResult Privacy()
        {
            return View();
        }

        [Route("/about")]
        public IActionResult About()
        {
            return View();
        }

        [Route("/portfolio")]
        public IActionResult Portfolio()
        {
            return View();
        }

        [Route("/faq")]
        public IActionResult FAQ()
        {
            return View();
        }

        [Route("/terms-and-conditions")]
        public IActionResult TermsAndConditions()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [HttpPost]
        public IActionResult SetLanguage(string culture, string returnUrl)
        {
            Response.Cookies.Append(
                CookieRequestCultureProvider.DefaultCookieName,
                CookieRequestCultureProvider.MakeCookieValue(new RequestCulture(culture)),
                new CookieOptions { Expires = DateTimeOffset.UtcNow.AddYears(1) }
            );

            return LocalRedirect(returnUrl ?? "/");
        }
    }
}
