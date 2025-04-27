import { useEffect, useState } from 'react';
import API from '../services/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Analytics() {
  const [data, setData] = useState([]);
  useEffect(() => {
    API.get('analytics/').then(res => setData(res.data));
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Analytics</h1>
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="views" />
        <Line type="monotone" dataKey="clicks" />
      </LineChart>
    </div>
  );
}