import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const PnLChart = ({ data }) => (
    <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="pnl" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
    </ResponsiveContainer>
);