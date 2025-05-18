import React from 'react';
import PropTypes from 'prop-types';

const VaRCard = ({ varValue }) => {
    if (varValue === undefined || varValue === null) {
        return (
            <div className="bg-yellow-100 p-4 rounded-lg shadow animate-pulse">
                <div className="h-5 bg-yellow-200 rounded w-3/4 mb-3"></div>
                <div className="h-7 bg-yellow-200 rounded w-1/2"></div>
            </div>
        );
    }

    const formattedVaR = typeof varValue === 'number'
        ? `$${varValue.toFixed(2)}`
        : 'N/A';

    const getVaRSeverityClass = (value) => {
        if (typeof value !== 'number') return 'text-gray-600';
        if (value > 1000000) return 'text-red-600';
        if (value > 500000) return 'text-orange-600';
        return 'text-green-600';
    };

    return (
        <div className="bg-yellow-100 p-4 rounded-lg shadow transition-all duration-200 hover:shadow-lg">
            <h3 className="text-lg font-semibold">Value at Risk (VaR)</h3>
            <p className={`text-xl font-bold ${getVaRSeverityClass(varValue)}`}>
                {formattedVaR}
            </p>
            {typeof varValue === 'number' && varValue > 1000000 && (
                <p className="text-sm text-red-600 mt-2">
                    ⚠️ High risk exposure detected
                </p>
            )}
        </div>
    );
};

VaRCard.propTypes = {
    varValue: PropTypes.number
};

export default VaRCard;