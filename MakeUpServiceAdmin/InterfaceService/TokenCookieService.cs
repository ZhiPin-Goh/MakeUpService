using CarRental_Users.Interface;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;

namespace CarRental_Users.InterfaceService
{
    // Cookie-based token service implementation
    // This service generates authentication cookies based on user claims and tokens.
    public class TokenCookieService : ITokenService
    {
        public async Task<(ClaimsPrincipal principal, AuthenticationProperties authProperties)> TokenGenerateAsync(string userName, string token, string refreshToken)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, userName),
                new Claim("access_token", token),
                new Claim("refresh_token", refreshToken),
                //new Claim(ClaimTypes.NameIdentifier, userID.ToString())
            };
            var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var principal = new ClaimsPrincipal(identity);
            var authProperties = new AuthenticationProperties
            {
                IsPersistent = true,
                ExpiresUtc = DateTimeOffset.UtcNow.AddDays(7)
            };
            // Note: The actual signing in logic would go here
            return (principal, authProperties);
        }
    }
}
