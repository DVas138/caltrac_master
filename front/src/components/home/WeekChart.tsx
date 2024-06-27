import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
export default function WeekChart({ weekData }: any) {
  const dates = weekData
    .map((day: any) => {
      return {
        ...day,
        date: new Date(day.date).toLocaleString().split(",")[0],
      };
    })
    .reverse();
  console.log(dates);
  const renderLineChart = (
    <ResponsiveContainer
      width="100%"
      height={400}
      className="bg-zinc-100 py-8 rounded-b-2xl mb-20"
    >
      <LineChart
        width={700}
        height={300}
        data={dates}
        margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
      >
        <Line
          type="monotone"
          dataKey="weight"
          stroke="#82ca9d"
          activeDot={{ r: 10 }}
          strokeWidth={3}
        />
        <Line
          type="monotone"
          dataKey="calories"
          stroke="#8884d8"
          activeDot={{ r: 10 }}
          strokeWidth={3}
        />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <XAxis dataKey="date" padding={{ left: 20, right: 30 }} />
        <YAxis />
        <Tooltip />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
  return <div className="">{renderLineChart}</div>;
}
