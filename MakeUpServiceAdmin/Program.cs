using MakeUpServiceAdmin.InterfaceService;
using MakeUpServiceAdmin.Handlers;
using MakeUpServiceAdmin.Service;
using Microsoft.AspNetCore.Authentication.Cookies;
using MakeUpServiceAdmin.Interface;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddTransient<ITokenService, CookieTokenService>();

builder.Services.AddTransient<AuthTokenHandler>();
builder.Services.AddHttpContextAccessor();

builder.Services.AddHttpClient<AuthService>(c => // Auth Service
    c.BaseAddress = new Uri(builder.Configuration["RestApi:BaseUrl"]));
builder.Services.AddHttpClient<AreaService>(c => // Area Service
    c.BaseAddress = new Uri(builder.Configuration["RestApi:BaseUrl"]))
    .AddHttpMessageHandler<AuthTokenHandler>();
builder.Services.AddHttpClient<BookingService>(c => // Booking Service
    c.BaseAddress = new Uri(builder.Configuration["RestApi:BaseUrl"]))
    .AddHttpMessageHandler<AuthTokenHandler>();
builder.Services.AddHttpClient<CalendarService>(c => // Calendar Service
    c.BaseAddress = new Uri(builder.Configuration["RestApi:BaseUrl"]))
    .AddHttpMessageHandler<AuthTokenHandler>();
builder.Services.AddHttpClient<BannerService>(c => // Banner Service
    c.BaseAddress = new Uri(builder.Configuration["RestApi:BaseUrl"]))
    .AddHttpMessageHandler<AuthTokenHandler>();
builder.Services.AddHttpClient<DashboardService>(c => // Dashboard Service
    c.BaseAddress = new Uri(builder.Configuration["RestApi:BaseUrl"]))
    .AddHttpMessageHandler<AuthTokenHandler>();
builder.Services.AddHttpClient<FeeService>(c => // Fee Service
    c.BaseAddress = new Uri(builder.Configuration["RestApi:BaseUrl"]))
    .AddHttpMessageHandler<AuthTokenHandler>();
builder.Services.AddHttpClient<FeedbackService>(c => // Feedback Service
    c.BaseAddress = new Uri(builder.Configuration["RestApi:BaseUrl"]))
    .AddHttpMessageHandler<AuthTokenHandler>();
builder.Services.AddHttpClient<NotificationService>(c => // Notification Service 
    c.BaseAddress = new Uri(builder.Configuration["RestApi:BaseUrl"]))
    .AddHttpMessageHandler<AuthTokenHandler>();
builder.Services.AddHttpClient<ScheduleBlockerService>(c => // Schedule Blocker Service
    c.BaseAddress = new Uri(builder.Configuration["RestApi:BaseUrl"]))
    .AddHttpMessageHandler<AuthTokenHandler>();
builder.Services.AddHttpClient<MakeUpService>(c => //MakeUp Service
    c.BaseAddress = new Uri(builder.Configuration["RestApi:BaseUrl"]))
    .AddHttpMessageHandler<AuthTokenHandler>();
builder.Services.AddHttpClient<SettingService>(c => // Setting Service
    c.BaseAddress = new Uri(builder.Configuration["RestApi:BaseUrl"]))
    .AddHttpMessageHandler<AuthTokenHandler>();

// Add HttpClient for AuthServices ,Cookie Authentication
builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.LoginPath = "/login";
        options.ExpireTimeSpan = TimeSpan.FromDays(30);
        options.SlidingExpiration = true;
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseExceptionHandler("/Home/Error");
app.UseStatusCodePagesWithReExecute("/Home/Error", "?statusCode={0}");

if (!app.Environment.IsDevelopment() || !app.Environment.IsProduction())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

// Enable authentication and authorization middleware
app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
