var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSignalR();
builder.Services.AddControllers();

var app = builder.Build();

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapControllers(); // Maps the controller
app.MapHub<PortfolioHub>("/portfoliohub"); // Maps the SignalR hub

app.Run();