import { useEffect, useState } from "react";

const exerciseData = {
  "Push Ups": { icon: "💪", muscle: "Chest + Triceps", defaultReps: 12, defaultSets: 3, rest: 30 },
  "Bench Press": { icon: "🏋️", muscle: "Chest + Triceps", defaultReps: 10, defaultSets: 3, rest: 45 },
  "Tricep Dips": { icon: "💪", muscle: "Triceps + Shoulders", defaultReps: 10, defaultSets: 3, rest: 30 },
  "Lat Pulldown": { icon: "🏋️", muscle: "Back + Biceps", defaultReps: 10, defaultSets: 3, rest: 45 },
  "Rows": { icon: "🏋️", muscle: "Back + Biceps", defaultReps: 10, defaultSets: 3, rest: 45 },
  "Bicep Curls": { icon: "💪", muscle: "Biceps", defaultReps: 12, defaultSets: 3, rest: 30 },
  "Squats": { icon: "🦵", muscle: "Quads + Glutes", defaultReps: 12, defaultSets: 3, rest: 30 },
  "Lunges": { icon: "🦵", muscle: "Legs + Glutes", defaultReps: 10, defaultSets: 3, rest: 30 },
  "Calf Raises": { icon: "🦵", muscle: "Calves", defaultReps: 15, defaultSets: 3, rest: 25 },
  "Glute Bridges": { icon: "🍑", muscle: "Glutes + Hamstrings", defaultReps: 12, defaultSets: 3, rest: 30 },
  "Shoulder Press": { icon: "🏋️", muscle: "Shoulders", defaultReps: 10, defaultSets: 3, rest: 40 },
  "Lateral Raises": { icon: "💪", muscle: "Shoulders", defaultReps: 12, defaultSets: 3, rest: 30 },
  "Plank": { icon: "🧘", muscle: "Core", defaultReps: 30, defaultSets: 3, rest: 30 },
  "Mountain Climbers": { icon: "🏃", muscle: "Core + Cardio", defaultReps: 20, defaultSets: 3, rest: 30 },
  "Jumping Jacks": { icon: "🏃", muscle: "Full Body + Cardio", defaultReps: 20, defaultSets: 3, rest: 30 },
  "Burpees": { icon: "🔥", muscle: "Full Body + Cardio", defaultReps: 10, defaultSets: 3, rest: 40 },
  "High Knees": { icon: "🏃", muscle: "Cardio + Core", defaultReps: 20, defaultSets: 3, rest: 30 },
  "Brisk Walk": { icon: "🚶", muscle: "Cardio", defaultReps: 10, defaultSets: 3, rest: 30 },
  "Walking": { icon: "🚶", muscle: "Cardio + Recovery", defaultReps: 10, defaultSets: 3, rest: 20 },
  "Cycling": { icon: "🚴", muscle: "Cardio + Legs", defaultReps: 10, defaultSets: 3, rest: 30 },
  "Light Jog": { icon: "🏃", muscle: "Cardio", defaultReps: 10, defaultSets: 3, rest: 30 },
  "Jog": { icon: "🏃", muscle: "Cardio", defaultReps: 10, defaultSets: 3, rest: 30 },
  "Dance": { icon: "💃", muscle: "Full Body + Cardio", defaultReps: 10, defaultSets: 3, rest: 30 },
  "Sports": { icon: "⚽", muscle: "Full Body", defaultReps: 10, defaultSets: 3, rest: 30 },
  "Stretching": { icon: "🧘", muscle: "Mobility + Recovery", defaultReps: 10, defaultSets: 3, rest: 20 },
  "Mobility": { icon: "🧘", muscle: "Mobility + Recovery", defaultReps: 10, defaultSets: 3, rest: 20 },
  "Balance": { icon: "🧘", muscle: "Balance + Stability", defaultReps: 10, defaultSets: 3, rest: 20 },
};

const exerciseNames = Object.keys(exerciseData);

