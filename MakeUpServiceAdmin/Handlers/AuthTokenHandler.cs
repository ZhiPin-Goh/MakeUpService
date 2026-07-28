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
                {
                    await httpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                    return response;
                }

                var actualToken = newToken.Token ?? newToken.AccessToken;
                if (string.IsNullOrEmpty(actualToken))
                {
                    await httpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                    return response;
                }

                await UpdateCookieAsync(httpContext, actualToken, newToken.RefreshToken ?? "");
                
                var clonedRequest = await CloneHttpRequestMessageAsync(request);
                clonedRequest.Headers.Authorization = new AuthenticationHeaderValue("Bearer", actualToken);
                
                response.Dispose(); // Free resources from the failed 401 response
                return await base.SendAsync(clonedRequest, cancellationToken);
            }
            return response;
        }

        private async Task<HttpRequestMessage> CloneHttpRequestMessageAsync(HttpRequestMessage req)
        {
            var clone = new HttpRequestMessage(req.Method, req.RequestUri)
            {
                Version = req.Version
            };

            if (req.Content != null)
            {
                var ms = new MemoryStream();
                await req.Content.CopyToAsync(ms);
                ms.Position = 0;
                clone.Content = new StreamContent(ms);

                foreach (var header in req.Content.Headers)
                {
                    clone.Content.Headers.TryAddWithoutValidation(header.Key, header.Value);
                }
            }

            foreach (var header in req.Headers)
            {
                clone.Headers.TryAddWithoutValidation(header.Key, header.Value);
            }

            return clone;
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
            var response = await client.PostAsJsonAsync("api/admin/auth/refresh-token", requestDto);
            if (response.IsSuccessStatusCode)
            {
                var result = await response.Content.ReadFromJsonAsync<RefreshTokenResponseDTO>();
                if (result != null && (!string.IsNullOrEmpty(result.Token) || !string.IsNullOrEmpty(result.AccessToken)))
                {
                    return result;
                }
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
            public string? Token { get; set; }
            public string? AccessToken { get; set; }
            public string? RefreshToken { get; set; }
        }
    }
}
