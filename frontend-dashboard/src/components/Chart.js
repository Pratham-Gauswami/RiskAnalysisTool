import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const data = [
       { name: 'jan', value: 400 },
       { name: 'feb', value: 200 },
       { name: 'mar', value: 500 },
       { name: 'apr', value: 300 },
       { name: 'may', value: 600 },
       { name: 'jun', value: 400 },
];

export default function Chart() {
    return (
        <LineChart width={400} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
    );
}