import * as signalR from '@microsoft/signalr';
import { toast } from 'react-toastify';

const HUB_URLS = {
  MARKET_DATA: 'https://localhost:7204/marketdatahub',
  RISK_DATA: 'https://localhost:7001/riskhub',
  PORTFOLIO_DATA: 'https://localhost:7002/portfoliohub'
};

const createConnection = (hubUrl, hubMethod, onData) => {
  const connection = new signalR.HubConnectionBuilder()
    .withUrl(hubUrl, {
      skipNegotiation: false,
      transport: signalR.HttpTransportType.WebSockets,
      withCredentials: true,
      timeout: 30000, // Increase timeout to 30 seconds
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      }
    })
    .withAutomaticReconnect([0, 1000, 2000, 3000, 4000, 5000]) // More frequent reconnection attempts
    .configureLogging(signalR.LogLevel.Debug) // Change to Debug for more detailed logs
    .build();

  // Connection state handling with UI feedback
  connection.onreconnecting(error => {
    console.warn(`Connection lost. Attempting to reconnect: ${error}`);
    toast.warning(`Lost connection to ${hubMethod}. Attempting to reconnect...`, {
      toastId: `reconnecting-${hubMethod}` // Prevent duplicate toasts
    });
  });

  connection.onreconnected(connectionId => {
    console.log(`Connection reestablished. ConnectionId: ${connectionId}`);
    toast.success(`Reconnected to ${hubMethod} successfully!`, {
      toastId: `reconnected-${hubMethod}`
    });
  });

  connection.onclose(error => {
    console.error(`Connection closed. Error: ${error}`);
    toast.error(`Connection to ${hubMethod} closed. Attempting to reconnect...`, {
      toastId: `closed-${hubMethod}`
    });
    // Attempt to restart the connection
    startConnection(0);
  });

  // Data validation helpers
  const validators = {
    ReceiveMarketData: (data) => {
      return data 
        && typeof data.symbol === 'string'
        && typeof data.price === 'number'
        && typeof data.timestamp === 'string';
    },
    ReceiveRiskData: (data) => {
      return data
        && typeof data.symbol === 'string'
        && typeof data.valueAtRisk === 'number'
        && typeof data.delta === 'number'
        && typeof data.gamma === 'number'
        && typeof data.pnl === 'number'
        && typeof data.timestamp === 'string';
    },
    ReceivePortfolioData: (data) => {
      return data 
        && (typeof data.portfolioId === 'string' || typeof data.portfolioId === 'number')
        && typeof data.totalValue === 'number'
        && typeof data.exposure === 'number'
        && typeof data.timestamp === 'string';
    }
  };

  // Register the hub method with enhanced validation
  connection.on(hubMethod, (data) => {
    console.debug(`${hubMethod} received:`, data);
    
    if (!data) {
      console.warn(`${hubMethod}: Received null/undefined data`);
      return;
    }

    try {
      const validator = validators[hubMethod];
      if (!validator) {
        console.warn(`No validator found for ${hubMethod}`);
        onData(data);
        return;
      }

      if (Array.isArray(data)) {
        const validData = data.filter(item => validator(item));
        if (validData.length === 0) {
          console.warn(`${hubMethod}: No valid items in array data`);
          return;
        }
        onData(validData);
      } else if (validator(data)) {
        onData([data]);
      } else {
        console.warn(`${hubMethod}: Invalid data format`, data);
        toast.warning(`Received invalid data format for ${hubMethod}`);
      }
    } catch (error) {
      console.error(`Error processing ${hubMethod} data:`, error);
      toast.error(`Error processing ${hubMethod} data`);
    }
  });

  // Enhanced connection start with retry logic
  const startConnection = async (retryAttempt = 0) => {
    try {
      if (connection.state === signalR.HubConnectionState.Connected) {
        console.log(`Already connected to ${hubUrl}`);
        return;
      }

      await connection.start();
      console.log(`Successfully connected to ${hubUrl}`);
      toast.success(`Connected to ${hubMethod} successfully!`, {
        toastId: `connected-${hubMethod}`
      });
    } catch (err) {
      console.error(`Error connecting to ${hubUrl}:`, err);
      
      // Check if the error is related to HTTPS certificate
      if (err.toString().includes('certificate')) {
        console.warn('Certificate error detected. Try accessing the hub URL directly in browser first to accept the certificate.');
        toast.warning(`Please open ${hubUrl} in your browser to accept the certificate`, {
          toastId: `cert-${hubMethod}`
        });
      }
      
      const maxRetries = 5;
      if (retryAttempt < maxRetries) {
        const retryDelay = Math.min(1000 * Math.pow(2, retryAttempt), 10000);
        console.log(`Retrying connection in ${retryDelay}ms... (Attempt ${retryAttempt + 1}/${maxRetries})`);
        
        toast.info(`Attempting to connect to ${hubMethod} (${retryAttempt + 1}/${maxRetries})`, {
          toastId: `retry-${hubMethod}-${retryAttempt}`
        });
        
        setTimeout(() => startConnection(retryAttempt + 1), retryDelay);
      } else {
        toast.error(`Failed to connect to ${hubMethod} after ${maxRetries} attempts. Please check if the service is running.`, {
          toastId: `failed-${hubMethod}`
        });
      }
    }
  };

  startConnection();
  return connection;
};

export const connectToMarketData = (onData) => {
  return createConnection(
    HUB_URLS.MARKET_DATA,
    'ReceiveMarketData',
    onData
  );
};

export const connectToRiskData = (onData) => {
  return createConnection(
    HUB_URLS.RISK_DATA,
    'ReceiveRiskData',
    onData
  );
};

export const connectToPortfolioService = (onData) => {
  return createConnection(
    HUB_URLS.PORTFOLIO_DATA,
    'ReceivePortfolioData',
    onData
  );
};