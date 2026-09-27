import { useEffect, useState } from "react";
import Auth from "./Auth";
import Dashboard from "./Dashboard";

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

  // Check saved login when app starts
  useEffect(() => {
    const savedUser = localStorage.getItem("aiFitLoggedInUser");

    if (savedUser) {
      try {
        const loggedInUser = JSON.parse(savedUser);
        setUser(loggedInUser);
      } catch (error) {
        console.error("Failed to load saved user:", error);
        localStorage.removeItem("aiFitLoggedInUser");
      }
    }
  }, []);

  // User is logged in
  if (user) {
    return <Dashboard user={user} />;
  }

  // Show Login / Signup
  if (showAuth) {
    return (
      <Auth
        onLogin={(loggedInUser) => {
          setUser(loggedInUser);
        }}
      />
    );
  }

  return (
    <div style={styles.page}>
      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>⚡</span>
          AI Fit Track
        </div>

        <div style={styles.navLinks}>
          <a href="#features">Features</a>
          <a href="#ai">AI Coach</a>
          <a href="#progress">Progress</a>

          <button
            style={styles.loginButton}
            onClick={() => setShowAuth(true)}
          >
            Login
          </button>
        </div>
      </nav>

      {/* HERO */}
      <main>
        <section style={styles.hero}>
          <div style={styles.heroContent}>
            <div style={styles.badge}>
              ✨ AI POWERED FITNESS PLATFORM
            </div>

            <h1 style={styles.title}>
              Your Fitness.
              <br />
              <span style={styles.gradient}>
                Powered by AI.
              </span>
            </h1>

            <p style={styles.description}>
              Track workouts, monitor your progress, get
              personalized AI recommendations and build a
              healthier lifestyle with AI Fit Track.
            </p>

            <div style={styles.buttons}>
              <button
                style={styles.primaryButton}
                onClick={() => setShowAuth(true)}
              >
                Start Your Journey →
              </button>

              <button
                style={styles.secondaryButton}
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Explore Features
              </button>
            </div>

            <div style={styles.trust}>
              <div>
                <strong>10K+</strong>
                <span>Users</span>
              </div>

              <div>
                <strong>50K+</strong>
                <span>Workouts</span>
              </div>

              <div>
                <strong>24/7</strong>
                <span>AI Coach</span>
              </div>
            </div>
          </div>

          {/* VISUAL */}
          <div style={styles.visualArea}>
            <div style={styles.glow}></div>

            <div style={styles.dashboardCard}>
              <div style={styles.cardHeader}>
                <span>AI FITNESS ANALYSIS</span>
                <span style={styles.live}>● LIVE</span>
              </div>

              <div style={styles.bodyVisual}>
                <div style={styles.energyRing}>
                  <div style={styles.person}>🧍</div>
                </div>
              </div>

              <div style={styles.statsGrid}>
                <div style={styles.statBox}>
                  <span>🔥 Calories</span>
                  <strong>642</strong>
                </div>

                <div style={styles.statBox}>
                  <span>👟 Steps</span>
                  <strong>8,426</strong>
                </div>

                <div style={styles.statBox}>
                  <span>💧 Water</span>
                  <strong>1.8L</strong>
                </div>

                <div style={styles.statBox}>
                  <span>⚡ Streak</span>
                  <strong>12 Days</strong>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section id="features" style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionLabel}>
              POWERFUL FEATURES
            </span>

            <h2 style={styles.sectionTitle}>
              Everything you need
              <br />
              <span style={styles.gradient}>
                level up.
              </span>
            </h2>
          </div>

          <div style={styles.featureGrid}>
            <Feature
              icon="🤖"
              title="AI Fitness Coach"
              text="Personalized fitness guidance based on your goals."
            />

            <Feature
              icon="🏋️"
              title="Smart Workouts"
              text="Track exercises, sets, reps and workout performance."
            />

            <Feature
              icon="📊"
              title="Progress Analytics"
              text="Understand your fitness journey with progress data."
            />

            <Feature
              icon="🧠"
              title="AI Insights"
              text="Receive intelligent recommendations from your data."
            />

            <Feature
              icon="🏆"
              title="Achievements"
              text="Earn XP, unlock badges and maintain streaks."
            />

            <Feature
              icon="💧"
              title="Health Tracking"
              text="Monitor water, calories, steps and wellness."
            />
          </div>
        </section>

        {/* AI */}
        <section id="ai" style={styles.aiSection}>
          <div style={styles.aiCard}>
            <div style={styles.aiIcon}>🤖</div>

            <div>
              <span style={styles.sectionLabel}>
                YOUR PERSONAL AI
              </span>

              <h2 style={styles.aiTitle}>
                Meet your
                <br />
                AI Fitness Coach
              </h2>

              <p style={styles.aiText}>
                Your AI coach analyzes your fitness data and
                helps you understand what to improve next.
              </p>

              <button
                style={styles.primaryButton}
                onClick={() => setShowAuth(true)}
              >
                Get Started →
              </button>
            </div>
          </div>
        </section>

        {/* PROGRESS */}
        <section id="progress" style={styles.section}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionLabel}>
              YOUR JOURNEY
            </span>

            <h2 style={styles.sectionTitle}>
              Progress that
              <br />
              <span style={styles.gradient}>
                motivates you.
              </span>
            </h2>
          </div>

          <div style={styles.progressCard}>
            <h2>Weekly Activity</h2>

            <div style={styles.chart}>
              <div style={{ ...styles.bar, height: "45%" }} />
              <div style={{ ...styles.bar, height: "65%" }} />
              <div style={{ ...styles.bar, height: "55%" }} />
              <div style={{ ...styles.bar, height: "85%" }} />
              <div style={{ ...styles.bar, height: "70%" }} />
              <div style={{ ...styles.bar, height: "95%" }} />
              <div style={{ ...styles.bar, height: "78%" }} />
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>⚡</span>
          AI Fit Track
        </div>

        <span>© 2026 AI Fit Track</span>
      </footer>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div style={styles.featureCard}>
      <div style={styles.featureIcon}>{icon}</div>

      <h3>{title}</h3>

      <p>{text}</p>

      <span style={styles.arrow}>→</span>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at 80% 10%, rgba(102,70,255,.18), transparent 30%), #050712",
    color: "#fff",
    fontFamily: "Inter, Arial, sans-serif",
    overflowX: "hidden",
  },

  navbar: {
    height: "80px",
    padding: "0 7%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid rgba(255,255,255,.06)",
    background: "rgba(5,7,18,.85)",
    position: "sticky",
    top: 0,
    zIndex: 20,
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: "800",
    fontSize: "20px",
  },

  logoIcon: {
    width: "38px",
    height: "38px",
    display: "grid",
    placeItems: "center",
    borderRadius: "11px",
    background: "linear-gradient(135deg,#7557ff,#00d9ff)",
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "25px",
  },

  loginButton: {
    padding: "10px 20px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,.15)",
    background: "rgba(255,255,255,.06)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "700",
  },

  hero: {
    minHeight: "700px",
    padding: "80px 7%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    gap: "60px",
  },

  heroContent: {
    maxWidth: "650px",
  },

  badge: {
    display: "inline-block",
    padding: "9px 15px",
    borderRadius: "30px",
    background: "rgba(117,87,255,.12)",
    color: "#a999ff",
    fontSize: "12px",
    fontWeight: "800",
    marginBottom: "25px",
  },

  title: {
    fontSize: "clamp(48px,6vw,80px)",
    lineHeight: 1.05,
    letterSpacing: "-4px",
    margin: "0 0 25px",
  },

  gradient: {
    background: "linear-gradient(90deg,#8c6cff,#00d9ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  description: {
    color: "#9ba3bd",
    fontSize: "18px",
    lineHeight: 1.8,
  },

  buttons: {
    display: "flex",
    gap: "14px",
    marginTop: "30px",
  },

  primaryButton: {
    padding: "15px 25px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#7557ff,#00cfe8)",
    color: "#fff",
    fontWeight: "800",
    cursor: "pointer",
  },

  secondaryButton: {
    padding: "15px 25px",
    border: "1px solid rgba(255,255,255,.14)",
    borderRadius: "12px",
    background: "rgba(255,255,255,.05)",
    color: "#fff",
    cursor: "pointer",
  },

  trust: {
    display: "flex",
    gap: "40px",
    marginTop: "45px",
  },

  visualArea: {
    minHeight: "500px",
    display: "grid",
    placeItems: "center",
    position: "relative",
  },

  glow: {
    position: "absolute",
    width: "350px",
    height: "350px",
    borderRadius: "50%",
    background: "#6950ff",
    filter: "blur(120px)",
    opacity: ".2",
  },

  dashboardCard: {
    width: "390px",
    padding: "25px",
    borderRadius: "28px",
    background: "rgba(255,255,255,.06)",
    border: "1px solid rgba(255,255,255,.12)",
    position: "relative",
    zIndex: 2,
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    color: "#8790ae",
    fontSize: "11px",
    fontWeight: "800",
  },

  live: {
    color: "#48e5a5",
  },

  bodyVisual: {
    height: "280px",
    display: "grid",
    placeItems: "center",
  },

  energyRing: {
    width: "210px",
    height: "210px",
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    border: "1px solid rgba(120,100,255,.5)",
    boxShadow: "0 0 70px rgba(100,80,255,.25)",
  },

  person: {
    fontSize: "100px",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
  },

  statBox: {
    padding: "14px",
    borderRadius: "14px",
    background: "rgba(255,255,255,.05)",
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  section: {
    padding: "100px 7%",
  },

  sectionHeader: {
    textAlign: "center",
    marginBottom: "50px",
  },

  sectionLabel: {
    color: "#8875ff",
    fontSize: "12px",
    fontWeight: "900",
    letterSpacing: "2px",
  },

  sectionTitle: {
    fontSize: "48px",
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "18px",
  },

  featureCard: {
    position: "relative",
    padding: "30px",
    minHeight: "170px",
    borderRadius: "22px",
    background: "rgba(255,255,255,.045)",
    border: "1px solid rgba(255,255,255,.08)",
  },

  featureIcon: {
    fontSize: "32px",
  },

  arrow: {
    position: "absolute",
    right: "25px",
    bottom: "20px",
    color: "#8b75ff",
    fontSize: "22px",
  },

  aiSection: {
    padding: "80px 7%",
  },

  aiCard: {
    maxWidth: "1050px",
    margin: "auto",
    padding: "60px",
    borderRadius: "30px",
    display: "flex",
    alignItems: "center",
    gap: "40px",
    background:
      "linear-gradient(135deg,rgba(117,87,255,.16),rgba(0,217,255,.06))",
    border: "1px solid rgba(255,255,255,.1)",
  },

  aiIcon: {
    minWidth: "100px",
    height: "100px",
    display: "grid",
    placeItems: "center",
    borderRadius: "28px",
    background: "linear-gradient(135deg,#7557ff,#00d9ff)",
    fontSize: "45px",
  },

  aiTitle: {
    fontSize: "42px",
  },

  aiText: {
    color: "#9ba3bd",
    lineHeight: 1.7,
  },

  progressCard: {
    maxWidth: "950px",
    margin: "auto",
    padding: "40px",
    borderRadius: "25px",
    background: "rgba(255,255,255,.05)",
    border: "1px solid rgba(255,255,255,.09)",
  },

  chart: {
    height: "180px",
    display: "flex",
    alignItems: "end",
    gap: "12px",
  },

  bar: {
    flex: 1,
    borderRadius: "8px 8px 2px 2px",
    background: "linear-gradient(180deg,#8c6cff,#00cfe8)",
  },

  footer: {
    padding: "40px 7%",
    borderTop: "1px solid rgba(255,255,255,.07)",
    display: "flex",
    justifyContent: "space-between",
  },
};

export default App;