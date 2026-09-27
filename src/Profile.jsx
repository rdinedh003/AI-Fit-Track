import React, { useEffect, useState } from "react";

export default function Profile({
  user,
  height,
  weight,
  age,
  onProfileUpdate,
}) {
  const [editing, setEditing] = useState(false);

  const [editHeight, setEditHeight] = useState(height);
  const [editWeight, setEditWeight] = useState(weight);
  const [editAge, setEditAge] = useState(age);

  const [fitnessGoal, setFitnessGoal] = useState(
    localStorage.getItem("aiFitFitnessGoal") || "Improve Fitness"
  );

  useEffect(() => {
    setEditHeight(height);
    setEditWeight(weight);
    setEditAge(age);
  }, [height, weight, age]);

  const calculateBMI = () => {
    const h = Number(editHeight);
    const w = Number(editWeight);

    if (!h || !w) return 0;

    return w / ((h / 100) ** 2);
  };

  const bmi = calculateBMI();

  const getBMIStatus = () => {
    if (bmi === 0) return "Enter details";
    if (bmi < 18.5) return "Underweight";
    if (bmi < 25) return "Healthy";
    if (bmi < 30) return "Overweight";
    return "Obesity";
  };

  const handleSave = () => {
    const newAge = Number(editAge);
    const newHeight = Number(editHeight);
    const newWeight = Number(editWeight);

    if (!newAge || !newHeight || !newWeight) {
      alert("Please enter valid Age, Height and Weight.");
      return;
    }

    if (newAge < 10 || newAge > 100) {
      alert("Please enter a valid age.");
      return;
    }

    if (newHeight < 50 || newHeight > 250) {
      alert("Please enter a valid height.");
      return;
    }

    if (newWeight < 20 || newWeight > 300) {
      alert("Please enter a valid weight.");
      return;
    }

    if (onProfileUpdate) {
      onProfileUpdate({
        age: newAge,
        height: newHeight,
        weight: newWeight,
      });
    }

    setEditing(false);

    alert("Profile updated successfully!");
  };

  const handleGoalChange = (goal) => {
    setFitnessGoal(goal);
    localStorage.setItem("aiFitFitnessGoal", goal);
  };

  return (
    <div style={styles.container}>

      {/* PROFILE HEADER */}
      <div style={styles.header}>

        <div style={styles.avatar}>
          {(user?.name || "A").charAt(0).toUpperCase()}
        </div>

        <div style={styles.profileInfo}>
          <h2 style={styles.title}>
            {user?.name || "Athlete"}
          </h2>

          <p style={styles.email}>
            {user?.email || "No email available"}
          </p>
        </div>

        <button
          onClick={() => setEditing(!editing)}
          style={styles.editButton}
        >
          {editing ? "Cancel" : "✏️ Edit"}
        </button>

      </div>

      {/* EDIT SECTION */}
      {editing && (
        <div style={styles.editBox}>

          <h3 style={styles.editTitle}>
            Edit Fitness Profile
          </h3>

          <div style={styles.formGrid}>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Age
              </label>

              <input
                type="number"
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
                style={styles.input}
                min="10"
                max="100"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Height (cm)
              </label>

              <input
                type="number"
                value={editHeight}
                onChange={(e) => setEditHeight(e.target.value)}
                style={styles.input}
                min="50"
                max="250"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>
                Weight (kg)
              </label>

              <input
                type="number"
                value={editWeight}
                onChange={(e) => setEditWeight(e.target.value)}
                style={styles.input}
                min="20"
                max="300"
              />
            </div>

          </div>

          <button
            onClick={handleSave}
            style={styles.saveButton}
          >
            💾 Save Changes
          </button>

        </div>
      )}

      {/* FITNESS STATS */}
      <div style={styles.grid}>

        <div style={styles.card}>
          <span style={styles.icon}>🎂</span>

          <small style={styles.labelText}>
            AGE
          </small>

          <strong style={styles.value}>
            {editAge} years
          </strong>
        </div>

        <div style={styles.card}>
          <span style={styles.icon}>📏</span>

          <small style={styles.labelText}>
            HEIGHT
          </small>

          <strong style={styles.value}>
            {editHeight} cm
          </strong>
        </div>

        <div style={styles.card}>
          <span style={styles.icon}>⚖️</span>

          <small style={styles.labelText}>
            WEIGHT
          </small>

          <strong style={styles.value}>
            {editWeight} kg
          </strong>
        </div>

        <div style={styles.card}>
          <span style={styles.icon}>💚</span>

          <small style={styles.labelText}>
            BMI
          </small>

          <strong style={styles.value}>
            {bmi ? bmi.toFixed(1) : "--"}
          </strong>

          <span style={styles.status}>
            {getBMIStatus()}
          </span>
        </div>

      </div>

      {/* FITNESS GOAL */}
      <div style={styles.goalCard}>

        <div style={styles.goalTitle}>
          🎯 Fitness Goal
        </div>

        <p style={styles.goalDescription}>
          Choose your primary fitness goal.
        </p>

        <div style={styles.goalOptions}>

          <button
            onClick={() => handleGoalChange("Build Muscle")}
            style={{
              ...styles.goalButton,
              ...(fitnessGoal === "Build Muscle"
                ? styles.goalButtonActive
                : {}),
            }}
          >
            💪 Build Muscle
          </button>

          <button
            onClick={() => handleGoalChange("Lose Weight")}
            style={{
              ...styles.goalButton,
              ...(fitnessGoal === "Lose Weight"
                ? styles.goalButtonActive
                : {}),
            }}
          >
            🔥 Lose Weight
          </button>

          <button
            onClick={() => handleGoalChange("Improve Fitness")}
            style={{
              ...styles.goalButton,
              ...(fitnessGoal === "Improve Fitness"
                ? styles.goalButtonActive
                : {}),
            }}
          >
            🏃 Improve Fitness
          </button>

          <button
            onClick={() => handleGoalChange("Stay Healthy")}
            style={{
              ...styles.goalButton,
              ...(fitnessGoal === "Stay Healthy"
                ? styles.goalButtonActive
                : {}),
            }}
          >
            ❤️ Stay Healthy
          </button>

        </div>

        <div style={styles.selectedGoal}>
          Current Goal: <strong>{fitnessGoal}</strong>
        </div>

      </div>

    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    boxSizing: "border-box",
  },

  header: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "22px",
    flexWrap: "wrap",
  },

  avatar: {
    width: "64px",
    height: "64px",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #22d3ee, #6366f1)",
    color: "#ffffff",
    fontSize: "25px",
    fontWeight: "900",
    boxShadow: "0 10px 30px rgba(34,211,238,0.2)",
  },

  profileInfo: {
    flex: 1,
  },

  title: {
    margin: 0,
    color: "#f8fafc",
    fontSize: "22px",
  },

  email: {
    margin: "5px 0 0",
    color: "#64748b",
    fontSize: "13px",
  },

  editButton: {
    padding: "9px 14px",
    borderRadius: "10px",
    border: "1px solid rgba(34,211,238,0.25)",
    background: "rgba(34,211,238,0.08)",
    color: "#22d3ee",
    cursor: "pointer",
    fontWeight: "800",
    fontSize: "12px",
  },

  editBox: {
    marginBottom: "18px",
    padding: "18px",
    borderRadius: "16px",
    background: "rgba(15,23,42,0.8)",
    border: "1px solid rgba(34,211,238,0.15)",
  },

  editTitle: {
    margin: "0 0 16px",
    color: "#f8fafc",
    fontSize: "16px",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "12px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
  },

  label: {
    display: "block",
    marginBottom: "7px",
    color: "#94a3b8",
    fontSize: "11px",
    fontWeight: "700",
  },

  input: {
    width: "100%",
    boxSizing: "border-box",
    padding: "11px",
    borderRadius: "10px",
    border: "1px solid rgba(148,163,184,0.18)",
    background: "#020617",
    color: "#f8fafc",
    outline: "none",
    fontSize: "14px",
  },

  saveButton: {
    marginTop: "15px",
    padding: "10px 16px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #22d3ee, #6366f1)",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "800",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "12px",
  },

  card: {
    padding: "18px",
    borderRadius: "16px",
    background: "rgba(15,23,42,0.72)",
    border: "1px solid rgba(148,163,184,0.12)",
    display: "flex",
    flexDirection: "column",
    gap: "7px",
  },

  icon: {
    fontSize: "22px",
  },

  labelText: {
    color: "#64748b",
    fontSize: "10px",
    letterSpacing: "1px",
  },

  value: {
    color: "#f8fafc",
    fontSize: "18px",
  },

  status: {
    color: "#22d3ee",
    fontSize: "11px",
    fontWeight: "700",
  },

  goalCard: {
    marginTop: "15px",
    padding: "20px",
    borderRadius: "16px",
    background:
      "linear-gradient(135deg, rgba(34,211,238,0.08), rgba(99,102,241,0.08))",
    border: "1px solid rgba(34,211,238,0.15)",
  },

  goalTitle: {
    color: "#f8fafc",
    fontWeight: "800",
    fontSize: "17px",
  },

  goalDescription: {
    color: "#94a3b8",
    fontSize: "13px",
    margin: "8px 0 14px",
  },

  goalOptions: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
    gap: "10px",
  },

  goalButton: {
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(148,163,184,0.15)",
    background: "rgba(15,23,42,0.65)",
    color: "#cbd5e1",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "12px",
    transition: "0.2s",
  },

  goalButtonActive: {
    background: "rgba(34,211,238,0.15)",
    border: "1px solid rgba(34,211,238,0.45)",
    color: "#22d3ee",
    boxShadow: "0 0 20px rgba(34,211,238,0.08)",
  },

  selectedGoal: {
    marginTop: "15px",
    color: "#94a3b8",
    fontSize: "12px",
  },
};