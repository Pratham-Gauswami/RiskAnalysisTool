using Microsoft.AspNetCore.SignalR;

public class RiskHub : Hub
{
    public async Task BroadcastRisk(RiskData data)
    {
        await Clients.All.SendAsync("ReceiveRiskData", data);
    }
}