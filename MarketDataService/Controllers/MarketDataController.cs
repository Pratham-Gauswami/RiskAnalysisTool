using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

[ApiController]
[Route("api/[controller]")]
public class MarketDataController : ControllerBase
{
    private readonly IHubContext<MarketDataHub> _hubContext;

    public MarketDataController(IHubContext<MarketDataHub> hubContext)
    {
        _hubContext = hubContext;
    }

    [HttpPost("broadcast")]
    public async Task<IActionResult> Broadcast([FromBody] MarketData data)
    {
        await _hubContext.Clients.All.SendAsync("ReceiveMarketData", data);
        return Ok(new { status = "sent", data });
    }
}