using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

[ApiController]
[Route("api/[controller]")]
public class PortfolioController : ControllerBase
{
    private readonly IHubContext<PortfolioHub> _hubContext;

    public PortfolioController(IHubContext<PortfolioHub> hubContext)
    {
        _hubContext = hubContext;
    }

    [HttpPost("broadcast")]
    public async Task<IActionResult> Broadcast([FromBody] PortfolioData data)
    {
        await _hubContext.Clients.All.SendAsync("ReceivePortfolioData", data);
        return Ok(new { status = "sent", data });
    }
}