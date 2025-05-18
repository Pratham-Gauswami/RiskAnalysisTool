import React from 'react';

const PortfolioCard = ({ data }) => {
    if (!data) return null;
    return (
        <div className="bg-green-50 p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">Portfolio: {data.portfolioId}</h3>
            <p>Value: ${data.totalValue}</p>
            <p>Exposure: ${data.exposure}</p>
            <p className="text-sm text-gray-500">Time: {new Date(data.timestamp).toLocaleString()}</p>
        </div>
    );
};

export default PortfolioCard;