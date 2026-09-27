import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", steps: 4200 },
  { day: "Tue", steps: 6100 },
  { day: "Wed", steps: 5300 },
  { day: "Thu", steps: 7500 },
  { day: "Fri", steps: 6800 },
  { day: "Sat", steps: 8200 },
  { day: "Sun", steps: 9400 },
];

export default function ProgressChart() {
  return (
    <div className="progress-chart-card">
      <div className="progress-chart-header">
        <div>
          <p className="progress-label">WEEKLY ACTIVITY</p>
          <h2>Step Progress 📈</h2>
          <p className="progress-subtitle">
            Your activity throughout the week
          </p>
        </div>

        <div className="progress-badge">
          +18%
        </div>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.15} />

            <XAxis
              dataKey="day"
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#94a3b8", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <Line
              type="monotone"
              dataKey="steps"
              stroke="#22c55e"
              strokeWidth={4}
              dot={{
                r: 5,
                strokeWidth: 2,
              }}
              activeDot={{
                r: 8,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}