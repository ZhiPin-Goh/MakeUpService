using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Net;
using System.Net.Http.Headers;
using System.Security.Claims;

namespace MakeUpServiceAdmin.Handlers
{
    public class AuthTokenHandler : DelegatingHandler
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IConfiguration _config;
        public AuthTokenHandler(IHttpContextAccessor httpContextAccessor, IConfiguration config)
        {
            _httpContextAccessor = httpContextAccessor;
            _config = config;
        }
        protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var httpContext = _httpContextAccessor.HttpContext;
            if (httpContext == null)
                return await base.SendAsync(request, cancellationToken);

            var accessToken = httpContext.User.FindFirst("access_token")?.Value;
            if (!string.IsNullOrEmpty(accessToken))
            {
                request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);
            }

            var response = await base.SendAsync(request, cancellationToken);

            if (response.StatusCode == HttpStatusCode.Unauthorized)
            {
                var refreshToken = httpContext.User.FindFirst("refresh_token")?.Value;
                if (string.IsNullOrEmpty(refreshToken))
                    return response;

                var newToken = await RefreshTokenAsync(accessToken, refreshToken);
                if (newToken == null)
                    await httpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

                else
                {
                    await UpdateCookieAsync(httpContext, newToken.Token, newToken.RefreshToken);
                    request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", newToken.Token);
                    return await base.SendAsync(request, cancellationToken);
                }
            }
            return response;
        }
        private async Task<RefreshTokenResponseDTO?> RefreshTokenAsync(string oldAccess, string refresh)
        {
            using var client = new HttpClient
            {
                BaseAddress = new Uri(_config["RestApi:BaseUrl"])
            };
            var requestDto = new RefreshTokenRequestDTO
            {
                AccessToken = oldAccess,
                RefreshToken = refresh
            };
            var response = await client.PostAsJsonAsync("api/user/authentication/refreshuser", requestDto);
            if (response.IsSuccessStatusCode)
            {
                return await response.Content.ReadFromJsonAsync<RefreshTokenResponseDTO>();
            }
            return null;
        }
        private async Task UpdateCookieAsync(HttpContext context, string newAccess, string newRefresh)
        {
            var identity = (ClaimsIdentity)context.User.Identity;
            if (identity == null)
                return;
            var oldAccessClaim = identity.FindFirst("access_token");
            if (oldAccessClaim != null) identity.RemoveClaim(oldAccessClaim);

            var oldRefreshClaim = identity.FindFirst("refresh_token");
            if (oldRefreshClaim != null) identity.RemoveClaim(oldRefreshClaim);

            identity.AddClaim(new Claim("access_token", newAccess));
            identity.AddClaim(new Claim("refresh_token", newRefresh));

            var authProperties = new AuthenticationProperties
            {
                IsPersistent = true,
                ExpiresUtc = DateTimeOffset.UtcNow.AddDays(30)
            };
            await context.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity), authProperties);
        }

        public class RefreshTokenRequestDTO
        {
            public string AccessToken { get; set; }
            public string RefreshToken { get; set; }
        }
        //New Token
        public class RefreshTokenResponseDTO
        {
            public string Token { get; set; }
            public string RefreshToken { get; set; }
        }
    }
}
