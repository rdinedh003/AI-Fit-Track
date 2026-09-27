import { useState } from "react";
import ThreeDBody from "./ThreeDBody";
import Workout from "./Workout";
import AICoach from "./AICoach";
import ProgressChart from "./ProgressChart";
import AIInsights from "./AIInsights";
import Profile from "./Profile";
import { sendFitnessData } from "./api";
import ProgressHistory from "./ProgressHistory";

export default function Dashboard({ user }) {
  const [height, setHeight] = useState(170);
  const [weight, setWeight] = useState(70);
  const [age, setAge] = useState(21);

  const [water, setWater] = useState(1000);
  const [steps, setSteps] = useState(4200);
  const [workouts, setWorkouts] = useState(0);
  const [selectedWorkoutPlan, setSelectedWorkoutPlan] = useState(null);

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("aiFitLoggedInUser");
    window.location.reload();
  };

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
          (Number(height) / 100) ** 2
        ).toFixed(1)
      : "--";

  const calories =
    weight && age
      ? Math.round(Number(weight) * 24 * 1.4)
      : "--";

  const waterGoal = 2500;
  const stepGoal = 10000;

  // =========================
  // PERSONALIZED AI
  // =========================

  const dailyChallenge = {
  title: "🔥 Daily Movement Challenge",
  description: "Complete 5,000 steps today",
  target: 5000,
  progress: Math.min(steps, 5000),
  completed: steps >= 5000,
};
const fitnessGoal =
    localStorage.getItem("aiFitFitnessGoal") ||
    "Improve Fitness";

  const getAIRecommendation = () => {
    if (fitnessGoal === "Build Muscle") {
      if (workouts < 2) {
        return "💪 Start with 2–3 strength workouts per week and focus on progressive training.";
      }

      return "💪 Great start! Keep focusing on strength training, recovery and balanced nutrition.";
    }

    if (fitnessGoal === "Lose Weight") {
      if (steps < 7000) {
        return "🔥 Try gradually increasing your daily steps and combine them with regular workouts.";
      }

      return "🔥 Your activity is looking good. Stay consistent with workouts, movement and balanced nutrition.";
    }

    if (fitnessGoal === "Stay Healthy") {
      if (water < 2000) {
        return "❤️ Focus on regular hydration, daily movement and consistent sleep.";
      }

      return "❤️ Nice! Keep maintaining hydration, movement, recovery and healthy daily habits.";
    }

    if (steps < 5000) {
      return "🏃 Try increasing your daily movement gradually. Small improvements every day matter.";
    }

    if (water < 1500) {
      return "💧 Your water intake is currently low. Try drinking water consistently throughout the day.";
    }

    return "🤖 Your routine is moving in a good direction. Stay consistent and keep improving gradually.";
  };

  const aiRecommendation = getAIRecommendation();
  const aiStatus = {
  score: Math.min(
    100,
    Math.round(
      (Math.min(steps, 10000) / 10000) * 40 +
        (Math.min(water, 2500) / 2500) * 30 +
        Math.min(workouts, 3) * 10
    )
  ),
  label:
    steps >= 7000 && water >= 2000 && workouts >= 2
      ? "Excellent"
      : steps >= 4000 || workouts >= 1
      ? "Improving"
      : "Getting Started",
};

  // =========================
  // AI WORKOUT PLAN
  // =========================

  const workoutPlans = {
    "Build Muscle": [
      { day: "MON", title: "Chest + Triceps", exercises: "Push-ups • Bench Press • Tricep Dips", sets: "3 sets × 8–12 reps" },
      { day: "TUE", title: "Back + Biceps", exercises: "Lat Pulldown • Rows • Bicep Curls", sets: "3 sets × 8–12 reps" },
      { day: "WED", title: "Recovery Day", exercises: "Walking • Mobility • Light Stretching", sets: "20–30 min" },
      { day: "THU", title: "Legs", exercises: "Squats • Lunges • Calf Raises", sets: "3 sets × 10–15 reps" },
      { day: "FRI", title: "Shoulders + Core", exercises: "Shoulder Press • Lateral Raises • Plank", sets: "3 sets × 10–15 reps" },
    ],
    "Lose Weight": [
      { day: "MON", title: "Full Body Burn", exercises: "Squats • Push-ups • Mountain Climbers", sets: "3 rounds" },
      { day: "TUE", title: "Cardio + Core", exercises: "Brisk Walk • High Knees • Plank", sets: "25–35 min" },
      { day: "WED", title: "Active Recovery", exercises: "Walking • Mobility • Stretching", sets: "20–30 min" },
      { day: "THU", title: "Lower Body", exercises: "Squats • Lunges • Glute Bridges", sets: "3 sets × 12 reps" },
      { day: "FRI", title: "HIIT + Core", exercises: "Jumping Jacks • Burpees • Plank", sets: "4 rounds" },
    ],
    "Stay Healthy": [
      { day: "MON", title: "Full Body", exercises: "Squats • Push-ups • Rows", sets: "2–3 sets × 10 reps" },
      { day: "TUE", title: "Cardio", exercises: "Walking • Cycling • Light Jog", sets: "25–30 min" },
      { day: "WED", title: "Mobility", exercises: "Stretching • Mobility • Balance", sets: "20 min" },
      { day: "THU", title: "Strength", exercises: "Squats • Press • Core", sets: "2–3 sets × 10 reps" },
      { day: "FRI", title: "Fun Activity", exercises: "Dance • Sports • Outdoor Walk", sets: "30 min" },
    ],
    "Improve Fitness": [
      { day: "MON", title: "Full Body Strength", exercises: "Squats • Push-ups • Rows", sets: "3 sets × 10 reps" },
      { day: "TUE", title: "Cardio", exercises: "Brisk Walk • Jog • Cycling", sets: "25–30 min" },
      { day: "WED", title: "Recovery", exercises: "Mobility • Stretching • Walking", sets: "20–30 min" },
      { day: "THU", title: "Strength + Core", exercises: "Lunges • Shoulder Press • Plank", sets: "3 sets × 10–12 reps" },
      { day: "FRI", title: "Conditioning", exercises: "Jumping Jacks • Mountain Climbers • Squats", sets: "3–4 rounds" },
    ],
  };

  const currentWorkoutPlan = workoutPlans[fitnessGoal] || workoutPlans["Improve Fitness"];

  // =========================
  // WORKOUT PLAN ACTION
  // =========================

  const startWorkoutPlan = (plan) => {
    const firstExercise = plan.exercises.split(" • ")[0].trim();

    const repsMatch = plan.sets.match(/(\d+)(?:–|-)(\d+) reps|(\d+) reps/);
    const reps = repsMatch
      ? Number(repsMatch[1] || repsMatch[3])
      : 10;

    const setsMatch = plan.sets.match(/(\d+) sets/);
    const sets = setsMatch ? Number(setsMatch[1]) : 3;

    setSelectedWorkoutPlan({
      id: `${plan.day}-${plan.title}-${Date.now()}`,
      exercise: firstExercise,
      reps,
      sets,
      title: plan.title,
    });

    setTimeout(() => {
      document.getElementById("workout-center")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);
  };

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
  // BACKEND SYNC
  // =========================

  const syncFitnessData = async () => {
    try {
      const result = await sendFitnessData({
        height,
        weight,
        age,
        steps,
        water,
        workouts,
      });

      console.log("Fitness data synced:", result);

      alert(
        `Fitness data synced successfully!\nBMI: ${result.data.bmi}`
      );
    } catch (error) {
      console.error("Fitness data sync failed:", error);

      alert(
        "Backend connection failed. Please make sure FastAPI server is running."
      );
    }
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
        <div style={styles.headerGlow} />

        <div style={styles.headerLeft}>
          <div style={styles.brandRow}>
            <div style={styles.brandMark}>AI</div>

            <div>
              <p style={styles.logoSmall}>AI FIT TRACK</p>
              <div style={styles.liveStatus}>
                <span style={styles.liveDot} />
                AI FITNESS SYSTEM ONLINE
              </div>
            </div>
          </div>

          <h1 style={styles.title}>
            Welcome back{" "}
            <span style={styles.green}>
              {user?.name || "Athlete"}
            </span>{" "}
            <span style={styles.wave}>👋</span>
          </h1>

          <p style={styles.subtitle}>
            Your AI-powered fitness dashboard is ready.
            <span style={styles.subtitleAccent}>
              {" "}Keep moving. Keep improving.
            </span>
          </p>
        </div>

        <div style={styles.profile}>
          <div style={styles.avatarWrap}>
            <div style={styles.avatar}>
              {(user?.name || "A").charAt(0).toUpperCase()}
            </div>
            <span style={styles.avatarOnline} />
          </div>

          <div style={styles.profileInfo}>
            <strong style={styles.profileName}>
              {user?.name || "Athlete"}
            </strong>

            <small style={styles.profileSmall}>
              LEVEL {level} • {xp} XP
            </small>

            <div style={styles.profileActions}>
              <span style={styles.goalPill}>
                🎯 {fitnessGoal}
              </span>

              <button
                onClick={handleLogout}
                style={styles.logoutButton}
              >
                Logout
              </button>
            </div>
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

        <div style={styles.gameCard}>

          <div style={styles.gameHeader}>

            <div>
              <p style={styles.sectionLabel}>
                YOUR PROGRESS
              </p>

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

        <button
          onClick={syncFitnessData}
          style={styles.syncButton}
        >
          🤖 Sync With AI Backend
        </button>

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

      <section id="workout-center" style={styles.card}>

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

        <Workout
          plan={selectedWorkoutPlan}
          onWorkoutComplete={() => {
            setWorkouts((prev) => prev + 1);
            setXp((prev) => prev + 100);
          }}
        />

      </section>

      {/* =========================
          PROGRESS CHART
      ========================= */}

      <section style={styles.card}>
        <ProgressChart />

        <ProgressHistory />
        <div
  style={{
    marginTop: "20px",
    padding: "22px",
    borderRadius: "22px",
    background:
      "linear-gradient(135deg, rgba(59,130,246,0.14), rgba(139,92,246,0.14))",
    border: "1px solid rgba(139,92,246,0.2)",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "12px",
      flexWrap: "wrap",
    }}
  >
    <div>
      <div
        style={{
          color: "#8b5cf6",
          fontSize: "12px",
          fontWeight: "700",
          letterSpacing: "1px",
        }}
      >
        🤖 AI FITNESS SCORE
      </div>

      <h3
        style={{
          color: "white",
          margin: "8px 0 4px",
        }}
      >
        Your Fitness Status
      </h3>

      <p
        style={{
          color: "#9ca3af",
          margin: 0,
        }}
      >
        AI analysis based on your current activity.
      </p>
    </div>

    <div
      style={{
        minWidth: "90px",
        height: "90px",
        borderRadius: "50%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(139,92,246,0.16)",
        border: "2px solid rgba(139,92,246,0.35)",
      }}
    >
      <strong
        style={{
          color: "white",
          fontSize: "25px",
        }}
      >
        {aiStatus.score}
      </strong>

      <span
        style={{
          color: "#9ca3af",
          fontSize: "11px",
        }}
      >
        / 100
      </span>
    </div>
  </div>

  <div
    style={{
      marginTop: "16px",
      height: "8px",
      borderRadius: "10px",
      background: "rgba(255,255,255,0.08)",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${aiStatus.score}%`,
        height: "100%",
        background: "#8b5cf6",
        borderRadius: "10px",
        transition: "width 0.5s ease",
      }}
    />
  </div>

  <div
    style={{
      marginTop: "10px",
      color: "#c4b5fd",
      fontWeight: "700",
    }}
  >
    {aiStatus.label}
  </div>
</div>
        <div
  style={{
    marginTop: "20px",
    padding: "22px",
    borderRadius: "22px",
    background:
      "linear-gradient(135deg, rgba(245,158,11,0.14), rgba(168,85,247,0.12))",
    border: "1px solid rgba(245,158,11,0.2)",
  }}
>
  <div
    style={{
      fontSize: "12px",
      color: "#f59e0b",
      fontWeight: "700",
      letterSpacing: "1px",
    }}
  >
    🎯 DAILY CHALLENGE
  </div>

  <h3
    style={{
      color: "white",
      margin: "8px 0 5px",
    }}
  >
    {dailyChallenge.title}
  </h3>

  <p
    style={{
      color: "#9ca3af",
      margin: "0 0 14px",
    }}
  >
    {dailyChallenge.description}
  </p>

  <div
    style={{
      height: "8px",
      borderRadius: "10px",
      background: "rgba(255,255,255,0.08)",
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${
          (dailyChallenge.progress / dailyChallenge.target) * 100
        }%`,
        height: "100%",
        background: "#f59e0b",
        borderRadius: "10px",
      }}
    />
  </div>

  <div
    style={{
      marginTop: "10px",
      color: "white",
      fontSize: "14px",
    }}
  >
    {dailyChallenge.progress.toLocaleString()} /{" "}
    {dailyChallenge.target.toLocaleString()} steps
  </div>

  {dailyChallenge.completed && (
    <div
      style={{
        marginTop: "12px",
        color: "#22c55e",
        fontWeight: "700",
      }}
    >
      ✅ Challenge Completed! +50 XP
    </div>
  )}
</div>

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
          PERSONALIZED AI RECOMMENDATION
      ========================= */}

      <section style={styles.aiRecommendationCard}>

        <div style={styles.aiRecommendationHeader}>

          <div>
            <p style={styles.sectionLabel}>
              PERSONALIZED AI
            </p>

            <h2 style={styles.cardTitle}>
              Your AI Recommendation 🤖
            </h2>

            <p style={styles.cardSubtitle}>
              Based on your current fitness goal and daily activity.
            </p>
          </div>

          <div style={styles.aiRecommendationIcon}>
            ✨
          </div>

        </div>

        <div style={styles.aiRecommendationContent}>

          <div style={styles.goalMiniCard}>

            <span style={styles.goalIcon}>
              🎯
            </span>

            <div>

              <small style={styles.goalMiniLabel}>
                YOUR GOAL
              </small>

              <strong style={styles.goalMiniValue}>
                {fitnessGoal}
              </strong>

            </div>

          </div>

          <div style={styles.recommendationMessage}>
            {aiRecommendation}
          </div>

        </div>

      </section>

      {/* =========================
          AI WORKOUT PLAN
      ========================= */}

      <section style={styles.aiWorkoutCard}>

        <div style={styles.cardHeader}>
          <div>
            <p style={styles.sectionLabel}>AI TRAINING PLAN</p>
            <h2 style={styles.cardTitle}>Your AI Workout Plan 💪</h2>
            <p style={styles.cardSubtitle}>
              A goal-based weekly routine generated for your current fitness goal.
            </p>
          </div>

          <div style={styles.aiPlanGoalBadge}>🎯 {fitnessGoal}</div>
        </div>

        <div style={styles.workoutPlanGrid}>
          {currentWorkoutPlan.map((plan) => (
            <div key={plan.day} style={styles.workoutPlanCard}>
              <div style={styles.workoutPlanDay}>{plan.day}</div>
              <h3 style={styles.workoutPlanTitle}>{plan.title}</h3>
              <p style={styles.workoutPlanExercises}>{plan.exercises}</p>
              <div style={styles.workoutPlanSets}>⚡ {plan.sets}</div>
              <button
                type="button"
                onClick={() => startWorkoutPlan(plan)}
                style={styles.startPlanButton}
              >
                ▶ Start Workout
              </button>
            </div>
          ))}
        </div>

        <div style={styles.workoutPlanNote}>
          <span>🤖</span>
          <p>Start at a comfortable intensity, use proper form, and rest when needed.</p>
        </div>

      </section>

      {/* =========================
          PROFILE
      ========================= */}

      <section style={styles.card}>

        <Profile
          user={user}
          height={height}
          weight={weight}
          age={age}
          onProfileUpdate={({ age, height, weight }) => {
            setAge(age);
            setHeight(height);
            setWeight(weight);
          }}
        />

      </section>

      {/* =========================
          AI INSIGHTS
      ========================= */}

      <section style={styles.card}>

        <AIInsights
          height={height}
          weight={weight}
          age={age}
          steps={steps}
          water={water}
          workouts={workouts}
        />

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
    position: "relative",
    maxWidth: "1250px",
    margin: "0 auto 35px",
    padding: "22px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "24px",
    flexWrap: "wrap",
    border: "1px solid rgba(51,65,85,0.75)",
    borderRadius: "28px",
    background: "linear-gradient(135deg,rgba(15,23,42,0.96),rgba(2,6,23,0.88))",
    boxShadow: "0 25px 80px rgba(0,0,0,0.28),inset 0 1px 0 rgba(255,255,255,0.03)",
    overflow: "hidden",
  },

  headerGlow: {
    position: "absolute",
    top: "-90px",
    left: "18%",
    width: "420px",
    height: "180px",
    borderRadius: "50%",
    background: "radial-gradient(circle,rgba(34,197,94,0.13),transparent 70%)",
    filter: "blur(10px)",
    pointerEvents: "none",
  },

  headerLeft: {
    position: "relative",
    zIndex: 1,
    minWidth: 0,
  },

  brandRow: {
    display: "flex",
    alignItems: "center",
    gap: "11px",
    marginBottom: "13px",
  },

  brandMark: {
    width: "34px",
    height: "34px",
    borderRadius: "11px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg,#22c55e,#06b6d4)",
    color: "#020617",
    fontSize: "11px",
    fontWeight: "950",
    boxShadow: "0 8px 25px rgba(34,197,94,0.2)",
  },

  liveStatus: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    color: "#64748b",
    fontSize: "8px",
    fontWeight: "800",
    letterSpacing: "1.2px",
    marginTop: "3px",
  },

  liveDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#22c55e",
    boxShadow: "0 0 12px rgba(34,197,94,0.9)",
  },

  avatarWrap: {
    position: "relative",
    flexShrink: 0,
  },

  avatarOnline: {
    position: "absolute",
    right: "0",
    bottom: "1px",
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#22c55e",
    border: "2px solid #0f172a",
    boxShadow: "0 0 10px rgba(34,197,94,0.7)",
  },

  profileName: {
    fontSize: "13px",
  },

  profileActions: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    flexWrap: "wrap",
    marginTop: "7px",
  },

  goalPill: {
    padding: "5px 8px",
    borderRadius: "8px",
    background: "rgba(34,211,238,0.07)",
    border: "1px solid rgba(34,211,238,0.14)",
    color: "#67e8f9",
    fontSize: "8px",
    fontWeight: "800",
    maxWidth: "150px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  wave: {
    display: "inline-block",
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
    lineHeight: "1.08",
    margin: "0",
    fontWeight: "850",
    letterSpacing: "-1.2px",
  },

  green: {
    color: "#22c55e",
  },

  subtitle: {
    color: "#94a3b8",
    marginTop: "9px",
    fontSize: "13px",
    lineHeight: "1.6",
  },

  subtitleAccent: {
    color: "#64748b",
  },

  profile: {
    position: "relative",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 13px",
    border: "1px solid rgba(51,65,85,0.8)",
    background: "rgba(2,6,23,0.68)",
    borderRadius: "18px",
    boxShadow: "0 12px 35px rgba(0,0,0,0.22)",
  },

  profileInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
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

  logoutButton: {
    marginTop: "7px",
    padding: "6px 12px",
    borderRadius: "8px",
    border: "1px solid rgba(248,113,113,0.3)",
    background: "rgba(248,113,113,0.08)",
    color: "#f87171",
    cursor: "pointer",
    fontSize: "10px",
    fontWeight: "800",
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

  syncButton: {
    marginTop: "20px",
    padding: "13px 20px",
    borderRadius: "12px",
    border: "none",
    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",
    color: "#020617",
    fontWeight: "800",
    cursor: "pointer",
    fontSize: "13px",
    boxShadow:
      "0 10px 30px rgba(34,197,94,0.2)",
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

  // =========================
  // AI WORKOUT PLAN
  // =========================

  aiWorkoutCard: {
    maxWidth: "1250px",
    margin: "0 auto 25px",
    padding: "28px",
    borderRadius: "25px",
    border: "1px solid rgba(34,197,94,0.18)",
    background: "linear-gradient(135deg,rgba(20,83,45,0.38),rgba(15,23,42,0.9))",
    boxShadow: "0 20px 70px rgba(34,197,94,0.08)",
  },

  aiPlanGoalBadge: {
    padding: "10px 14px",
    borderRadius: "30px",
    background: "rgba(34,197,94,0.1)",
    border: "1px solid rgba(34,197,94,0.2)",
    color: "#86efac",
    fontSize: "11px",
    fontWeight: "800",
  },

  workoutPlanGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
    gap: "14px",
  },

  workoutPlanCard: {
    padding: "18px",
    borderRadius: "18px",
    background: "rgba(2,6,23,0.65)",
    border: "1px solid #1e293b",
    minHeight: "165px",
  },

  workoutPlanDay: {
    display: "inline-block",
    padding: "5px 9px",
    borderRadius: "8px",
    background: "#052e16",
    color: "#22c55e",
    fontSize: "9px",
    fontWeight: "900",
    letterSpacing: "1px",
  },

  workoutPlanTitle: {
    margin: "12px 0 7px",
    fontSize: "16px",
  },

  workoutPlanExercises: {
    margin: "0",
    color: "#94a3b8",
    fontSize: "11px",
    lineHeight: "1.7",
  },

  workoutPlanSets: {
    marginTop: "14px",
    color: "#22d3ee",
    fontSize: "10px",
    fontWeight: "800",
  },

  startPlanButton: {
    marginTop: "14px",
    width: "100%",
    padding: "10px 12px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg,#22c55e,#06b6d4)",
    color: "#020617",
    fontWeight: "800",
    cursor: "pointer",
    fontSize: "11px",
  },

  workoutPlanNote: {
    marginTop: "18px",
    padding: "13px 15px",
    borderRadius: "14px",
    background: "rgba(34,211,238,0.05)",
    border: "1px solid rgba(34,211,238,0.1)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#94a3b8",
    fontSize: "11px",
  },

  // =========================
  // AI RECOMMENDATION
  // =========================

  aiRecommendationCard: {
    maxWidth: "1250px",
    margin: "0 auto 25px",
    padding: "28px",
    borderRadius: "25px",
    border: "1px solid rgba(34,211,238,0.2)",
    background:
      "linear-gradient(135deg,rgba(8,47,73,0.65),rgba(15,23,42,0.9))",
    boxShadow:
      "0 20px 70px rgba(8,47,73,0.25)",
  },

  aiRecommendationHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "22px",
  },

  aiRecommendationIcon: {
    width: "55px",
    height: "55px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(34,211,238,0.1)",
    border: "1px solid rgba(34,211,238,0.2)",
    fontSize: "25px",
  },

  aiRecommendationContent: {
    display: "grid",
    gridTemplateColumns:
      "minmax(180px,0.7fr) minmax(0,2fr)",
    gap: "15px",
  },

  goalMiniCard: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    borderRadius: "16px",
    background: "rgba(2,6,23,0.55)",
    border: "1px solid rgba(148,163,184,0.1)",
  },

  goalIcon: {
    fontSize: "24px",
  },

  goalMiniLabel: {
    display: "block",
    color: "#64748b",
    fontSize: "9px",
    letterSpacing: "1px",
  },

  goalMiniValue: {
    display: "block",
    color: "#22d3ee",
    fontSize: "13px",
    marginTop: "4px",
  },

  recommendationMessage: {
    padding: "16px",
    borderRadius: "16px",
    background: "rgba(34,211,238,0.06)",
    border: "1px solid rgba(34,211,238,0.1)",
    color: "#cbd5e1",
    fontSize: "13px",
    lineHeight: "1.7",
    display: "flex",
    alignItems: "center",
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