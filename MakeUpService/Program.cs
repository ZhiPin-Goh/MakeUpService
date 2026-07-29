using MakeUpService.Service;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddHttpClient<AreaService>(c => // Area Service
    c.BaseAddress = new Uri(builder.Configuration["RestApi:BaseUrl"]));
builder.Services.AddHttpClient<BannersService>(c => // Banners Service
    c.BaseAddress = new Uri(builder.Configuration["RestApi:BaseUrl"]));
builder.Services.AddHttpClient<ClientMakeUpService>(c => // Client MakeUp Service
    c.BaseAddress = new Uri(builder.Configuration["RestApi:BaseUrl"]));
builder.Services.AddHttpClient<FeedbackService>(c => // Feedback Service
    c.BaseAddress = new Uri(builder.Configuration["RestApi:BaseUrl"]));
builder.Services.AddHttpClient<BookingService>(c => // Booking Service
    c.BaseAddress = new Uri(builder.Configuration["RestApi:BaseUrl"]));
builder.Services.AddHttpClient<ChatService>(c => // Chat Service
    c.BaseAddress = new Uri(builder.Configuration["RestApi:BaseUrl"]));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
