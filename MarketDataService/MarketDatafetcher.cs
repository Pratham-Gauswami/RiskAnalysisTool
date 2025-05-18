using Microsoft.AspNetCore.SignalR;
using System.Text.Json;

public class MarketDataFetcher : BackgroundService
{
    private readonly IHubContext<MarketDataHub> _hubContext;
    private readonly HttpClient _httpClient = new();
    private readonly string _apiKey = "YOUR-API-KEY"; // Replace with real key

    public MarketDataFetcher(IHubContext<MarketDataHub> hubContext)
    {
        _hubContext = hubContext;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            var response = await _httpClient.GetAsync($"https://finnhub.io/api/v1/quote?symbol=AAPL&token={_apiKey}");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                var data = JsonSerializer.Deserialize<FinnhubQuote>(json);

                var marketData = new MarketData
                {
                    Symbol = "AAPL",
                    Price = data.c,
                    Timestamp = DateTime.UtcNow
                };

                await _hubContext.Clients.All.SendAsync("ReceiveMarketData", marketData);
            }

            await Task.Delay(5000, stoppingToken); // fetch every 5 seconds
        }
    }
}

public class FinnhubQuote
{
    public decimal c { get; set; }
}
