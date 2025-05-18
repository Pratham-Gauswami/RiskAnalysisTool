import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  connectToMarketData,
  connectToRiskData,
  connectToPortfolioService
} from './services/signalRConnections';

import MarketCard from './components/Market/MarketCard';
import RiskCard from './components/Risk/RiskCard';
import GreeksTable from './components/Risk/GreeksTable';
import VaRCard from './components/Risk/VaRCard';
import PortfolioCard from './components/Portfolio/PortfolioCard';
import PortfolioTable from './components/Portfolio/PortfolioTable';

function App() {
  // State for real-time data
  const [marketData, setMarketData] = useState(null);
  const [riskData, setRiskData] = useState(null);
  const [portfolioData, setPortfolioData] = useState([]);
  const [pnlHistory, setPnlHistory] = useState([]);

  // Connection state tracking
  const [connectionStatus, setConnectionStatus] = useState({
    market: false,
    risk: false,
    portfolio: false
  });

  useEffect(() => {
    // Market Data Connection
    const marketConnection = connectToMarketData(data => {
      console.debug('Market data received:', data);
      setMarketData(data[0]); // Take the latest market data
      setConnectionStatus(prev => ({ ...prev, market: true }));
    });

    // Risk Data Connection
    const riskConnection = connectToRiskData(data => {
      console.debug('Risk data received:', data);
      setRiskData(data[0]); // Take the latest risk data
      setConnectionStatus(prev => ({ ...prev, risk: true }));
      
      // Update PnL history with timestamp
      if (data[0]?.pnl !== undefined) {
        setPnlHistory(prev => {
          const newHistory = [...prev, {
            timestamp: new Date().toLocaleTimeString(),
            pnl: data[0].pnl
          }];
          // Keep last 100 data points
          return newHistory.slice(-100);
        });
      }
    });
    
    // Portfolio Data Connection
    const portfolioConnection = connectToPortfolioService(data => {
      console.debug('Portfolio data received:', data);
      setPortfolioData(data);
      setConnectionStatus(prev => ({ ...prev, portfolio: true }));
    });

    // Cleanup connections on unmount
    return () => {
      marketConnection?.stop();
      riskConnection?.stop();
      portfolioConnection?.stop();
    };
  }, []);

  // Helper function to get portfolio data in the correct format
  const getPortfolioTableData = () => {
    if (!Array.isArray(portfolioData)) {
      return portfolioData ? [portfolioData] : [];
    }
    return portfolioData;
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen space-y-6">
      <h1 className="text-3xl font-bold text-center">📈 Real-Time Derivatives Risk Dashboard</h1>
      
      {/* Connection Status Indicators */}
      <div className="flex justify-center gap-4 text-sm">
        <div className={`px-3 py-1 rounded ${connectionStatus.market ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          Market Data: {connectionStatus.market ? 'Connected' : 'Disconnected'}
        </div>
        <div className={`px-3 py-1 rounded ${connectionStatus.risk ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          Risk Data: {connectionStatus.risk ? 'Connected' : 'Disconnected'}
        </div>
        <div className={`px-3 py-1 rounded ${connectionStatus.portfolio ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          Portfolio Data: {connectionStatus.portfolio ? 'Connected' : 'Disconnected'}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MarketCard data={marketData} />
        <VaRCard varValue={riskData?.valueAtRisk} />
        <PortfolioCard data={Array.isArray(portfolioData) ? portfolioData[0] : portfolioData} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GreeksTable greeks={riskData ? [riskData] : []} />
        <PortfolioTable portfolios={getPortfolioTableData()} />
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;