export default function Workout({ plan, onWorkoutComplete }) {
  const [exercise, setExercise] = useState("Push Ups");
  const [seconds, setSeconds] = useState(30);
  const [running, setRunning] = useState(false);
  const [reps, setReps] = useState(12);
  const [sets, setSets] = useState(3);
  const [currentSet, setCurrentSet] = useState(1);
  const [completed, setCompleted] = useState(0);
  const [restSeconds, setRestSeconds] = useState(30);
  const [restRunning, setRestRunning] = useState(false);

  const info = exerciseData[exercise] || exerciseData["Push Ups"];

  useEffect(() => {
    if (!running) return;

    if (seconds <= 0) {
      setRunning(false);
      return;
    }

    const timer = setInterval(() => {
      setSeconds((value) => value - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [running, seconds]);

  useEffect(() => {
    if (!restRunning) return;

    if (restSeconds <= 0) {
      setRestRunning(false);
      return;
    }

    const timer = setInterval(() => {
      setRestSeconds((value) => value - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [restRunning, restSeconds]);

  useEffect(() => {
    if (!plan) return;

    const nextExercise = exerciseData[plan.exercise]
      ? plan.exercise
      : "Push Ups";

    const nextInfo = exerciseData[nextExercise];

    setExercise(nextExercise);
    setReps(Number(plan.reps) || nextInfo.defaultReps);
    setSets(Number(plan.sets) || nextInfo.defaultSets);
    setCurrentSet(1);
    setSeconds(30);
    setRunning(false);
    setRestSeconds(nextInfo.rest);
    setRestRunning(false);
  }, [plan]);

  const startWorkout = () => {
    setRestRunning(false);
    setRunning(true);
  };

  const pauseWorkout = () => {
    setRunning(false);
  };

  const resetWorkout = () => {
    setRunning(false);
    setRestRunning(false);
    setSeconds(30);
    setRestSeconds(info.rest);
    setCurrentSet(1);
  };

  const completeSet = () => {
    setRunning(false);

    if (currentSet < sets) {
      setCurrentSet((value) => value + 1);
      setRestSeconds(info.rest);
      setRestRunning(true);
      return;
    }

    setCompleted((value) => value + 1);
    setCurrentSet(1);

    if (onWorkoutComplete) {
      onWorkoutComplete({
        exercise,
        reps,
        sets,
        title: plan?.title || exercise,
      });
    }
    setRestSeconds(info.rest);
    setRestRunning(true);
  };

  const changeExercise = (event) => {
    const nextExercise = event.target.value;
    const nextInfo = exerciseData[nextExercise];

    setExercise(nextExercise);
    setReps(nextInfo.defaultReps);
    setSets(nextInfo.defaultSets);
    setCurrentSet(1);
    setSeconds(30);
    setRunning(false);
    setRestSeconds(nextInfo.rest);
    setRestRunning(false);
  };

  const formatTime = (value) =>
    `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(
      value % 60
    ).padStart(2, "0")}`;

  const progress = Math.min(100, ((currentSet - 1) / sets) * 100);

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div>
          <span style={styles.label}>AI WORKOUT CENTER</span>

          <h2 style={styles.title}>Workout Session 🏋️</h2>

          <p style={styles.subtitle}>
            Train smarter with your personalized workout timer.
          </p>
        </div>

        <div style={styles.completed}>
          <span>Completed</span>
          <strong>{completed}</strong>
        </div>
      </div>

      {plan && (
        <div style={styles.aiPlanBanner}>
          <span style={styles.aiPlanEmoji}>🤖</span>
          <div>
            <small style={styles.aiPlanLabel}>AI PLAN LOADED</small>
            <strong style={styles.aiPlanTitle}>{plan.title}</strong>
            <p style={styles.aiPlanText}>
              {exercise} • {reps} reps × {sets} sets
            </p>
          </div>
        </div>
      )}

      <div style={styles.content}>
        <div style={styles.left}>
          <label style={styles.inputLabel}>
            Select Exercise

            <select
              value={exercise}
              onChange={changeExercise}
              style={styles.select}
            >
              {exerciseNames.map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>

          <div style={styles.inputRow}>
            <label style={styles.inputLabel}>
              Target Reps
              <input
                type="number"
                min="1"
                value={reps}
                onChange={(event) => setReps(Math.max(1, Number(event.target.value)))}
                style={styles.input}
              />
            </label>

            <label style={styles.inputLabel}>
              Total Sets
              <input
                type="number"
                min="1"
                value={sets}
                onChange={(event) => {
                  const nextSets = Math.max(1, Number(event.target.value));
                  setSets(nextSets);
                  setCurrentSet((value) => Math.min(value, nextSets));
                }}
                style={styles.input}
              />
            </label>
          </div>

          <div style={styles.exerciseBox}>
            <div style={styles.exerciseIcon}>{info.icon}</div>

            <div>
              <h3 style={styles.exerciseName}>{exercise}</h3>
              <p style={styles.exerciseMeta}>{info.muscle}</p>
              <p style={styles.exerciseTarget}>
                Target: <strong>{reps} reps × {sets} sets</strong>
              </p>
            </div>
          </div>

          <div style={styles.setProgressBox}>
            <div style={styles.setProgressHeader}>
              <span>SET PROGRESS</span>
              <strong>{currentSet} / {sets}</strong>
            </div>

            <div style={styles.progressOuter}>
              <div style={{ ...styles.progressInner, width: `${progress}%` }} />
            </div>
          </div>

          <button onClick={completeSet} style={styles.completeButton}>
            ✓ Complete Set
          </button>
        </div>

        <div style={styles.timerArea}>
          <div style={styles.timerCircle}>
            <div style={styles.timerInner}>
              <span style={styles.timerLabel}>WORK TIMER</span>
              <strong style={styles.timer}>{formatTime(seconds)}</strong>
              <span style={styles.timerStatus}>
                {running ? "WORKING" : "READY"}
              </span>
            </div>
          </div>

          <div style={styles.timerInfoGrid}>
            <div style={styles.timerInfoItem}>
              <span>REPS</span>
              <strong>{reps}</strong>
            </div>
            <div style={styles.timerInfoItem}>
              <span>SET</span>
              <strong>{currentSet}/{sets}</strong>
            </div>
            <div style={styles.timerInfoItem}>
              <span>REST</span>
              <strong>{info.rest}s</strong>
            </div>
          </div>

          <div style={styles.controls}>
            {!running ? (
              <button onClick={startWorkout} style={styles.startButton}>
                ▶ Start
              </button>
            ) : (
              <button onClick={pauseWorkout} style={styles.pauseButton}>
                ❚❚ Pause
              </button>
            )}

            <button onClick={resetWorkout} style={styles.resetButton}>
              ↻ Reset
            </button>
          </div>

          {restRunning && (
            <div style={styles.restBox}>
              <div>
                <span style={styles.restLabel}>REST TIMER</span>
                <strong style={styles.restTimer}>{formatTime(restSeconds)}</strong>
              </div>

              <button
                onClick={() => {
                  setRestRunning(false);
                  setRestSeconds(0);
                }}
                style={styles.skipButton}
              >
                Skip Rest
              </button>
            </div>
          )}
        </div>
      </div>

      <div style={styles.quickInfo}>
        <span>⚡ {info.muscle}</span>
        <span>🎯 {reps} reps</span>
        <span>🔁 {sets} sets</span>
        <span>⏱️ {info.rest}s rest</span>
      </div>
    </div>
  );
}

const styles = {
  card: {
    width: "100%",
    boxSizing: "border-box",
    padding: "28px",
    borderRadius: "26px",
    background: "linear-gradient(135deg, rgba(15,23,42,0.95), rgba(8,47,73,0.75))",
    border: "1px solid rgba(56,189,248,0.18)",
    boxShadow: "0 20px 60px rgba(0,0,0,0.25)",
    color: "#f8fafc",
    marginBottom: "22px",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    flexWrap: "wrap",
    marginBottom: "22px",
  },
  label: {
    color: "#22d3ee",
    fontSize: "11px",
    fontWeight: "900",
    letterSpacing: "2px",
  },
  title: { fontSize: "28px", margin: "7px 0" },
  subtitle: { color: "#94a3b8", margin: 0 },
  completed: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "12px 22px",
    borderRadius: "16px",
    background: "rgba(34,211,238,0.08)",
    border: "1px solid rgba(34,211,238,0.2)",
  },
  aiPlanBanner: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "15px 18px",
    marginBottom: "24px",
    borderRadius: "17px",
    background: "rgba(34,211,238,0.07)",
    border: "1px solid rgba(34,211,238,0.16)",
  },
  aiPlanEmoji: { fontSize: "28px" },
  aiPlanLabel: {
    display: "block",
    color: "#22d3ee",
    fontSize: "9px",
    letterSpacing: "1.5px",
    fontWeight: "900",
  },
  aiPlanTitle: { display: "block", marginTop: "3px", fontSize: "15px" },
  aiPlanText: { margin: "4px 0 0", color: "#94a3b8", fontSize: "11px" },
  content: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "35px",
    alignItems: "center",
  },
  left: { display: "flex", flexDirection: "column", gap: "18px" },
  inputRow: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "12px",
  },
  inputLabel: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    color: "#cbd5e1",
    fontSize: "14px",
    fontWeight: "700",
  },
  select: {
    padding: "13px",
    borderRadius: "12px",
    background: "#020617",
    color: "#fff",
    border: "1px solid rgba(148,163,184,0.2)",
  },
  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px",
    borderRadius: "12px",
    background: "#020617",
    color: "#fff",
    border: "1px solid rgba(148,163,184,0.2)",
  },
  exerciseBox: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    padding: "20px",
    borderRadius: "18px",
    background: "rgba(2,6,23,0.6)",
  },
  exerciseIcon: { fontSize: "42px" },
  exerciseName: { margin: "0 0 5px" },
  exerciseMeta: { margin: 0, color: "#22d3ee", fontSize: "12px" },
  exerciseTarget: { margin: "7px 0 0", color: "#94a3b8", fontSize: "12px" },
  setProgressBox: {
    padding: "15px",
    borderRadius: "16px",
    background: "rgba(2,6,23,0.5)",
    border: "1px solid rgba(148,163,184,0.08)",
  },
  setProgressHeader: {
    display: "flex",
    justifyContent: "space-between",
    color: "#94a3b8",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1px",
  },
  progressOuter: {
    width: "100%",
    height: "7px",
    borderRadius: "20px",
    background: "#1e293b",
    overflow: "hidden",
    marginTop: "10px",
  },
  progressInner: {
    height: "100%",
    borderRadius: "20px",
    background: "linear-gradient(90deg,#22d3ee,#7c3aed)",
    transition: "width 0.3s ease",
  },
  completeButton: {
    padding: "14px",
    borderRadius: "13px",
    border: "none",
    background: "linear-gradient(135deg,#06b6d4,#7c3aed)",
    color: "#fff",
    fontWeight: "800",
    cursor: "pointer",
  },
  timerArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  timerCircle: {
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    background: "conic-gradient(#22d3ee 0deg, #7c3aed 180deg, #172033 180deg)",
    boxShadow: "0 0 60px rgba(34,211,238,0.18)",
  },
  timerInner: {
    width: "215px",
    height: "215px",
    borderRadius: "50%",
    background: "#020617",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  timerLabel: { color: "#64748b", fontSize: "11px", letterSpacing: "2px" },
  timer: { fontSize: "42px", margin: "8px 0" },
  timerStatus: { color: "#22d3ee", fontSize: "11px", fontWeight: "800" },
  timerInfoGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "8px",
    width: "100%",
    maxWidth: "330px",
    marginTop: "20px",
  },
  timerInfoItem: {
    padding: "9px 6px",
    borderRadius: "11px",
    background: "rgba(2,6,23,0.55)",
    textAlign: "center",
    border: "1px solid rgba(148,163,184,0.08)",
  },
  controls: { display: "flex", gap: "12px", marginTop: "15px" },
  startButton: {
    padding: "12px 22px",
    border: "none",
    borderRadius: "12px",
    background: "#06b6d4",
    color: "#fff",
    fontWeight: "800",
    cursor: "pointer",
  },
  pauseButton: {
    padding: "12px 22px",
    border: "none",
    borderRadius: "12px",
    background: "#7c3aed",
    color: "#fff",
    fontWeight: "800",
    cursor: "pointer",
  },
  resetButton: {
    padding: "12px 22px",
    border: "1px solid rgba(148,163,184,0.25)",
    borderRadius: "12px",
    background: "transparent",
    color: "#cbd5e1",
    fontWeight: "700",
    cursor: "pointer",
  },
  restBox: {
    width: "100%",
    maxWidth: "330px",
    marginTop: "15px",
    padding: "13px 15px",
    borderRadius: "14px",
    background: "rgba(124,58,237,0.1)",
    border: "1px solid rgba(124,58,237,0.25)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
  },
  restLabel: { display: "block", color: "#a78bfa", fontSize: "9px", letterSpacing: "1.5px" },
  restTimer: { display: "block", marginTop: "3px", fontSize: "20px" },
  skipButton: {
    padding: "8px 10px",
    borderRadius: "9px",
    border: "1px solid rgba(167,139,250,0.3)",
    background: "transparent",
    color: "#c4b5fd",
    cursor: "pointer",
    fontSize: "10px",
    fontWeight: "800",
  },
  quickInfo: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "25px",
    paddingTop: "18px",
    borderTop: "1px solid rgba(148,163,184,0.1)",
    color: "#94a3b8",
    fontSize: "11px",
  },
};
