📉 Real-Time Risk Analytics Platform

A scalable, microservices-driven platform for computing real-time risk metrics—designed to simulate equity derivative trading environments. Built with production-grade patterns and tooling, this project emulates core functionalities of risk systems used at modern trading desks.

⸻

✨ Overview

This application processes live market data to compute and stream real-time Value at Risk (VaR) and Greeks (Delta, Gamma) across a derivative portfolio. Built with modern tooling such as .NET, React, SignalR, and Azure DevOps, it mimics a high-frequency risk monitoring platform typical in investment banks.

⸻

🧱 System Architecture

                               ┌───────────────────────┐
                               │   Yahoo Finance API   │
                               └────────┬──────────────┘
                                        │
                           ┌────────────▼────────────┐
                           │    MarketDataService    │
                           │  (fetch + broadcast)    │
                           └────────────┬────────────┘
                                        │
            ┌───────────────────────────┼────────────────────────────┐
            ▼                           ▼                            ▼
    ┌─────────────┐            ┌─────────────────┐         ┌────────────────────┐
    │ RiskService │◄───────────┤ PortfolioService │◄────────┤ Redis (Optional)   │
    │  VaR/Greeks │            │ Aggregation/P&L  │         │ Caching Layer      │
    └────┬────────┘            └─────────────────┘         └─────────┬──────────┘
         │                                                           │
         └──────────────────────────────┬────────────────────────────┘
                                        ▼
                              ┌──────────────────┐
                              │   React Frontend │
                              │ SignalR Websocket│
                              └──────────────────┘


⸻

⚙️ Tech Stack

Layer	Stack/Tools Used
Frontend	React.js, Tailwind CSS, SignalR JS Client
Backend	ASP.NET Core (C#), SignalR, HttpClient
Architecture	Microservices (REST & WebSockets), Redis (optional)
Market Data	Yahoo Finance API / Mocked JSON feed
CI/CD	Azure DevOps Pipelines (planned)
Monitoring	Serilog, Application Insights (planned)


⸻

🔍 Key Features
	•	Live Risk Calculation: Computes and streams real-time VaR, Delta, Gamma
	•	Event-Driven Updates: SignalR enables immediate push updates to clients
	•	Portfolio View: Aggregates risk exposure across multiple symbols (WIP)
	•	Extensible Services: Clean separation of concerns between pricing, portfolio, and data feed services
	•	Production-Ready Patterns: DTOs, error handling, centralized logging, scalability hooks

⸻

📦 Services Breakdown

MarketDataService
	•	Fetches real-time stock quotes (mocked or live via Yahoo Finance)
	•	Publishes market price updates to:
	•	SignalR clients
	•	RiskService for computation

RiskService
	•	Computes:
	•	Value at Risk (VaR)
	•	Delta, Gamma (Greeks)
	•	Returns structured risk reports for display
	•	Designed for pluggable pricing models

PortfolioService (WIP)
	•	Manages portfolio state
	•	Aggregates positions and computes portfolio-level P&L

⸻

🖥️ Frontend UI (React + SignalR)
	•	Dashboard layout includes:
	•	📊 Real-Time Price Feed
	•	📉 Risk Metrics Cards (VaR, Delta, Gamma)
	•	🧮 Portfolio Table (future)
	•	WebSocket-based updates for minimal latency

⸻

🚀 Getting Started

1. Clone and Setup

git clone https://github.com/yourusername/risk-analytics-dashboard
cd risk-analytics-dashboard

2. Start Backend Microservices

cd MarketDataService
dotnet run

cd RiskService
dotnet run

# Optional: PortfolioService

3. Start Frontend

cd client
npm install
npm start

Navigate to: http://localhost:3000

⸻

🧪 Example CURL Usage

curl -X POST http://localhost:5001/api/riskservice/calculate \
-H "Content-Type: application/json" \
-d '{
  "symbol": "AAPL",
  "price": 212.44,
  "timestamp": "2025-05-17T17:30:00Z"
}'


⸻

🔧 Developer Notes
	•	Code uses async/await for all I/O-bound tasks
	•	Exception handling centralized using middleware
	•	DTO validation via DataAnnotations
	•	React state managed with modular, context-aware components
	•	SignalR connection wrapped in retry-capable service

⸻

🛣️ Roadmap
	•	Market feed integration (mock/live)
	•	Real-time VaR and Greeks calculations
	•	Redis caching for large-scale portfolio handling
	•	PortfolioService for aggregate risk exposure
	•	Deployment pipeline via Azure DevOps
	•	Alerts and Monitoring via App Insights

⸻

📌 Engineering Highlights
	•	Low Latency: SignalR ensures sub-second risk updates
	•	Microservices: Built to be horizontally scalable and independently deployable
	•	Realistic Domain Modeling: Mimics institutional trading risk platforms (e.g., TD, JPM)
	•	CI/CD Ready: Can be containerized and deployed to Azure/K8s

⸻

👤 Author

Pratham Gauswami
Full-stack engineer with a focus on scalable, real-time systems in finance & operations. Passionate about impactful problem-solving.

⸻

📝 License

This project is licensed under the MIT License.
