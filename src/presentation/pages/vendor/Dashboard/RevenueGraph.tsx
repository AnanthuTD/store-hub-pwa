import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const RevenueGraph = ({ revenueData }) => {
  return (
    <div>
      <h3>Daily Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={revenueData.daily}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      <h3>Monthly Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={revenueData.monthly}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#82ca9d" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>

      <h3>Yearly Revenue</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={revenueData.yearly}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#ffc658" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueGraph;
