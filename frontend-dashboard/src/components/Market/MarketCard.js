import React from 'react';
import PropTypes from 'prop-types';

const MarketCard = ({ data }) => {
    if (!data) {
        return (
            <div className="bg-white p-4 rounded-xl shadow-md animate-pulse">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
        );
    }

    const formattedPrice = typeof data.price === 'number' 
        ? `$${data.price.toFixed(2)}` 
        : 'N/A';

    const formattedTime = data.timestamp 
        ? new Date(data.timestamp).toLocaleString()
        : new Date().toLocaleString();

    return (
        <div className="bg-white p-4 rounded-xl shadow-md transition-all duration-200 hover:shadow-lg">
            <h3 className="text-xl font-bold mb-2">{data.symbol || 'Unknown Symbol'}</h3>
            <p className="text-lg">
                Price: <span className="font-semibold">{formattedPrice}</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
                Last Update: {formattedTime}
            </p>
        </div>
    );
};

MarketCard.propTypes = {
    data: PropTypes.shape({
        symbol: PropTypes.string,
        price: PropTypes.number,
        timestamp: PropTypes.string
    })
};

export default MarketCard;