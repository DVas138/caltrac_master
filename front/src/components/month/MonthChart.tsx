import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
export default function WeekChart() {
  const data = [
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 300, pv: 2400, amt: 2400 },
    { name: "Page C", uv: 300, pv: 2400, amt: 2400 },
    { name: "Page D", uv: 200, pv: 2400, amt: 2400 },
    { name: "Page E", uv: 278, pv: 2400, amt: 2400 },
    { name: "Page F", uv: 178, pv: 2400, amt: 2400 },
    { name: "Page F", uv: 178, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 300, pv: 2400, amt: 2400 },
    { name: "Page C", uv: 300, pv: 2400, amt: 2400 },
    { name: "Page D", uv: 200, pv: 2400, amt: 2400 },
    { name: "Page E", uv: 278, pv: 2400, amt: 2400 },
    { name: "Page F", uv: 178, pv: 2400, amt: 2400 },
    { name: "Page F", uv: 178, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 300, pv: 2400, amt: 2400 },
    { name: "Page C", uv: 300, pv: 2400, amt: 2400 },
    { name: "Page D", uv: 200, pv: 2400, amt: 2400 },
    { name: "Page A", uv: 400, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 300, pv: 2400, amt: 2400 },
    { name: "Page C", uv: 300, pv: 2400, amt: 2400 },
    { name: "Page D", uv: 200, pv: 2400, amt: 2400 },
    { name: "Page E", uv: 278, pv: 2400, amt: 2400 },
    { name: "Page F", uv: 178, pv: 2400, amt: 2400 },
    { name: "Page F", uv: 178, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 300, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 300, pv: 2400, amt: 2400 },
    { name: "Page C", uv: 300, pv: 2400, amt: 2400 },
    { name: "Page D", uv: 200, pv: 2400, amt: 2400 },
    { name: "Page E", uv: 278, pv: 2400, amt: 2400 },
    { name: "Page F", uv: 178, pv: 2400, amt: 2400 },
    { name: "Page F", uv: 178, pv: 2400, amt: 2400 },
  ];
  const renderLineChart = (
    <ResponsiveContainer
      width="100%"
      height={400}
      className="bg-zinc-100 py-8 rounded-b-2xl"
    >
      <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
  return <div className="">{renderLineChart}</div>;
}
