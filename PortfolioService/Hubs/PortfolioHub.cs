using Microsoft.AspNetCore.SignalR;

public class PortfolioHub : Hub
{
    public async Task BroadcastPortfolio(PortfolioData data)
    {
        await Clients.All.SendAsync("ReceivePortfolioData", data);
    }
}