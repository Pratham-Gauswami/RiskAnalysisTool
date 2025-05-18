export interface MarketData {
    symbol: string;
    price: number;
    timestamp: string;
}

export interface RiskData {
    symbol: string;
    valueAtRisk: number;
    delta: number;
    gamma: number;
    pnl: number;
    timestamp: string;
}

export interface PortfolioData {
    portfolioId: string | number;
    totalValue: number;
    exposure: number;
    timestamp: string;
}

export interface PnLHistoryItem {
    timestamp: string;
    pnl: number;
} 