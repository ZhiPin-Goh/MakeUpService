using MakeUpServiceAdmin.Interface;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;

namespace MakeUpServiceAdmin.InterfaceService
{
    public class CookieTokenService: ITokenService
    {
        public async Task<(ClaimsPrincipal principal, AuthenticationProperties authProperties)> TokenGenerateAsync(string userName, string token, string refreshToken)
        {
            try
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
            catch (Exception ex)
            {
                // Handle exceptions (e.g., log the error)
                throw new Exception($"Error generating token: {ex.Message}", ex);
            }
        }
    }
}
