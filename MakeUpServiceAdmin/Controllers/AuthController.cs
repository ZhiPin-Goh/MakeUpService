using MakeUpServiceAdmin.Interface;
using MakeUpServiceAdmin.Service;
using MakeUpServiceAdmin.ViewModel.AuthVm;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MakeUpServiceAdmin.Controllers
{
    public class AuthController : Controller
    {
        private readonly AuthService _services;
        private readonly ITokenService _tokenService;
        public AuthController(AuthService services, ITokenService tokenService)
        {
            _services = services;
            _tokenService = tokenService;
        }

        [Route("/login")]
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginVm model)
        {
            try
            {
                var response = await _services.LoginAsync(model);
                if (response.Success)
                {
                    var tokens = await _tokenService.TokenGenerateAsync(model.UserName, response.AccessToken!, response.RefreshToken!);
                    await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, tokens.principal, tokens.authProperties);

                    return RedirectToAction("Index"); // To main page after successful login
                }
                ModelState.AddModelError(string.Empty, response.Message ?? "Login failed.");
                return View(model);
            }
            catch (Exception ex)
            {
                ModelState.AddModelError(string.Empty, $"An error occurred: {ex.Message}");
                return View(model);
            }
        }
        [Authorize]
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            var accessToken = User.FindFirst("access_token")?.Value;
            var refreshToken = User.FindFirst("refresh_token")?.Value;
            var logoutModel = new TokenRequestVm
            {
                AccessToken = accessToken,
                RefreshToken = refreshToken,
            };
            await _services.LogoutAsync(logoutModel);
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return RedirectToAction("Login", "Auth");
        }
    }
}
