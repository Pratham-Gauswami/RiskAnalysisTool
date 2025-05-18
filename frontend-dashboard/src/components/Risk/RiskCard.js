import React from 'react';

const RiskCard = ({ data }) => {
    if (!data) return null;
    return (
        <div className="bg-red-50 p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-2">{data.symbol}</h3>
            <p>VaR: ${data.valueAtRisk}</p>
            <p>Delta: {data.delta}</p>
            <p>Gamma: {data.gemma}</p>
            <p className="text-sm text-gray-500">Time: {new Date(data.timestamp).toLocaleString()}</p>
        </div>
    );
};

export default RiskCard;