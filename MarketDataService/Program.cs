var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();


builder.Services.AddHostedService<MarketDataFetcher>();

// Configure SignalR
builder.Services.AddSignalR(options =>
{
    options.EnableDetailedErrors = true;
});

// Add controllers service
builder.Services.AddControllers();


// Add CORS policy with specific configuration for SignalR
builder.Services.AddCors(options =>
{
    options.AddPolicy("SignalRPolicy", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyMethod()
              .AllowAnyHeader()
              .AllowCredentials()
              .SetIsOriginAllowed(origin => true); // Be careful with this in production!
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// Important: UseRouting must come before UseCors
app.UseRouting();

// CORS must be between UseRouting and UseEndpoints
app.UseCors("SignalRPolicy");

app.UseHttpsRedirection();

// Use endpoints after CORS
app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<MarketDataHub>("/marketdatahub");
    endpoints.MapControllers();
});

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

app.MapGet("/weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.WithName("GetWeatherForecast");

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}