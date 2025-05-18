using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddOpenApi();

// Configure SignalR
builder.Services.AddSignalR(options =>
{
    options.EnableDetailedErrors = true;
});

// Add controllers service
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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
app.UseAuthorization();

// Use endpoints after CORS
app.UseEndpoints(endpoints =>
{
    endpoints.MapHub<RiskHub>("/riskhub");
    endpoints.MapControllers();
});

app.Run();