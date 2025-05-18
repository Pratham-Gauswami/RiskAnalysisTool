import React from 'react';
import PropTypes from 'prop-types';

const PortfolioTable = ({ portfolios }) => {
    // Validate input data
    if (!Array.isArray(portfolios)) {
        return (
            <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-500 italic">No portfolio data available.</p>
            </div>
        );
    }

    // Filter out invalid entries and transform data
    const validPortfolios = portfolios.filter(p => p && typeof p === 'object')
        .map(p => ({
            portfolioId: p.portfolioId ?? 'N/A',
            totalValue: typeof p.totalValue === 'number' ? p.totalValue : 0,
            exposure: typeof p.exposure === 'number' ? p.exposure : 0
        }));

    if (validPortfolios.length === 0) {
        return (
            <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-gray-500 italic">No valid portfolio data available.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">Portfolios</h3>
            <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="p-2 text-left">Portfolio ID</th>
                        <th className="p-2 text-left">Value</th>
                        <th className="p-2 text-left">Exposure</th>
                    </tr>
                </thead>
                <tbody>
                    {validPortfolios.map((p, index) => (
                        <tr key={p.portfolioId !== 'N/A' ? p.portfolioId : `portfolio-${index}`}>
                            <td className="p-2">{p.portfolioId}</td>
                            <td className="p-2">${p.totalValue.toFixed(2)}</td>
                            <td className="p-2">${p.exposure.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

// Add PropTypes for better type checking
PortfolioTable.propTypes = {
    portfolios: PropTypes.arrayOf(PropTypes.shape({
        portfolioId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        totalValue: PropTypes.number,
        exposure: PropTypes.number
    }))
};

// Add default props
PortfolioTable.defaultProps = {
    portfolios: []
};

export default PortfolioTable;