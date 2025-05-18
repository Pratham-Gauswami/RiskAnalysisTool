using Microsoft.AspNetCore.SignalR;

public class MarketDataHub : Hub
{
    public async Task BroadcastProce(MarketData data)
    {
        await Clients.All.SendAsync("ReceiveMarketData", data);
    }
}