import { useState } from "react";
import ThreeDBody from "./ThreeDBody";
import Workout from "./Workout";
import AICoach from "./AICoach";
import ProgressChart from "./ProgressChart";

export default function Dashboard({ user }) {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [age, setAge] = useState(21);

  const [water, setWater] = useState(1000);
  const [steps, setSteps] = useState(4200);
  const [workouts, setWorkouts] = useState(0);

  // =========================
  // GAMIFICATION
  // =========================

  const [xp, setXp] = useState(350);

  const level = Math.floor(xp / 500) + 1;

  const currentLevelXP = xp % 500;
  const nextLevelXP = 500;

  const levelProgress = Math.min(
    100,
    Math.round((currentLevelXP / nextLevelXP) * 100)
  );

  // =========================
  // FITNESS CALCULATIONS
  // =========================

  const bmi =
    height && weight
      ? (
          Number(weight) /
          ((Number(height) / 100) ** 2)
        ).toFixed(1)
      : "--";

  const calories =
    weight && age
      ? Math.round(Number(weight) * 24 * 1.4)
      : "--";

  const waterGoal = 2500;
  const stepGoal = 10000;

  // =========================
  // ACTIONS
  // =========================

  const addWorkout = () => {
    setWorkouts((prev) => prev + 1);
    setXp((prev) => prev + 100);
  };

  const addSteps = () => {
    setSteps((prev) => Math.min(prev + 500, stepGoal));
    setXp((prev) => prev + 20);
  };

  const addWater = () => {
    setWater((prev) => Math.min(prev + 250, waterGoal));
    setXp((prev) => prev + 10);
  };

  // =========================
  // ACHIEVEMENTS
  // =========================

  const achievements = [
    {
      title: "Workout Warrior",
      icon: "🏋️",
      unlocked: workouts >= 1,
      description: "Complete your first workout",
    },
    {
      title: "Step Master",
      icon: "👟",
      unlocked: steps >= 5000,
      description: "Reach 5,000 steps",
    },
    {
      title: "Hydration Hero",
      icon: "💧",
      unlocked: water >= waterGoal,
      description: "Complete your water goal",
    },
    {
      title: "7 Day Streak",
      icon: "🔥",
      unlocked: true,
      description: "Maintain a fitness streak",
    },
  ];

  return (
    <div style={styles.page}>

      {/* =========================
          HEADER
      ========================= */}

      <header style={styles.header}>
        <div>
          <p style={styles.logoSmall}>AI FIT TRACK</p>

          <h1 style={styles.title}>
            Welcome back,{" "}
            <span style={styles.green}>
              {user?.name || "Athlete"}
            </span>{" "}
            👋
          </h1>

          <p style={styles.subtitle}>
            Your AI-powered fitness dashboard
          </p>
        </div>

        <div style={styles.profile}>
          <div style={styles.avatar}>
            {(user?.name || "A").charAt(0).toUpperCase()}
          </div>

          <div>
            <strong>{user?.name || "Athlete"}</strong>
            <small style={styles.profileSmall}>
              LEVEL {level}
            </small>
          </div>
        </div>
      </header>

      {/* =========================
          TOP STATS
      ========================= */}

      <section style={styles.statsGrid}>

        <StatCard
          icon="⚖️"
          title="BMI"
          value={bmi}
          subtitle="Body Mass Index"
        />

        <StatCard
          icon="🔥"
          title="Calories"
          value={calories}
          subtitle="Daily estimate"
        />

        <StatCard
          icon="💧"
          title="Water"
          value={`${(water / 1000).toFixed(1)} L`}
          subtitle={`Goal ${(waterGoal / 1000).toFixed(1)} L`}
        />

        <StatCard
          icon="👟"
          title="Steps"
          value={steps.toLocaleString()}
          subtitle={`Goal ${stepGoal.toLocaleString()}`}
        />

      </section>

      {/* =========================
          GAMIFICATION
      ========================= */}

      <section style={styles.gameGrid}>

        {/* LEVEL CARD */}

        <div style={styles.gameCard}>

          <div style={styles.gameHeader}>
            <div>
              <p style={styles.sectionLabel}>YOUR PROGRESS</p>

              <h2 style={styles.gameTitle}>
                Level {level} 🚀
              </h2>

              <p style={styles.gameSubtitle}>
                Keep training to unlock new levels
              </p>
            </div>

            <div style={styles.xpBox}>
              <span>⚡</span>

              <strong style={styles.xpBoxValue}>
                {xp}
              </strong>

              <small style={styles.xpBoxLabel}>
                XP POINTS
              </small>
            </div>
          </div>

          <div style={styles.progressOuter}>
            <div
              style={{
                ...styles.progressInner,
                width: `${levelProgress}%`,
              }}
            />
          </div>

          <div style={styles.levelInfo}>
            <span>
              {currentLevelXP} / {nextLevelXP} XP
            </span>

            <span>
              {levelProgress}%
            </span>
          </div>

        </div>

        {/* STREAK CARD */}

        <div style={styles.streakCard}>

          <div style={styles.streakIcon}>
            🔥
          </div>

          <div>
            <p style={styles.sectionLabel}>
              CURRENT STREAK
            </p>

            <h2 style={styles.streakNumber}>
              7 Days
            </h2>

            <p style={styles.gameSubtitle}>
              Keep going! Don't break the streak.
            </p>
          </div>

        </div>

      </section>

      {/* =========================
          FITNESS ASSESSMENT
      ========================= */}

      <section style={styles.card}>

        <div style={styles.cardHeader}>
          <div>
            <p style={styles.sectionLabel}>
              FITNESS ASSESSMENT
            </p>

            <h2 style={styles.cardTitle}>
              Your Body Metrics
            </h2>

            <p style={styles.cardSubtitle}>
              Update your details to calculate your fitness metrics.
            </p>
          </div>

          <div style={styles.aiBadge}>
            🤖 AI ANALYSIS
          </div>
        </div>

        <div style={styles.inputGrid}>

          <Input
            label="HEIGHT"
            value={height}
            suffix="cm"
            onChange={setHeight}
          />

          <Input
            label="WEIGHT"
            value={weight}
            suffix="kg"
            onChange={setWeight}
          />

          <Input
            label="AGE"
            value={age}
            suffix="yrs"
            onChange={setAge}
          />

        </div>

      </section>

      {/* =========================
          3D BODY
      ========================= */}

      <section style={styles.card}>

        <div style={styles.cardHeader}>

          <div>
            <p style={styles.sectionLabel}>
              INTERACTIVE 3D
            </p>

            <h2 style={styles.cardTitle}>
              Explore Your Body
            </h2>

            <p style={styles.cardSubtitle}>
              Drag to rotate • Scroll to zoom
            </p>
          </div>

          <div style={styles.liveBadge}>
            ● LIVE 3D
          </div>

        </div>

        <div style={styles.body3D}>
          <ThreeDBody />
        </div>

      </section>

      {/* =========================
          WORKOUT
      ========================= */}

      <section style={styles.card}>

        <div style={styles.cardHeader}>

          <div>
            <p style={styles.sectionLabel}>
              WORKOUT CENTER
            </p>

            <h2 style={styles.cardTitle}>
              Train Like a Pro 💪
            </h2>

            <p style={styles.cardSubtitle}>
              Track your exercise and build your daily routine.
            </p>
          </div>

          <button
            style={styles.actionButton}
            onClick={addWorkout}
          >
            + Complete Workout
          </button>

        </div>

        <Workout />

      </section>

      {/* =========================
          PROGRESS CHART
      ========================= */}

      <section style={styles.card}>

        <ProgressChart />

      </section>

      {/* =========================
          DAILY ACTIVITY
      ========================= */}

      <section style={styles.activityGrid}>

        <div style={styles.activityCard}>

          <div style={styles.activityTop}>
            <div>
              <p style={styles.sectionLabel}>
                DAILY STEPS
              </p>

              <h2 style={styles.activityValue}>
                {steps.toLocaleString()}
              </h2>
            </div>

            <span style={styles.activityIcon}>
              👟
            </span>
          </div>

          <div style={styles.progressOuter}>
            <div
              style={{
                ...styles.progressInner,
                width: `${Math.min(
                  100,
                  (steps / stepGoal) * 100
                )}%`,
              }}
            />
          </div>

          <button
            style={styles.smallButton}
            onClick={addSteps}
          >
            + 500 Steps
          </button>

        </div>

        <div style={styles.activityCard}>

          <div style={styles.activityTop}>
            <div>
              <p style={styles.sectionLabel}>
                WATER INTAKE
              </p>

              <h2 style={styles.activityValue}>
                {(water / 1000).toFixed(1)} L
              </h2>
            </div>

            <span style={styles.activityIcon}>
              💧
            </span>
          </div>

          <div style={styles.progressOuter}>
            <div
              style={{
                ...styles.progressInner,
                width: `${Math.min(
                  100,
                  (water / waterGoal) * 100
                )}%`,
              }}
            />
          </div>

          <button
            style={styles.smallButton}
            onClick={addWater}
          >
            + 250 ml
          </button>

        </div>

      </section>

      {/* =========================
          WORKOUT SUMMARY
      ========================= */}

      <section style={styles.summaryCard}>

        <div>
          <p style={styles.sectionLabel}>
            WORKOUT SUMMARY
          </p>

          <h2 style={styles.cardTitle}>
            {workouts} Workouts Completed
          </h2>

          <p style={styles.cardSubtitle}>
            Every workout takes you closer to your goal.
          </p>
        </div>

        <div style={styles.summaryNumber}>
          {workouts}
        </div>

      </section>

      {/* =========================
          ACHIEVEMENTS
      ========================= */}

      <section style={styles.card}>

        <div style={styles.cardHeader}>

          <div>
            <p style={styles.sectionLabel}>
              ACHIEVEMENTS
            </p>

            <h2 style={styles.cardTitle}>
              Your Badges 🏆
            </h2>

            <p style={styles.cardSubtitle}>
              Complete challenges to unlock achievements.
            </p>
          </div>

        </div>

        <div style={styles.badgesGrid}>

          {achievements.map((achievement) => (
            <div
              key={achievement.title}
              style={{
                ...styles.badge,
                opacity: achievement.unlocked ? 1 : 0.45,
              }}
            >

              <div
                style={{
                  ...styles.badgeIcon,
                  filter: achievement.unlocked
                    ? "none"
                    : "grayscale(1)",
                }}
              >
                {achievement.icon}
              </div>

              <div>
                <strong style={styles.badgeTitle}>
                  {achievement.title}
                </strong>

                <p style={styles.badgeDescription}>
                  {achievement.description}
                </p>
              </div>

              {achievement.unlocked && (
                <span style={styles.unlocked}>
                  ✓
                </span>
              )}

            </div>
          ))}

        </div>

      </section>

      {/* =========================
          AI COACH
      ========================= */}

      <section style={styles.card}>

        <AICoach
          user={user}
          bmi={bmi}
          calories={calories}
          water={(waterGoal / 1000).toFixed(1)}
        />

      </section>

      {/* =========================
          FOOTER
      ========================= */}

      <footer style={styles.footer}>
        <p>
          AI Fit Track • AI-Powered 3D Fitness & Wellness Platform
        </p>

        <span>
          Built with React + Three.js + AI 🤖
        </span>
      </footer>

    </div>
  );
}

