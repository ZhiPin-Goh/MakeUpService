using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

namespace CarRental_Users.Interface
{
    public interface ITokenService
    {
        Task<(ClaimsPrincipal principal, AuthenticationProperties authProperties)> TokenGenerateAsync( string usernName, string token, string refreshToken);
    }
}
