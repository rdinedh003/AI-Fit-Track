import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ProgressHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(
      localStorage.getItem("aiFitProgressHistory") || "[]"
    );

    if (savedHistory.length === 0) {
      const demoHistory = [
        { day: "Mon", steps: 4200, water: 1600, workouts: 1 },
        { day: "Tue", steps: 5600, water: 1900, workouts: 1 },
        { day: "Wed", steps: 4800, water: 2100, workouts: 0 },
        { day: "Thu", steps: 6800, water: 2000, workouts: 1 },
        { day: "Fri", steps: 7200, water: 2300, workouts: 1 },
        { day: "Sat", steps: 8100, water: 2400, workouts: 1 },
        { day: "Sun", steps: 7600, water: 2200, workouts: 0 },
      ];

      localStorage.setItem(
        "aiFitProgressHistory",
        JSON.stringify(demoHistory)
      );

      setHistory(demoHistory);
    } else {
      setHistory(savedHistory);
    }
  }, []);

  return (
    <section
      style={{
        marginTop: "24px",
        padding: "24px",
        borderRadius: "24px",
        background:
          "linear-gradient(145deg, rgba(20,25,45,0.98), rgba(12,16,30,0.98))",
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: "0 20px 50px rgba(0,0,0,0.25)",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            color: "#8b5cf6",
            fontSize: "13px",
            fontWeight: "700",
            letterSpacing: "1px",
          }}
        >
          📊 PROGRESS ANALYTICS
        </div>

        <h2
          style={{
            margin: "8px 0 6px",
            color: "white",
            fontSize: "26px",
          }}
        >
          Your Weekly Progress
        </h2>

        <p
          style={{
            margin: 0,
            color: "#9ca3af",
            fontSize: "14px",
          }}
        >
          Track your steps, hydration and workout consistency.
        </p>
      </div>

      <div
        style={{
          width: "100%",
          height: "300px",
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={history}>
            <CartesianGrid strokeDasharray="3 3" stroke="#273044" />

            <XAxis
              dataKey="day"
              stroke="#9ca3af"
              tick={{ fill: "#9ca3af" }}
            />

            <YAxis
              stroke="#9ca3af"
              tick={{ fill: "#9ca3af" }}
            />

            <Tooltip
              contentStyle={{
                background: "#111827",
                border: "1px solid #374151",
                borderRadius: "12px",
                color: "white",
              }}
            />

            <Line
              type="monotone"
              dataKey="steps"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Steps"
            />

            <Line
              type="monotone"
              dataKey="water"
              stroke="#38bdf8"
              strokeWidth={3}
              dot={{ r: 4 }}
              name="Water (ml)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            padding: "16px",
            borderRadius: "16px",
            background: "rgba(34,197,94,0.08)",
            border: "1px solid rgba(34,197,94,0.15)",
          }}
        >
          <div style={{ fontSize: "12px", color: "#9ca3af" }}>
            WEEKLY STEPS
          </div>

          <strong
            style={{
              display: "block",
              marginTop: "6px",
              color: "white",
              fontSize: "22px",
            }}
          >
            {history
              .reduce((total, item) => total + item.steps, 0)
              .toLocaleString()}
          </strong>
        </div>

        <div
          style={{
            padding: "16px",
            borderRadius: "16px",
            background: "rgba(56,189,248,0.08)",
            border: "1px solid rgba(56,189,248,0.15)",
          }}
        >
          <div style={{ fontSize: "12px", color: "#9ca3af" }}>
            WATER INTAKE
          </div>

          <strong
            style={{
              display: "block",
              marginTop: "6px",
              color: "white",
              fontSize: "22px",
            }}
          >
            {history
              .reduce((total, item) => total + item.water, 0)
              .toLocaleString()}{" "}
            ml
          </strong>
        </div>

        <div
          style={{
            padding: "16px",
            borderRadius: "16px",
            background: "rgba(168,85,247,0.08)",
            border: "1px solid rgba(168,85,247,0.15)",
          }}
        >
          <div style={{ fontSize: "12px", color: "#9ca3af" }}>
            WORKOUTS
          </div>

          <strong
            style={{
              display: "block",
              marginTop: "6px",
              color: "white",
              fontSize: "22px",
            }}
          >
            {history.reduce(
              (total, item) => total + item.workouts,
              0
            )}
          </strong>
        </div>
      </div>
    </section>
  );
}