/* =====================================================
   STAT CARD
===================================================== */

function StatCard({
  icon,
  title,
  value,
  subtitle,
}) {
  return (
    <div style={styles.statCard}>

      <div style={styles.statIcon}>
        {icon}
      </div>

      <div>
        <p style={styles.statTitle}>
          {title}
        </p>

        <h2 style={styles.statValue}>
          {value}
        </h2>

        <p style={styles.statSubtitle}>
          {subtitle}
        </p>
      </div>

    </div>
  );
}

/* =====================================================
   INPUT
===================================================== */

function Input({
  label,
  value,
  suffix,
  onChange,
}) {
  return (
    <div style={styles.inputBox}>

      <label style={styles.inputLabel}>
        {label}
      </label>

      <div style={styles.inputWrapper}>

        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={styles.input}
        />

        <span style={styles.suffix}>
          {suffix}
        </span>

      </div>

    </div>
  );
}

/* =====================================================
   STYLES
===================================================== */

const styles = {

  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at top right, #172554 0%, #020617 35%, #020617 100%)",
    color: "#f8fafc",
    padding: "35px",
    fontFamily:
      "Inter, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
  },

  header: {
    maxWidth: "1250px",
    margin: "0 auto 35px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  logoSmall: {
    color: "#22c55e",
    fontSize: "11px",
    fontWeight: "800",
    letterSpacing: "3px",
    marginBottom: "10px",
  },

  title: {
    fontSize: "38px",
    margin: "0",
    fontWeight: "800",
  },

  green: {
    color: "#22c55e",
  },

  subtitle: {
    color: "#94a3b8",
    marginTop: "8px",
  },

  profile: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 15px",
    border: "1px solid #1e293b",
    background: "rgba(15,23,42,0.8)",
    borderRadius: "18px",
  },

  avatar: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    background:
      "linear-gradient(135deg,#22c55e,#06b6d4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "900",
    color: "#020617",
  },

  profileSmall: {
    display: "block",
    color: "#22c55e",
    fontSize: "9px",
    marginTop: "3px",
    letterSpacing: "1px",
  },

  statsGrid: {
    maxWidth: "1250px",
    margin: "0 auto 25px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "18px",
  },

  statCard: {
    padding: "22px",
    borderRadius: "22px",
    border: "1px solid #1e293b",
    background:
      "linear-gradient(145deg,rgba(15,23,42,0.95),rgba(2,6,23,0.9))",
    display: "flex",
    alignItems: "center",
    gap: "16px",
    boxShadow:
      "0 20px 50px rgba(0,0,0,0.25)",
  },

  statIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "15px",
    background: "#111827",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
  },

  statTitle: {
    color: "#64748b",
    fontSize: "11px",
    letterSpacing: "1px",
    margin: "0 0 5px",
  },

  statValue: {
    margin: "0",
    fontSize: "27px",
  },

  statSubtitle: {
    margin: "4px 0 0",
    color: "#94a3b8",
    fontSize: "11px",
  },

  gameGrid: {
    maxWidth: "1250px",
    margin: "0 auto 25px",
    display: "grid",
    gridTemplateColumns:
      "minmax(0,2fr) minmax(280px,1fr)",
    gap: "20px",
  },

  gameCard: {
    padding: "25px",
    borderRadius: "24px",
    border: "1px solid #1e293b",
    background:
      "linear-gradient(145deg,#0f172a,#020617)",
  },

  gameHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
  },

  gameTitle: {
    margin: "5px 0",
    fontSize: "27px",
  },

  gameSubtitle: {
    margin: "4px 0 0",
    color: "#94a3b8",
    fontSize: "12px",
  },

  sectionLabel: {
    color: "#22c55e",
    fontSize: "10px",
    letterSpacing: "2px",
    fontWeight: "800",
    margin: "0",
  },

  xpBox: {
    minWidth: "90px",
    padding: "12px",
    borderRadius: "18px",
    background: "#111827",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },

  xpBoxValue: {
    fontSize: "25px",
  },

  xpBoxLabel: {
    color: "#64748b",
    fontSize: "9px",
    letterSpacing: "1px",
  },

  progressOuter: {
    width: "100%",
    height: "9px",
    borderRadius: "20px",
    background: "#1e293b",
    overflow: "hidden",
    marginTop: "25px",
  },

  progressInner: {
    height: "100%",
    borderRadius: "20px",
    background:
      "linear-gradient(90deg,#22c55e,#06b6d4)",
    transition: "width 0.4s ease",
  },

  levelInfo: {
    display: "flex",
    justifyContent: "space-between",
    color: "#64748b",
    fontSize: "11px",
    marginTop: "8px",
  },

  streakCard: {
    padding: "25px",
    borderRadius: "24px",
    border: "1px solid #1e293b",
    background:
      "linear-gradient(145deg,#111827,#020617)",
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },

  streakIcon: {
    width: "65px",
    height: "65px",
    borderRadius: "20px",
    background: "#1c1917",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "32px",
  },

  streakNumber: {
    margin: "5px 0",
    fontSize: "30px",
  },

  card: {
    maxWidth: "1250px",
    margin: "0 auto 25px",
    padding: "28px",
    borderRadius: "25px",
    border: "1px solid #1e293b",
    background:
      "rgba(15,23,42,0.78)",
    boxShadow:
      "0 20px 70px rgba(0,0,0,0.2)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "25px",
  },

  cardTitle: {
    margin: "5px 0",
    fontSize: "27px",
  },

  cardSubtitle: {
    color: "#94a3b8",
    margin: "5px 0 0",
    fontSize: "13px",
  },

  aiBadge: {
    padding: "9px 13px",
    borderRadius: "30px",
    background: "#052e16",
    color: "#22c55e",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1px",
  },

  liveBadge: {
    padding: "9px 13px",
    borderRadius: "30px",
    background: "#172554",
    color: "#38bdf8",
    fontSize: "10px",
    fontWeight: "800",
  },

  inputGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(200px,1fr))",
    gap: "18px",
  },

  inputBox: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  inputLabel: {
    color: "#64748b",
    fontSize: "10px",
    fontWeight: "800",
    letterSpacing: "1.5px",
  },

  inputWrapper: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #334155",
    borderRadius: "14px",
    background: "#020617",
    overflow: "hidden",
  },

  input: {
    flex: 1,
    minWidth: 0,
    padding: "14px",
    background: "transparent",
    border: "none",
    outline: "none",
    color: "#fff",
    fontSize: "17px",
  },

  suffix: {
    paddingRight: "14px",
    color: "#64748b",
    fontSize: "12px",
  },

  body3D: {
    height: "500px",
    borderRadius: "20px",
    overflow: "hidden",
    background:
      "radial-gradient(circle,#172554,#020617 70%)",
  },

  actionButton: {
    border: "none",
    borderRadius: "13px",
    padding: "12px 16px",
    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",
    color: "#020617",
    fontWeight: "800",
    cursor: "pointer",
  },

  activityGrid: {
    maxWidth: "1250px",
    margin: "0 auto 25px",
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(300px,1fr))",
    gap: "20px",
  },

  activityCard: {
    padding: "25px",
    borderRadius: "23px",
    border: "1px solid #1e293b",
    background: "#0f172a",
  },

  activityTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  activityValue: {
    margin: "8px 0",
    fontSize: "30px",
  },

  activityIcon: {
    fontSize: "32px",
  },

  smallButton: {
    marginTop: "18px",
    border: "1px solid #334155",
    background: "#111827",
    color: "#e2e8f0",
    borderRadius: "11px",
    padding: "10px 14px",
    cursor: "pointer",
  },

  summaryCard: {
    maxWidth: "1250px",
    margin: "0 auto 25px",
    padding: "28px",
    borderRadius: "25px",
    border: "1px solid #1e293b",
    background:
      "linear-gradient(135deg,#052e16,#020617)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  summaryNumber: {
    fontSize: "55px",
    fontWeight: "900",
    color: "#22c55e",
  },

  badgesGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(230px,1fr))",
    gap: "15px",
  },

  badge: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    padding: "18px",
    borderRadius: "18px",
    background: "#020617",
    border: "1px solid #1e293b",
  },

  badgeIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#111827",
    fontSize: "24px",
  },

  badgeTitle: {
    fontSize: "13px",
  },

  badgeDescription: {
    margin: "4px 0 0",
    color: "#64748b",
    fontSize: "10px",
  },

  unlocked: {
    position: "absolute",
    right: "12px",
    top: "12px",
    color: "#22c55e",
    fontWeight: "900",
  },

  footer: {
    maxWidth: "1250px",
    margin: "45px auto 10px",
    paddingTop: "25px",
    borderTop: "1px solid #1e293b",
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    color: "#64748b",
    fontSize: "11px",
  },
};