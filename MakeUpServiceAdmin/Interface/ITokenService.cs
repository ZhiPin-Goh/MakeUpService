using Microsoft.AspNetCore.Authentication;
using System.Security.Claims;

namespace MakeUpServiceAdmin.Interface
{
    public interface ITokenService
    {
        Task<(ClaimsPrincipal principal, AuthenticationProperties authProperties)> TokenGenerateAsync(string usernName, string token, string refreshToken);

    }
}
