using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

[ApiController]
[Route("api/[controller]")]
public class RiskController : ControllerBase
{
    private readonly IHubContext<RiskHub> _hubContext;

    public RiskController(IHubContext<RiskHub> hubContext)
    {
        _hubContext = hubContext;
    }

    [HttpPost("broadcast")]
    public async Task<IActionResult> Broadcast([FromBody] RiskData data)
    {
        await _hubContext.Clients.All.SendAsync("ReceiveRiskData", data);
        return Ok(new { status = "sent", data });
    }
}