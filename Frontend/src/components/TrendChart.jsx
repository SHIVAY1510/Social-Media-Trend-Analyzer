import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "Mon", value: 34 },
  { day: "Tue", value: 41 },
  { day: "Wed", value: 48 },
  { day: "Thu", value: 57 },
  { day: "Fri", value: 65 },
  { day: "Sat", value: 78 },
  { day: "Sun", value: 91 },
];

export default function TrendChart() {
  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#202a3d"
          />

          <XAxis
            dataKey="day"
            stroke="#68758b"
          />

          <YAxis stroke="#68758b" />

          <Tooltip
            contentStyle={{
              background: "#111827",
              border: "1px solid #29344a",
              borderRadius: "10px",
              color: "#fff",
            }}
          />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#716aff"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}