const GreeksTable = ({ greeks }) => {
    if (!greeks || greeks.length === 0) {
        return (
            <div className="p-4 bg-white rounded-lg shadow">
                <p className="text-gray-500 italic">No Greek data available.</p>
            </div>
        );
    }

    return (
        <div className="overflow-auto shadow rounded-lg bg-white">
            <table className="min-w-full text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-2 text-left">Symbol</th>
                        <th className="p-2 text-left">Delta</th>
                        <th className="p-2 text-left">Gamma</th>
                    </tr>
                </thead>
                <tbody>
                    {greeks.map((g, index) => (
                        g && g.symbol ? (
                            <tr key={g.symbol}>
                                <td className="p-2">{g.symbol}</td>
                                <td className="p-2">{g.delta?.toFixed(2)}</td>
                                <td className="p-2">{g.gamma?.toFixed(2)}</td>
                            </tr>
                        ) : (
                            <tr key={index}>
                                <td colSpan={3} className="p-2 text-gray-400">Invalid data</td>
                            </tr>
                        )
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GreeksTable;