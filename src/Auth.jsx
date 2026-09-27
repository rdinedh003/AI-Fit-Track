import { useState } from "react";

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Basic validation
    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill all required fields.");
      return;
    }

    const cleanEmail = email.trim().toLowerCase();

    // =========================
    // SIGN UP
    // =========================
    if (!isLogin) {
      const existingUser = localStorage.getItem(
        `aiFitUser_${cleanEmail}`
      );

      if (existingUser) {
        setError(
          "An account with this email already exists. Please login."
        );
        return;
      }

      const newUser = {
        name: name.trim(),
        email: cleanEmail,
        password: password,
      };

      localStorage.setItem(
        `aiFitUser_${cleanEmail}`,
        JSON.stringify(newUser)
      );

      setSuccess(
        "Account created successfully! You can now login."
      );

      // Switch to Login
      setIsLogin(true);

      // Keep email for easier login
      setName("");
      setPassword("");

      return;
    }

    // =========================
    // LOGIN
    // =========================
    const savedUser = localStorage.getItem(
      `aiFitUser_${cleanEmail}`
    );

    if (!savedUser) {
      setError(
        "Account not found. Please create an account first."
      );
      return;
    }

    const user = JSON.parse(savedUser);

    if (user.password !== password) {
      setError("Incorrect password. Please try again.");
      return;
    }

    // Save logged-in session
    localStorage.setItem(
      "aiFitLoggedInUser",
      JSON.stringify({
        name: user.name,
        email: user.email,
      })
    );

    // Send user to App.jsx
    onLogin({
      name: user.name,
      email: user.email,
    });
  };

  return (
    <div style={styles.page}>
      <div style={styles.glow}></div>

      <div style={styles.card}>
        <div style={styles.logo}>⚡</div>

        <h1>AI Fit Track</h1>

        <p style={styles.subtitle}>
          {isLogin
            ? "Welcome back. Continue your fitness journey."
            : "Create your account and start your journey."}
        </p>

        {error && (
          <div style={styles.error}>
            ⚠️ {error}
          </div>
        )}

        {success && (
          <div style={styles.success}>
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={styles.field}>
              <label>Full Name</label>

              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div style={styles.field}>
            <label>Email</label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={styles.field}>
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" style={styles.button}>
            {isLogin
              ? "Login →"
              : "Create Account →"}
          </button>
        </form>

        <div style={styles.switchText}>
          {isLogin
            ? "Don't have an account?"
            : "Already have an account?"}

          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
              setSuccess("");
              setPassword("");
            }}
            style={styles.switchButton}
          >
            {isLogin ? " Sign Up" : " Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "radial-gradient(circle at 20% 20%, rgba(124,92,255,.25), transparent 30%), #060817",
    color: "white",
    padding: "30px",
    position: "relative",
    overflow: "hidden",
    fontFamily: "Inter, Arial, sans-serif",
  },

  glow: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "#6f55ff",
    filter: "blur(130px)",
    opacity: 0.18,
  },

  card: {
    width: "100%",
    maxWidth: "430px",
    padding: "42px",
    borderRadius: "28px",
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.12)",
    backdropFilter: "blur(25px)",
    boxShadow: "0 30px 80px rgba(0,0,0,.4)",
    position: "relative",
    zIndex: 1,
  },

  logo: {
    width: "52px",
    height: "52px",
    display: "grid",
    placeItems: "center",
    borderRadius: "15px",
    background:
      "linear-gradient(135deg,#7557ff,#00d9ff)",
    fontSize: "25px",
    marginBottom: "20px",
  },

  subtitle: {
    color: "#969fbe",
    lineHeight: 1.6,
    marginBottom: "28px",
  },

  field: {
    marginBottom: "18px",
  },

  button: {
    width: "100%",
    padding: "15px",
    border: "none",
    borderRadius: "13px",
    background:
      "linear-gradient(135deg,#7557ff,#00cfe8)",
    color: "white",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
    marginTop: "8px",
  },

  switchText: {
    marginTop: "24px",
    textAlign: "center",
    color: "#8f98b5",
    fontSize: "14px",
  },

  switchButton: {
    background: "none",
    border: "none",
    color: "#9c87ff",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
  },

  error: {
    background: "rgba(255, 70, 70, 0.12)",
    border: "1px solid rgba(255, 70, 70, 0.3)",
    color: "#ff8f8f",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "18px",
    fontSize: "13px",
  },

  success: {
    background: "rgba(50, 220, 140, 0.12)",
    border: "1px solid rgba(50, 220, 140, 0.3)",
    color: "#72e6ad",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "18px",
    fontSize: "13px",
  },
};

export default Auth;