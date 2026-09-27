import { useEffect, useState } from "react";

function AIInsights({
  height,
  weight,
  age,
  steps,
  water,
  workouts,
}) {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getAIAnalysis = async () => {
    if (!height || !weight || !age) {
      setError("Please enter your height, weight and age first.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://127.0.0.1:8000/fitness-analysis",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            height: Number(height),
            weight: Number(weight),
            age: Number(age),
            steps: Number(steps),
            water: Number(water),
            workouts: Number(workouts),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("AI analysis request failed");
      }

      const result = await response.json();

      setAnalysis(result.analysis);
    } catch (err) {
      console.error(err);
      setError(
        "Unable to connect to AI backend. Make sure FastAPI is running."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (height && weight && age) {
      getAIAnalysis();
    }
  }, [height, weight, age, steps, water, workouts]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "15px",
          marginBottom: "20px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2
            style={{
              margin: 0,
              fontSize: "22px",
              color: "#f8fafc",
            }}
          >
            🤖 AI Fitness Insights
          </h2>

          <p
            style={{
              margin: "6px 0 0",
              color: "#94a3b8",
              fontSize: "13px",
            }}
          >
            Personalized analysis from your fitness data
          </p>
        </div>

        <button
          onClick={getAIAnalysis}
          disabled={loading}
          style={{
            padding: "11px 16px",
            borderRadius: "10px",
            border: "none",
            background:
              "linear-gradient(135deg,#8b5cf6,#6366f1)",
            color: "#fff",
            fontWeight: "700",
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.6 : 1,
          }}
        >
          {loading ? "Analyzing..." : "✨ Analyze Again"}
        </button>
      </div>

      {error && (
        <div
          style={{
            padding: "14px",
            borderRadius: "12px",
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            color: "#fca5a5",
            fontSize: "13px",
            marginBottom: "15px",
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {loading && !analysis && (
        <div
          style={{
            padding: "30px",
            textAlign: "center",
            color: "#a78bfa",
          }}
        >
          🧠 AI is analyzing your fitness data...
        </div>
      )}

      {analysis && (
        <div
          style={{
            display: "grid",
            gap: "14px",
          }}
        >
          {/* BMI */}
          <div
            style={{
              padding: "18px",
              borderRadius: "14px",
              background:
                "linear-gradient(135deg,rgba(139,92,246,0.12),rgba(99,102,241,0.06))",
              border: "1px solid rgba(139,92,246,0.2)",
            }}
          >
            <div
              style={{
                color: "#a78bfa",
                fontSize: "11px",
                fontWeight: "800",
                letterSpacing: "1px",
              }}
            >
              BMI ANALYSIS
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "10px",
                marginTop: "8px",
              }}
            >
              <strong
                style={{
                  fontSize: "30px",
                  color: "#f8fafc",
                }}
              >
                {analysis.bmi}
              </strong>

              <span
                style={{
                  color: "#c4b5fd",
                  fontSize: "13px",
                }}
              >
                {analysis.bmi_status}
              </span>
            </div>
          </div>

          {/* Steps */}
          <div
            style={{
              padding: "16px",
              borderRadius: "14px",
              background: "rgba(34,197,94,0.06)",
              border: "1px solid rgba(34,197,94,0.15)",
            }}
          >
            <strong
              style={{
                color: "#4ade80",
                fontSize: "13px",
              }}
            >
              🚶 Activity
            </strong>

            <p
              style={{
                margin: "7px 0 0",
                color: "#cbd5e1",
                fontSize: "13px",
                lineHeight: 1.6,
              }}
            >
              {analysis.step_message}
            </p>
          </div>

          {/* Water */}
          <div
            style={{
              padding: "16px",
              borderRadius: "14px",
              background: "rgba(14,165,233,0.06)",
              border: "1px solid rgba(14,165,233,0.15)",
            }}
          >
            <strong
              style={{
                color: "#38bdf8",
                fontSize: "13px",
              }}
            >
              💧 Hydration
            </strong>

            <p
              style={{
                margin: "7px 0 0",
                color: "#cbd5e1",
                fontSize: "13px",
                lineHeight: 1.6,
              }}
            >
              {analysis.water_message}
            </p>
          </div>

          {/* Workout */}
          <div
            style={{
              padding: "16px",
              borderRadius: "14px",
              background: "rgba(249,115,22,0.06)",
              border: "1px solid rgba(249,115,22,0.15)",
            }}
          >
            <strong
              style={{
                color: "#fb923c",
                fontSize: "13px",
              }}
            >
              🏋️ Workout
            </strong>

            <p
              style={{
                margin: "7px 0 0",
                color: "#cbd5e1",
                fontSize: "13px",
                lineHeight: 1.6,
              }}
            >
              {analysis.workout_message}
            </p>
          </div>

          {/* Overall */}
          <div
            style={{
              padding: "18px",
              borderRadius: "14px",
              background:
                "linear-gradient(135deg,rgba(34,197,94,0.1),rgba(16,185,129,0.05))",
              border: "1px solid rgba(34,197,94,0.2)",
            }}
          >
            <strong
              style={{
                color: "#86efac",
                fontSize: "13px",
              }}
            >
              🧠 AI Overall Insight
            </strong>

            <p
              style={{
                margin: "8px 0 0",
                color: "#e2e8f0",
                fontSize: "14px",
                lineHeight: 1.7,
              }}
            >
              {analysis.overall}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIInsights;