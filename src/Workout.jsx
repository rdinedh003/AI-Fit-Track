import { useEffect, useMemo, useState } from "react";

const exerciseData = {
  "Push Ups": {
    icon: "💪",
    muscle: "Chest + Triceps",
    defaultReps: 12,
    defaultSets: 3,
    rest: 30,
    difficulty: "Intermediate",
    calories: 8,
  },
  "Bench Press": {
    icon: "🏋️",
    muscle: "Chest + Triceps",
    defaultReps: 10,
    defaultSets: 3,
    rest: 45,
    difficulty: "Intermediate",
    calories: 10,
  },
  "Tricep Dips": {
    icon: "💪",
    muscle: "Triceps + Shoulders",
    defaultReps: 10,
    defaultSets: 3,
    rest: 30,
    difficulty: "Intermediate",
    calories: 7,
  },
  "Lat Pulldown": {
    icon: "🏋️",
    muscle: "Back + Biceps",
    defaultReps: 10,
    defaultSets: 3,
    rest: 45,
    difficulty: "Intermediate",
    calories: 9,
  },
  Rows: {
    icon: "🏋️",
    muscle: "Back + Biceps",
    defaultReps: 10,
    defaultSets: 3,
    rest: 45,
    difficulty: "Intermediate",
    calories: 9,
  },
  "Bicep Curls": {
    icon: "💪",
    muscle: "Biceps",
    defaultReps: 12,
    defaultSets: 3,
    rest: 30,
    difficulty: "Beginner",
    calories: 6,
  },
  Squats: {
    icon: "🦵",
    muscle: "Quads + Glutes",
    defaultReps: 12,
    defaultSets: 3,
    rest: 30,
    difficulty: "Beginner",
    calories: 10,
  },
  Lunges: {
    icon: "🦵",
    muscle: "Legs + Glutes",
    defaultReps: 10,
    defaultSets: 3,
    rest: 30,
    difficulty: "Intermediate",
    calories: 9,
  },
  "Calf Raises": {
    icon: "🦵",
    muscle: "Calves",
    defaultReps: 15,
    defaultSets: 3,
    rest: 25,
    difficulty: "Beginner",
    calories: 5,
  },
  "Glute Bridges": {
    icon: "🍑",
    muscle: "Glutes + Hamstrings",
    defaultReps: 12,
    defaultSets: 3,
    rest: 30,
    difficulty: "Beginner",
    calories: 7,
  },
  "Shoulder Press": {
    icon: "🏋️",
    muscle: "Shoulders",
    defaultReps: 10,
    defaultSets: 3,
    rest: 40,
    difficulty: "Intermediate",
    calories: 8,
  },
  "Lateral Raises": {
    icon: "💪",
    muscle: "Shoulders",
    defaultReps: 12,
    defaultSets: 3,
    rest: 30,
    difficulty: "Beginner",
    calories: 6,
  },
  Plank: {
    icon: "🧘",
    muscle: "Core",
    defaultReps: 30,
    defaultSets: 3,
    rest: 30,
    difficulty: "Beginner",
    calories: 6,
  },
  "Mountain Climbers": {
    icon: "🏃",
    muscle: "Core + Cardio",
    defaultReps: 20,
    defaultSets: 3,
    rest: 30,
    difficulty: "Intermediate",
    calories: 11,
  },
  "Jumping Jacks": {
    icon: "🏃",
    muscle: "Full Body + Cardio",
    defaultReps: 20,
    defaultSets: 3,
    rest: 30,
    difficulty: "Beginner",
    calories: 9,
  },
  Burpees: {
    icon: "🔥",
    muscle: "Full Body + Cardio",
    defaultReps: 10,
    defaultSets: 3,
    rest: 40,
    difficulty: "Advanced",
    calories: 13,
  },
  "High Knees": {
    icon: "🏃",
    muscle: "Cardio + Core",
    defaultReps: 20,
    defaultSets: 3,
    rest: 30,
    difficulty: "Intermediate",
    calories: 10,
  },
  "Brisk Walk": {
    icon: "🚶",
    muscle: "Cardio",
    defaultReps: 10,
    defaultSets: 3,
    rest: 30,
    difficulty: "Beginner",
    calories: 5,
  },
  Walking: {
    icon: "🚶",
    muscle: "Cardio + Recovery",
    defaultReps: 10,
    defaultSets: 3,
    rest: 20,
    difficulty: "Beginner",
    calories: 4,
  },
  Cycling: {
    icon: "🚴",
    muscle: "Cardio + Legs",
    defaultReps: 10,
    defaultSets: 3,
    rest: 30,
    difficulty: "Intermediate",
    calories: 10,
  },
  "Light Jog": {
    icon: "🏃",
    muscle: "Cardio",
    defaultReps: 10,
    defaultSets: 3,
    rest: 30,
    difficulty: "Beginner",
    calories: 7,
  },
  Jog: {
    icon: "🏃",
    muscle: "Cardio",
    defaultReps: 10,
    defaultSets: 3,
    rest: 30,
    difficulty: "Intermediate",
    calories: 9,
  },
  Dance: {
    icon: "💃",
    muscle: "Full Body + Cardio",
    defaultReps: 10,
    defaultSets: 3,
    rest: 30,
    difficulty: "Beginner",
    calories: 8,
  },
  Sports: {
    icon: "⚽",
    muscle: "Full Body",
    defaultReps: 10,
    defaultSets: 3,
    rest: 30,
    difficulty: "Intermediate",
    calories: 10,
  },
  Stretching: {
    icon: "🧘",
    muscle: "Mobility + Recovery",
    defaultReps: 10,
    defaultSets: 3,
    rest: 20,
    difficulty: "Beginner",
    calories: 3,
  },
  Mobility: {
    icon: "🧘",
    muscle: "Mobility + Recovery",
    defaultReps: 10,
    defaultSets: 3,
    rest: 20,
    difficulty: "Beginner",
    calories: 3,
  },
  Balance: {
    icon: "🧘",
    muscle: "Balance + Stability",
    defaultReps: 10,
    defaultSets: 3,
    rest: 20,
    difficulty: "Beginner",
    calories: 4,
  },
};

const exerciseNames = Object.keys(exerciseData);

function getSavedXP() {
  const saved = localStorage.getItem("aiFitWorkoutXP");
  return saved ? Number(saved) : 0;
}

function getLevelFromXP(xp) {
  return Math.floor(xp / 500) + 1;
}

function getLevelProgress(xp) {
  return Math.min(100, Math.round(((xp % 500) / 500) * 100));
}

export default function Workout({ plan, onWorkoutComplete }) {
  const [exercise, setExercise] = useState("Push Ups");
  const [seconds, setSeconds] = useState(30);
  const [running, setRunning] = useState(false);

  const [reps, setReps] = useState(12);
  const [sets, setSets] = useState(3);

  const [currentSet, setCurrentSet] = useState(1);
  const [completedSets, setCompletedSets] = useState(0);
  const [completedWorkouts, setCompletedWorkouts] = useState(0);

  const [restSeconds, setRestSeconds] = useState(30);
  const [restRunning, setRestRunning] = useState(false);

  const [xp, setXp] = useState(getSavedXP);
  const [showXP, setShowXP] = useState(false);
  const [xpAmount, setXpAmount] = useState(0);

  const [levelUp, setLevelUp] = useState(false);
  const [achievement, setAchievement] = useState("");
  const [pulse, setPulse] = useState(false);

  const info = exerciseData[exercise] || exerciseData["Push Ups"];

  const level = getLevelFromXP(xp);
  const levelProgress = getLevelProgress(xp);
  const nextLevelXP = level * 500;

  const sessionXP = useMemo(() => {
    return completedSets * 25 + completedWorkouts * 100;
  }, [completedSets, completedWorkouts]);

  const totalSessionCalories = useMemo(() => {
    return completedSets * info.calories;
  }, [completedSets, info.calories]);

  useEffect(() => {
    localStorage.setItem("aiFitWorkoutXP", String(xp));
  }, [xp]);

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
    setCompletedSets(0);

    setSeconds(30);
    setRunning(false);

    setRestSeconds(nextInfo.rest);
    setRestRunning(false);
  }, [plan]);

  const formatTime = (value) => {
    return `${String(Math.floor(value / 60)).padStart(2, "0")}:${String(
      value % 60
    ).padStart(2, "0")}`;
  };

  const startWorkout = () => {
    setRestRunning(false);
    setRunning(true);
    setPulse(true);

    setTimeout(() => {
      setPulse(false);
    }, 500);
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
    setCompletedSets(0);
  };

  const awardXP = (amount) => {
    const previousLevel = getLevelFromXP(xp);
    const nextXP = xp + amount;
    const nextLevel = getLevelFromXP(nextXP);

    setXpAmount(amount);
    setShowXP(true);

    setTimeout(() => {
      setShowXP(false);
    }, 1300);

    setXp(nextXP);

    if (nextLevel > previousLevel) {
      setLevelUp(true);

      setTimeout(() => {
        setLevelUp(false);
      }, 2200);
    }
  };

  const unlockAchievement = (message) => {
    setAchievement(message);

    setTimeout(() => {
      setAchievement("");
    }, 2800);
  };

  const completeSet = () => {
    setRunning(false);

    const nextCompletedSets = completedSets + 1;

    setCompletedSets(nextCompletedSets);
    awardXP(25);

    setPulse(true);

    setTimeout(() => {
      setPulse(false);
    }, 600);

    if (nextCompletedSets === 1) {
      unlockAchievement("🔥 First Set Completed!");
    }

    if (currentSet < sets) {
      setCurrentSet((value) => value + 1);

      setSeconds(30);
      setRestSeconds(info.rest);
      setRestRunning(true);

      return;
    }

    const nextCompletedWorkouts = completedWorkouts + 1;

    setCompletedWorkouts(nextCompletedWorkouts);

    awardXP(100);

    if (nextCompletedWorkouts === 1) {
      unlockAchievement("🏆 Workout Completed!");
    }

    if (nextCompletedWorkouts === 3) {
      unlockAchievement("⚡ 3 Workouts Completed!");
    }

    setCurrentSet(1);
    setSeconds(30);
    setRestSeconds(info.rest);
    setRestRunning(true);

    if (onWorkoutComplete) {
      onWorkoutComplete({
        exercise,
        reps,
        sets,
        title: plan?.title || exercise,
      });
    }
  };

  const changeExercise = (event) => {
    const nextExercise = event.target.value;
    const nextInfo = exerciseData[nextExercise];

    setExercise(nextExercise);
    setReps(nextInfo.defaultReps);
    setSets(nextInfo.defaultSets);

    setCurrentSet(1);
    setCompletedSets(0);

    setSeconds(30);
    setRunning(false);

    setRestSeconds(nextInfo.rest);
    setRestRunning(false);
  };

  const setProgress = Math.min(100, (completedSets / sets) * 100);

  const timerProgress = Math.min(100, ((30 - seconds) / 30) * 100);

  return (
    <div style={styles.card}>
      <style>
        {`
          @keyframes workoutPulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.045); }
            100% { transform: scale(1); }
          }

          @keyframes xpFloat {
            0% {
              opacity: 0;
              transform: translate(-50%, 20px) scale(.7);
            }
            25% {
              opacity: 1;
              transform: translate(-50%, 0) scale(1);
            }
            100% {
              opacity: 0;
              transform: translate(-50%, -75px) scale(1.1);
            }
          }

          @keyframes levelPop {
            0% {
              opacity: 0;
              transform: scale(.65);
            }
            30% {
              opacity: 1;
              transform: scale(1.05);
            }
            70% {
              opacity: 1;
              transform: scale(1);
            }
            100% {
              opacity: 0;
              transform: scale(1.15);
            }
          }

          @keyframes achievementSlide {
            0% {
              opacity: 0;
              transform: translateY(-25px);
            }
            15% {
              opacity: 1;
              transform: translateY(0);
            }
            80% {
              opacity: 1;
            }
            100% {
              opacity: 0;
              transform: translateY(-15px);
            }
          }

          @keyframes scanLine {
            0% { transform: translateX(-120%); }
            100% { transform: translateX(120%); }
          }

          @keyframes orbPulse {
            0%,100% {
              box-shadow:
                0 0 20px rgba(34,211,238,.2),
                0 0 50px rgba(124,58,237,.08);
            }
            50% {
              box-shadow:
                0 0 35px rgba(34,211,238,.45),
                0 0 90px rgba(124,58,237,.22);
            }
          }

          .ai-workout-hover {
            transition:
              transform .25s ease,
              border-color .25s ease,
              box-shadow .25s ease;
          }

          .ai-workout-hover:hover {
            transform: translateY(-3px);
            border-color: rgba(34,211,238,.35) !important;
            box-shadow: 0 15px 40px rgba(0,0,0,.2);
          }

          @media (max-width: 700px) {
            .workout-content-grid {
              grid-template-columns: 1fr !important;
            }

            .workout-timer-circle {
              width: 210px !important;
              height: 210px !important;
            }

            .workout-timer-inner {
              width: 178px !important;
              height: 178px !important;
            }

            .workout-input-row {
              grid-template-columns: 1fr !important;
            }
          }
        `}
      </style>

      {showXP && (
        <div style={styles.xpPopup}>
          +{xpAmount} XP
        </div>
      )}

      {levelUp && (
        <div style={styles.levelUpOverlay}>
          <div style={styles.levelUpCard}>
            <div style={styles.levelUpIcon}>🆙</div>
            <span style={styles.levelUpSmall}>LEVEL UP</span>
            <strong style={styles.levelUpTitle}>Level {level}</strong>
            <p style={styles.levelUpText}>
              Your fitness journey just got stronger.
            </p>
          </div>
        </div>
      )}

      {achievement && (
        <div style={styles.achievementToast}>
          <span>🏆</span>
          <div>
            <small>ACHIEVEMENT UNLOCKED</small>
            <strong>{achievement}</strong>
          </div>
        </div>
      )}

      <div style={styles.header}>
        <div>
          <span style={styles.label}>AI WORKOUT CENTER</span>

          <h2 style={styles.title}>Workout Session 🏋️</h2>

          <p style={styles.subtitle}>
            Train smarter with your personalized AI workout system.
          </p>
        </div>

        <div style={styles.levelCard}>
          <div style={styles.levelTop}>
            <span>LEVEL {level}</span>
            <strong>{xp} XP</strong>
          </div>

          <div style={styles.levelBarOuter}>
            <div
              style={{
                ...styles.levelBarInner,
                width: `${levelProgress}%`,
              }}
            />
          </div>

          <small>
            {Math.max(0, nextLevelXP - xp)} XP to next level
          </small>
        </div>
      </div>

      {plan && (
        <div style={styles.aiPlanBanner}>
          <div style={styles.aiPlanOrb}>🤖</div>

          <div>
            <small style={styles.aiPlanLabel}>AI PLAN LOADED</small>

            <strong style={styles.aiPlanTitle}>
              {plan.title}
            </strong>

            <p style={styles.aiPlanText}>
              {exercise} • {reps} reps × {sets} sets
            </p>
          </div>

          <div style={styles.aiLiveBadge}>
            <span style={styles.liveDot} />
            AI ACTIVE
          </div>
        </div>
      )}

      <div style={styles.sessionStats}>
        <div className="ai-workout-hover" style={styles.statCard}>
          <span>🔥</span>
          <div>
            <small>SETS DONE</small>
            <strong>{completedSets}</strong>
          </div>
        </div>

        <div className="ai-workout-hover" style={styles.statCard}>
          <span>⚡</span>
          <div>
            <small>SESSION XP</small>
            <strong>{sessionXP}</strong>
          </div>
        </div>

        <div className="ai-workout-hover" style={styles.statCard}>
          <span>🏆</span>
          <div>
            <small>WORKOUTS</small>
            <strong>{completedWorkouts}</strong>
          </div>
        </div>

        <div className="ai-workout-hover" style={styles.statCard}>
          <span>🔥</span>
          <div>
            <small>CALORIES</small>
            <strong>{totalSessionCalories}</strong>
          </div>
        </div>
      </div>

      <div
        className="workout-content-grid"
        style={styles.content}
      >
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

          <div
            className="workout-input-row"
            style={styles.inputRow}
          >
            <label style={styles.inputLabel}>
              Target Reps

              <input
                type="number"
                min="1"
                value={reps}
                onChange={(event) =>
                  setReps(
                    Math.max(1, Number(event.target.value))
                  )
                }
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
                  const nextSets = Math.max(
                    1,
                    Number(event.target.value)
                  );

                  setSets(nextSets);

                  setCurrentSet((value) =>
                    Math.min(value, nextSets)
                  );
                }}
                style={styles.input}
              />
            </label>
          </div>

          <div
            className="ai-workout-hover"
            style={{
              ...styles.exerciseBox,
              ...(pulse ? styles.exercisePulse : {}),
            }}
          >
            <div style={styles.exerciseVisual}>
              <div style={styles.exerciseGlow} />
              <span style={styles.exerciseIcon}>
                {info.icon}
              </span>
            </div>

            <div style={{ flex: 1 }}>
              <div style={styles.exerciseTop}>
                <h3 style={styles.exerciseName}>
                  {exercise}
                </h3>

                <span style={styles.difficulty}>
                  {info.difficulty}
                </span>
              </div>

              <p style={styles.exerciseMeta}>
                {info.muscle}
              </p>

              <p style={styles.exerciseTarget}>
                Target:{" "}
                <strong>
                  {reps} reps × {sets} sets
                </strong>
              </p>
            </div>
          </div>

          <div style={styles.setProgressBox}>
            <div style={styles.setProgressHeader}>
              <span>WORKOUT PROGRESS</span>

              <strong>
                {completedSets} / {sets} SETS
              </strong>
            </div>

            <div style={styles.progressOuter}>
              <div
                style={{
                  ...styles.progressInner,
                  width: `${setProgress}%`,
                }}
              />
            </div>

            <div style={styles.setDots}>
              {Array.from({ length: sets }).map(
                (_, index) => {
                  const done = index < completedSets;
                  const active =
                    index === currentSet - 1;

                  return (
                    <div
                      key={index}
                      style={{
                        ...styles.setDot,
                        ...(done
                          ? styles.setDotDone
                          : {}),
                        ...(active
                          ? styles.setDotActive
                          : {}),
                      }}
                    >
                      {done
                        ? "✓"
                        : index + 1}
                    </div>
                  );
                }
              )}
            </div>
          </div>

          <button
            onClick={completeSet}
            style={styles.completeButton}
          >
            <span>✓</span>
            Complete Set
            <small>+25 XP</small>
          </button>
        </div>

        <div style={styles.timerArea}>
          <div
            className="workout-timer-circle"
            style={{
              ...styles.timerCircle,
              ...(running ? styles.timerActive : {}),
            }}
          >
            <div
              className="workout-timer-inner"
              style={styles.timerInner}
            >
              <div style={styles.timerOrb}>
                {running ? "⚡" : "🎯"}
              </div>

              <span style={styles.timerLabel}>
                {running
                  ? "WORKING"
                  : restRunning
                  ? "REST"
                  : "WORK TIMER"}
              </span>

              <strong style={styles.timer}>
                {restRunning
                  ? formatTime(restSeconds)
                  : formatTime(seconds)}
              </strong>

              <span style={styles.timerStatus}>
                {running
                  ? "STAY FOCUSED"
                  : restRunning
                  ? "RECOVER"
                  : "READY"}
              </span>
            </div>

            <div
              style={{
                ...styles.timerScan,
                animation: running
                  ? "scanLine 1.4s linear infinite"
                  : "none",
              }}
            />
          </div>

          <div style={styles.timerInfoGrid}>
            <div
              className="ai-workout-hover"
              style={styles.timerInfoItem}
            >
              <span>REPS</span>
              <strong>{reps}</strong>
            </div>

            <div
              className="ai-workout-hover"
              style={styles.timerInfoItem}
            >
              <span>SET</span>
              <strong>
                {currentSet}/{sets}
              </strong>
            </div>

            <div
              className="ai-workout-hover"
              style={styles.timerInfoItem}
            >
              <span>REST</span>
              <strong>{info.rest}s</strong>
            </div>
          </div>

          <div style={styles.controls}>
            {!running ? (
              <button
                onClick={startWorkout}
                style={styles.startButton}
              >
                ▶ Start Workout
              </button>
            ) : (
              <button
                onClick={pauseWorkout}
                style={styles.pauseButton}
              >
                ❚❚ Pause
              </button>
            )}

            <button
              onClick={resetWorkout}
              style={styles.resetButton}
            >
              ↻ Reset
            </button>
          </div>

          {restRunning && (
            <div style={styles.restBox}>
              <div>
                <span style={styles.restLabel}>
                  REST TIMER
                </span>

                <strong style={styles.restTimer}>
                  {formatTime(restSeconds)}
                </strong>
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

          <div style={styles.timerProgressOuter}>
            <div
              style={{
                ...styles.timerProgressInner,
                width: `${
                  restRunning
                    ? 100 -
                      (restSeconds / info.rest) * 100
                    : timerProgress
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      <div style={styles.quickInfo}>
        <span>⚡ {info.muscle}</span>
        <span>🎯 {reps} reps</span>
        <span>🔁 {sets} sets</span>
        <span>⏱️ {info.rest}s rest</span>
        <span>🔥 +25 XP / set</span>
      </div>
    </div>
  );
}

const styles = {
  card: {
    position: "relative",
    width: "100%",
    boxSizing: "border-box",
    padding: "28px",
    borderRadius: "26px",
    background:
      "linear-gradient(135deg, rgba(15,23,42,0.97), rgba(8,47,73,0.78))",
    border: "1px solid rgba(56,189,248,0.18)",
    boxShadow:
      "0 20px 60px rgba(0,0,0,0.25)",
    color: "#f8fafc",
    marginBottom: "22px",
    overflow: "hidden",
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

  title: {
    fontSize: "28px",
    margin: "7px 0",
  },

  subtitle: {
    color: "#94a3b8",
    margin: 0,
  },

  levelCard: {
    minWidth: "190px",
    padding: "13px 15px",
    borderRadius: "15px",
    background: "rgba(2,6,23,0.62)",
    border: "1px solid rgba(34,211,238,0.16)",
  },

  levelTop: {
    display: "flex",
    justifyContent: "space-between",
    color: "#cbd5e1",
    fontSize: "10px",
    fontWeight: "900",
  },

  levelBarOuter: {
    height: "6px",
    background: "#172033",
    borderRadius: "20px",
    overflow: "hidden",
    margin: "9px 0 6px",
  },

  levelBarInner: {
    height: "100%",
    borderRadius: "20px",
    background:
      "linear-gradient(90deg,#22d3ee,#7c3aed)",
    transition: "width .5s ease",
  },

  aiPlanBanner: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "15px 18px",
    marginBottom: "18px",
    borderRadius: "17px",
    background:
      "linear-gradient(90deg,rgba(34,211,238,.08),rgba(124,58,237,.08))",
    border: "1px solid rgba(34,211,238,.16)",
  },

  aiPlanOrb: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    background:
      "radial-gradient(circle,rgba(34,211,238,.22),rgba(124,58,237,.08))",
    animation: "orbPulse 2s infinite",
    fontSize: "23px",
  },

  aiPlanLabel: {
    display: "block",
    color: "#22d3ee",
    fontSize: "9px",
    letterSpacing: "1.5px",
    fontWeight: "900",
  },

  aiPlanTitle: {
    display: "block",
    marginTop: "3px",
    fontSize: "15px",
  },

  aiPlanText: {
    margin: "4px 0 0",
    color: "#94a3b8",
    fontSize: "11px",
  },

  aiLiveBadge: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "7px 9px",
    borderRadius: "20px",
    color: "#67e8f9",
    background: "rgba(34,211,238,.08)",
    border: "1px solid rgba(34,211,238,.16)",
    fontSize: "9px",
    fontWeight: "900",
    letterSpacing: "1px",
  },

  liveDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#22d3ee",
    boxShadow: "0 0 10px #22d3ee",
  },

  sessionStats: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(150px,1fr))",
    gap: "10px",
    marginBottom: "24px",
  },

  statCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "13px",
    borderRadius: "15px",
    background: "rgba(2,6,23,.48)",
    border: "1px solid rgba(148,163,184,.08)",
  },

  statCardEmoji: {
    fontSize: "22px",
  },

  content: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(280px,1fr))",
    gap: "35px",
    alignItems: "center",
  },

  left: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },

  inputRow: {
    display: "grid",
    gridTemplateColumns:
      "repeat(2,minmax(0,1fr))",
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
    border:
      "1px solid rgba(148,163,184,.2)",
    outline: "none",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px",
    borderRadius: "12px",
    background: "#020617",
    color: "#fff",
    border:
      "1px solid rgba(148,163,184,.2)",
    outline: "none",
  },

  exerciseBox: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
    padding: "20px",
    borderRadius: "18px",
    background: "rgba(2,6,23,.6)",
    border:
      "1px solid rgba(148,163,184,.08)",
  },

  exercisePulse: {
    animation: "workoutPulse .5s ease",
  },

  exerciseVisual: {
    position: "relative",
    width: "65px",
    height: "65px",
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
  },

  exerciseGlow: {
    position: "absolute",
    width: "58px",
    height: "58px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle,rgba(34,211,238,.22),transparent 70%)",
  },

  exerciseIcon: {
    position: "relative",
    fontSize: "40px",
  },

  exerciseTop: {
    display: "flex",
    alignItems: "center",
    gap: "9px",
    flexWrap: "wrap",
  },

  exerciseName: {
    margin: 0,
  },

  difficulty: {
    padding: "4px 7px",
    borderRadius: "6px",
    background: "rgba(124,58,237,.12)",
    color: "#c4b5fd",
    fontSize: "8px",
    fontWeight: "900",
    letterSpacing: ".8px",
  },

  exerciseMeta: {
    margin: "5px 0 0",
    color: "#22d3ee",
    fontSize: "12px",
  },

  exerciseTarget: {
    margin: "7px 0 0",
    color: "#94a3b8",
    fontSize: "12px",
  },

  setProgressBox: {
    padding: "15px",
    borderRadius: "16px",
    background: "rgba(2,6,23,.5)",
    border:
      "1px solid rgba(148,163,184,.08)",
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
    background:
      "linear-gradient(90deg,#22d3ee,#7c3aed)",
    transition: "width .4s ease",
  },

  setDots: {
    display: "flex",
    gap: "7px",
    marginTop: "13px",
    flexWrap: "wrap",
  },

  setDot: {
    width: "27px",
    height: "27px",
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    background: "#172033",
    color: "#64748b",
    fontSize: "10px",
    fontWeight: "900",
    border:
      "1px solid rgba(148,163,184,.1)",
  },

  setDotDone: {
    background:
      "linear-gradient(135deg,#06b6d4,#7c3aed)",
    color: "#fff",
    border: "none",
  },

  setDotActive: {
    border: "1px solid #22d3ee",
    color: "#67e8f9",
    boxShadow:
      "0 0 15px rgba(34,211,238,.18)",
  },

  completeButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    padding: "15px",
    borderRadius: "13px",
    border: "none",
    background:
      "linear-gradient(135deg,#06b6d4,#7c3aed)",
    color: "#fff",
    fontWeight: "900",
    cursor: "pointer",
    boxShadow:
      "0 12px 30px rgba(34,211,238,.12)",
  },

  timerArea: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  timerCircle: {
    position: "relative",
    width: "250px",
    height: "250px",
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    background:
      "conic-gradient(#22d3ee 0deg,#7c3aed 180deg,#172033 180deg)",
    boxShadow:
      "0 0 60px rgba(34,211,238,.18)",
    overflow: "hidden",
  },

  timerActive: {
    animation: "orbPulse 1.5s infinite",
  },

  timerInner: {
    position: "relative",
    zIndex: 2,
    width: "215px",
    height: "215px",
    borderRadius: "50%",
    background: "#020617",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border:
      "1px solid rgba(34,211,238,.12)",
  },

  timerOrb: {
    fontSize: "22px",
    marginBottom: "4px",
  },

  timerLabel: {
    color: "#64748b",
    fontSize: "10px",
    letterSpacing: "2px",
    fontWeight: "800",
  },

  timer: {
    fontSize: "42px",
    margin: "8px 0",
    letterSpacing: "1px",
  },

  timerStatus: {
    color: "#22d3ee",
    fontSize: "10px",
    fontWeight: "900",
    letterSpacing: "1px",
  },

  timerScan: {
    position: "absolute",
    left: 0,
    top: "50%",
    width: "100%",
    height: "2px",
    background:
      "linear-gradient(90deg,transparent,#22d3ee,transparent)",
    zIndex: 3,
    opacity: .8,
  },

  timerInfoGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(3,1fr)",
    gap: "8px",
    width: "100%",
    maxWidth: "330px",
    marginTop: "20px",
  },

  timerInfoItem: {
    padding: "9px 6px",
    borderRadius: "11px",
    background: "rgba(2,6,23,.55)",
    textAlign: "center",
    border:
      "1px solid rgba(148,163,184,.08)",
  },

  controls: {
    display: "flex",
    gap: "12px",
    marginTop: "15px",
    flexWrap: "wrap",
    justifyContent: "center",
  },

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
    border:
      "1px solid rgba(148,163,184,.25)",
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
    background: "rgba(124,58,237,.1)",
    border:
      "1px solid rgba(124,58,237,.25)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
  },

  restLabel: {
    display: "block",
    color: "#a78bfa",
    fontSize: "9px",
    letterSpacing: "1.5px",
  },

  restTimer: {
    display: "block",
    marginTop: "3px",
    fontSize: "20px",
  },

  skipButton: {
    padding: "8px 10px",
    borderRadius: "9px",
    border:
      "1px solid rgba(167,139,250,.3)",
    background: "transparent",
    color: "#c4b5fd",
    cursor: "pointer",
    fontSize: "10px",
    fontWeight: "800",
  },

  timerProgressOuter: {
    width: "100%",
    maxWidth: "330px",
    height: "3px",
    borderRadius: "20px",
    background: "#172033",
    overflow: "hidden",
    marginTop: "16px",
  },

  timerProgressInner: {
    height: "100%",
    background:
      "linear-gradient(90deg,#22d3ee,#7c3aed)",
    transition: "width .4s linear",
  },

  quickInfo: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "25px",
    paddingTop: "18px",
    borderTop:
      "1px solid rgba(148,163,184,.1)",
    color: "#94a3b8",
    fontSize: "11px",
  },

  xpPopup: {
    position: "fixed",
    left: "50%",
    top: "45%",
    zIndex: 1000,
    transform: "translateX(-50%)",
    color: "#67e8f9",
    fontSize: "28px",
    fontWeight: "1000",
    textShadow:
      "0 0 25px rgba(34,211,238,.65)",
    pointerEvents: "none",
    animation: "xpFloat 1.3s ease forwards",
  },

  levelUpOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 999,
    display: "grid",
    placeItems: "center",
    background: "rgba(2,6,23,.45)",
    backdropFilter: "blur(6px)",
    pointerEvents: "none",
  },

  levelUpCard: {
    padding: "35px 50px",
    borderRadius: "25px",
    textAlign: "center",
    background:
      "linear-gradient(135deg,rgba(8,47,73,.97),rgba(49,16,84,.97))",
    border:
      "1px solid rgba(34,211,238,.3)",
    boxShadow:
      "0 0 100px rgba(34,211,238,.2)",
    animation: "levelPop 2.2s ease forwards",
  },

  levelUpIcon: {
    fontSize: "45px",
  },

  levelUpSmall: {
    display: "block",
    marginTop: "8px",
    color: "#22d3ee",
    fontSize: "10px",
    fontWeight: "900",
    letterSpacing: "3px",
  },

  levelUpTitle: {
    display: "block",
    marginTop: "7px",
    fontSize: "34px",
  },

  levelUpText: {
    margin: "8px 0 0",
    color: "#94a3b8",
    fontSize: "12px",
  },

  achievementToast: {
    position: "fixed",
    top: "25px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 1001,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "12px 18px",
    borderRadius: "15px",
    background:
      "rgba(15,23,42,.96)",
    border:
      "1px solid rgba(250,204,21,.3)",
    boxShadow:
      "0 15px 50px rgba(0,0,0,.3)",
    animation:
      "achievementSlide 2.8s ease forwards",
    pointerEvents: "none",
  },
};