import { useEffect, useState } from "react";
import Auth from "./Auth";
import Dashboard from "./Dashboard";

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  const [score, setScore] = useState(72);
  const [steps, setSteps] = useState(6842);
  const [water, setWater] = useState(1.8);
  const [workouts, setWorkouts] = useState(2);
  const [activeFeature, setActiveFeature] = useState(null);

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

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = event.clientX / window.innerWidth - 0.5;
      const y = event.clientY / window.innerHeight - 0.5;

      setMouse({
        x,
        y,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setScore((prev) => {
        if (prev >= 92) return 72;
        return prev + 1;
      });
    }, 180);

    return () => clearInterval(timer);
  }, []);

  if (user) {
    return <Dashboard user={user} />;
  }

  if (showAuth) {
    return (
      <Auth
        onLogin={(loggedInUser) => {
          setUser(loggedInUser);
        }}
      />
    );
  }

  const features = [
    {
      icon: "🧠",
      title: "AI Fitness Coach",
      description:
        "Get intelligent fitness guidance based on your goals and activity.",
    },
    {
      icon: "🧍",
      title: "3D Body System",
      description:
        "Explore an interactive 3D body and understand different muscle zones.",
    },
    {
      icon: "📊",
      title: "Progress Analytics",
      description:
        "Track workouts, steps, hydration and fitness progress over time.",
    },
    {
      icon: "🏆",
      title: "XP & Achievements",
      description:
        "Complete activities, earn XP, unlock achievements and maintain streaks.",
    },
  ];

  const handleGetStarted = () => {
    setShowAuth(true);
  };

  return (
    <div style={styles.page}>
      <style>
        {`
          * {
            box-sizing: border-box;
          }

          html {
            scroll-behavior: smooth;
          }

          body {
            margin: 0;
            background: #050708;
            color: white;
            font-family: Inter, Arial, Helvetica, sans-serif;
            overflow-x: hidden;
          }

          button {
            font-family: inherit;
          }

          ::selection {
            background: rgba(0, 255, 170, 0.35);
            color: white;
          }

          .command-card {
            transition:
              transform 0.35s ease,
              border-color 0.35s ease,
              box-shadow 0.35s ease;
          }

          .command-card:hover {
            transform: translateY(-8px);
            border-color: rgba(0, 255, 170, 0.42) !important;
            box-shadow:
              0 25px 70px rgba(0, 0, 0, 0.45),
              0 0 35px rgba(0, 255, 170, 0.08);
          }

          .feature-card {
            transition:
              transform 0.35s ease,
              border-color 0.35s ease,
              background 0.35s ease;
          }

          .feature-card:hover {
            transform: translateY(-10px);
            border-color: rgba(0, 255, 170, 0.38) !important;
            background: rgba(16, 28, 27, 0.92) !important;
          }

          .primary-button {
            transition:
              transform 0.25s ease,
              box-shadow 0.25s ease,
              background 0.25s ease;
          }

          .primary-button:hover {
            transform: translateY(-3px) scale(1.02);
            box-shadow:
              0 15px 40px rgba(0, 255, 170, 0.22),
              0 0 30px rgba(0, 255, 170, 0.12);
          }

          .nav-button {
            transition:
              color 0.2s ease,
              background 0.2s ease;
          }

          .nav-button:hover {
            color: #00ffaa !important;
            background: rgba(0, 255, 170, 0.06) !important;
          }

          .pulse-dot {
            animation: pulseDot 1.8s infinite;
          }

          @keyframes pulseDot {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(0, 255, 170, 0.45);
            }

            50% {
              box-shadow: 0 0 0 8px rgba(0, 255, 170, 0);
            }
          }

          .body-float {
            animation: bodyFloat 4s ease-in-out infinite;
          }

          @keyframes bodyFloat {
            0%, 100% {
              transform: translateY(0);
            }

            50% {
              transform: translateY(-12px);
            }
          }

          .energy-ring {
            animation: ringSpin 14s linear infinite;
          }

          @keyframes ringSpin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }

          .scan-line {
            animation: scanMove 2.6s ease-in-out infinite;
          }

          @keyframes scanMove {
            0%, 100% {
              top: 18%;
              opacity: 0.2;
            }

            50% {
              top: 72%;
              opacity: 1;
            }
          }

          .data-pulse {
            animation: dataPulse 2s ease-in-out infinite;
          }

          @keyframes dataPulse {
            0%, 100% {
              opacity: 0.45;
            }

            50% {
              opacity: 1;
            }
          }

          .grid-move {
            animation: gridMove 16s linear infinite;
          }

          @keyframes gridMove {
            from {
              transform: translateY(0);
            }

            to {
              transform: translateY(70px);
            }
          }

          @media (max-width: 900px) {
            .hero-grid {
              grid-template-columns: 1fr !important;
            }

            .hero-copy {
              text-align: center;
            }

            .hero-actions {
              justify-content: center !important;
            }

            .hero-mini-stats {
              justify-content: center !important;
            }

            .body-stage {
              min-height: 560px !important;
            }

            .feature-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }

            .command-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }

          @media (max-width: 600px) {
            .nav-links {
              display: none !important;
            }

            .nav {
              padding: 16px 18px !important;
            }

            .hero {
              padding: 70px 18px 50px !important;
            }

            .hero-title {
              font-size: 48px !important;
              line-height: 0.98 !important;
            }

            .hero-subtitle {
              font-size: 16px !important;
            }

            .body-stage {
              min-height: 470px !important;
            }

            .body-head {
              width: 58px !important;
              height: 58px !important;
            }

            .body-torso {
              width: 110px !important;
              height: 175px !important;
            }

            .feature-grid,
            .command-grid {
              grid-template-columns: 1fr !important;
            }

            .section {
              padding: 70px 18px !important;
            }

            .footer {
              padding: 30px 18px !important;
            }
          }
        `}
      </style>

      {/* Background */}
      <div style={styles.backgroundGlowOne} />
      <div style={styles.backgroundGlowTwo} />

      <div
        className="grid-move"
        style={{
          ...styles.backgroundGrid,
          transform: `translate(${mouse.x * -12}px, ${mouse.y * -12}px)`,
        }}
      />

      {/* NAVBAR */}
      <nav className="nav" style={styles.nav}>
        <div style={styles.logoArea}>
          <div style={styles.logoMark}>
            <span style={styles.logoPulse} />
          </div>

          <div>
            <div style={styles.logoText}>AI FIT TRACK</div>
            <div style={styles.logoSub}>INTELLIGENT FITNESS OS</div>
          </div>
        </div>

        <div className="nav-links" style={styles.navLinks}>
          <button
            className="nav-button"
            style={styles.navButton}
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Features
          </button>

          <button
            className="nav-button"
            style={styles.navButton}
            onClick={() =>
              document
                .getElementById("system")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            System
          </button>

          <button
            className="nav-button"
            style={styles.navButton}
            onClick={() =>
              document
                .getElementById("ai")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            AI Coach
          </button>
        </div>

        <button
          className="primary-button"
          style={styles.navCta}
          onClick={handleGetStarted}
        >
          Login / Sign Up →
        </button>
      </nav>

      {/* HERO */}
      <main className="hero" style={styles.hero}>
        <div className="hero-grid" style={styles.heroGrid}>
          {/* LEFT */}
          <section className="hero-copy" style={styles.heroCopy}>
            <div style={styles.statusPill}>
              <span className="pulse-dot" style={styles.statusDot} />
              AI FITNESS SYSTEM ONLINE
            </div>

            <h1 className="hero-title" style={styles.heroTitle}>
              YOUR FITNESS.
              <br />
              <span style={styles.greenText}>ONE COMMAND CENTER.</span>
            </h1>

            <p className="hero-subtitle" style={styles.heroSubtitle}>
              AI-powered fitness tracking, intelligent coaching, 3D body
              visualization and progress analytics — built into one modern
              fitness platform.
            </p>

            <div className="hero-actions" style={styles.heroActions}>
              <button
                className="primary-button"
                style={styles.heroButton}
                onClick={handleGetStarted}
              >
                GET STARTED
                <span style={styles.buttonArrow}>→</span>
              </button>

              <button
                style={styles.secondaryButton}
                onClick={() =>
                  document
                    .getElementById("system")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                EXPLORE SYSTEM
              </button>
            </div>

            <div className="hero-mini-stats" style={styles.heroMiniStats}>
              <div>
                <strong style={styles.miniNumber}>AI</strong>
                <span style={styles.miniLabel}>COACH</span>
              </div>

              <div style={styles.miniDivider} />

              <div>
                <strong style={styles.miniNumber}>3D</strong>
                <span style={styles.miniLabel}>BODY</span>
              </div>

              <div style={styles.miniDivider} />

              <div>
                <strong style={styles.miniNumber}>24/7</strong>
                <span style={styles.miniLabel}>TRACKING</span>
              </div>
            </div>
          </section>

          {/* RIGHT 3D BODY COMMAND CENTER */}
          <section
            className="body-stage"
            style={{
              ...styles.bodyStage,
              transform: `perspective(1200px) rotateY(${mouse.x * 5}deg) rotateX(${mouse.y * -4}deg)`,
            }}
          >
            <div style={styles.stageHeader}>
              <span>
                <span className="pulse-dot" style={styles.statusDotSmall} />
                BODY ANALYSIS
              </span>

              <span style={styles.liveText}>LIVE</span>
            </div>

            <div className="body-float" style={styles.bodyScene}>
              {/* Energy rings */}
              <div
                className="energy-ring"
                style={{
                  ...styles.energyRing,
                  transform: `rotate(${mouse.x * 18}deg)`,
                }}
              />

              <div style={styles.energyRingInner} />

              {/* Scan line */}
              <div className="scan-line" style={styles.scanLine} />

              {/* Body */}
              <div style={styles.humanBody}>
                {/* Head */}
                <div className="body-head" style={styles.bodyHead}>
                  <div style={styles.faceGlow} />
                </div>

                {/* Neck */}
                <div style={styles.neck} />

                {/* Torso */}
                <div className="body-torso" style={styles.bodyTorso}>
                  <div style={styles.chestLine} />
                  <div style={styles.abLineOne} />
                  <div style={styles.abLineTwo} />
                </div>

                {/* Left arm */}
                <div style={styles.leftArm}>
                  <div style={styles.armGlow} />
                </div>

                {/* Right arm */}
                <div style={styles.rightArm}>
                  <div style={styles.armGlow} />
                </div>

                {/* Left leg */}
                <div style={styles.leftLeg}>
                  <div style={styles.legGlow} />
                </div>

                {/* Right leg */}
                <div style={styles.rightLeg}>
                  <div style={styles.legGlow} />
                </div>

                {/* Feet */}
                <div style={styles.leftFoot} />
                <div style={styles.rightFoot} />
              </div>

              {/* Data points */}
              <div
                className="data-pulse"
                style={{
                  ...styles.dataPoint,
                  top: "22%",
                  left: "10%",
                }}
              >
                <span>01</span>
                <strong>CORE</strong>
              </div>

              <div
                className="data-pulse"
                style={{
                  ...styles.dataPoint,
                  top: "39%",
                  right: "5%",
                  animationDelay: "0.4s",
                }}
              >
                <span>02</span>
                <strong>CHEST</strong>
              </div>

              <div
                className="data-pulse"
                style={{
                  top: "57%",
                  left: "5%",
                  ...styles.dataPoint,
                  animationDelay: "0.8s",
                }}
              >
                <span>03</span>
                <strong>LEGS</strong>
              </div>

              <div
                className="data-pulse"
                style={{
                  top: "70%",
                  right: "4%",
                  ...styles.dataPoint,
                  animationDelay: "1.2s",
                }}
              >
                <span>04</span>
                <strong>FORM</strong>
              </div>
            </div>

            {/* Fitness score */}
            <div style={styles.scoreCard}>
              <div style={styles.scoreCircle}>
                <svg
                  width="92"
                  height="92"
                  viewBox="0 0 100 100"
                  style={{ transform: "rotate(-90deg)" }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="7"
                  />

                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="#00ffaa"
                    strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray="264"
                    strokeDashoffset={264 - (264 * score) / 100}
                  />
                </svg>

                <div style={styles.scoreNumber}>{score}</div>
              </div>

              <div>
                <div style={styles.scoreTitle}>AI FITNESS SCORE</div>

                <div style={styles.scoreStatus}>
                  <span style={styles.scoreStatusDot} />
                  SYSTEM OPTIMIZING
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* COMMAND STATS */}
        <section className="command-grid" style={styles.commandGrid}>
          <div className="command-card" style={styles.commandCard}>
            <div style={styles.commandIcon}>🔥</div>

            <div>
              <div style={styles.commandLabel}>TODAY'S STEPS</div>

              <div style={styles.commandValue}>
                {steps.toLocaleString()}
              </div>

              <div style={styles.commandProgress}>
                <div
                  style={{
                    ...styles.commandProgressFill,
                    width: `${Math.min((steps / 10000) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            <span style={styles.commandTarget}>10K</span>
          </div>

          <div className="command-card" style={styles.commandCard}>
            <div style={styles.commandIcon}>💧</div>

            <div>
              <div style={styles.commandLabel}>HYDRATION</div>

              <div style={styles.commandValue}>
                {water}
                <span style={styles.unit}> L</span>
              </div>

              <div style={styles.commandProgress}>
                <div
                  style={{
                    ...styles.commandProgressFill,
                    width: `${Math.min((water / 2.5) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            <span style={styles.commandTarget}>2.5L</span>
          </div>

          <div className="command-card" style={styles.commandCard}>
            <div style={styles.commandIcon}>🏋️</div>

            <div>
              <div style={styles.commandLabel}>WORKOUTS</div>

              <div style={styles.commandValue}>
                {workouts}
                <span style={styles.unit}> sessions</span>
              </div>

              <div style={styles.commandProgress}>
                <div
                  style={{
                    ...styles.commandProgressFill,
                    width: `${Math.min((workouts / 4) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>

            <span style={styles.commandTarget}>4</span>
          </div>

          <div className="command-card" style={styles.commandCard}>
            <div style={styles.commandIcon}>⚡</div>

            <div>
              <div style={styles.commandLabel}>DAILY GOAL</div>

              <div style={styles.commandValue}>82%</div>

              <div style={styles.commandProgress}>
                <div
                  style={{
                    ...styles.commandProgressFill,
                    width: "82%",
                  }}
                />
              </div>
            </div>

            <span style={styles.commandTarget}>READY</span>
          </div>
        </section>
      </main>

      {/* SYSTEM SECTION */}
      <section id="system" className="section" style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionEyebrow}>01 / FITNESS SYSTEM</div>

          <h2 style={styles.sectionTitle}>
            Everything you need.
            <br />
            <span style={styles.greenText}>One intelligent platform.</span>
          </h2>

          <p style={styles.sectionDescription}>
            AI Fit Track combines fitness tracking, artificial intelligence,
            interactive 3D visualization and gamification into one connected
            experience.
          </p>
        </div>

        <div style={styles.systemPanel}>
          <div style={styles.systemVisual}>
            <div style={styles.systemOrb}>
              <div style={styles.systemOrbInner}>AI</div>
            </div>

            <div style={styles.orbitOne} />
            <div style={styles.orbitTwo} />
            <div style={styles.orbitThree} />
          </div>

          <div style={styles.systemInfo}>
            <div style={styles.systemItem}>
              <span>01</span>

              <div>
                <strong>TRACK</strong>
                <p>
                  Monitor your daily movement, water, workouts and progress.
                </p>
              </div>
            </div>

            <div style={styles.systemItem}>
              <span>02</span>

              <div>
                <strong>ANALYZE</strong>
                <p>
                  Turn your fitness data into personalized AI insights.
                </p>
              </div>
            </div>

            <div style={styles.systemItem}>
              <span>03</span>

              <div>
                <strong>IMPROVE</strong>
                <p>
                  Follow personalized workouts and continuously improve your
                  fitness routine.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="section" style={styles.section}>
        <div style={styles.sectionHeader}>
          <div style={styles.sectionEyebrow}>02 / CORE FEATURES</div>

          <h2 style={styles.sectionTitle}>
            Built like a
            <br />
            <span style={styles.greenText}>real fitness product.</span>
          </h2>
        </div>

        <div className="feature-grid" style={styles.featureGrid}>
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="feature-card"
              style={{
                ...styles.featureCard,
                ...(activeFeature === index ? styles.featureActive : {}),
              }}
              onMouseEnter={() => setActiveFeature(index)}
              onMouseLeave={() => setActiveFeature(null)}
            >
              <div style={styles.featureTop}>
                <span style={styles.featureNumber}>
                  0{index + 1}
                </span>

                <span style={styles.featureIcon}>{feature.icon}</span>
              </div>

              <h3 style={styles.featureTitle}>{feature.title}</h3>

              <p style={styles.featureDescription}>
                {feature.description}
              </p>

              <div style={styles.featureLine}>
                <span />
              </div>

              <div style={styles.featureArrow}>↗</div>
            </div>
          ))}
        </div>
      </section>

      {/* AI SECTION */}
      <section id="ai" className="section" style={styles.aiSection}>
        <div style={styles.aiGlow} />

        <div style={styles.aiGrid}>
          <div>
            <div style={styles.sectionEyebrow}>03 / ARTIFICIAL INTELLIGENCE</div>

            <h2 style={styles.aiTitle}>
              Your data.
              <br />
              <span style={styles.greenText}>Your AI coach.</span>
            </h2>

            <p style={styles.aiDescription}>
              AI Fit Track transforms your fitness information into useful
              recommendations, insights and personalized workout guidance.
            </p>

            <div style={styles.aiFeatures}>
              <div style={styles.aiFeature}>
                <span>✓</span>
                Personalized fitness analysis
              </div>

              <div style={styles.aiFeature}>
                <span>✓</span>
                Goal-based recommendations
              </div>

              <div style={styles.aiFeature}>
                <span>✓</span>
                AI workout planning
              </div>

              <div style={styles.aiFeature}>
                <span>✓</span>
                Interactive AI Coach
              </div>
            </div>
          </div>

          <div style={styles.aiTerminal}>
            <div style={styles.terminalHeader}>
              <div style={styles.terminalDots}>
                <span />
                <span />
                <span />
              </div>

              <span>AI_FIT_ENGINE</span>

              <span style={styles.terminalLive}>ONLINE</span>
            </div>

            <div style={styles.terminalBody}>
              <div style={styles.terminalLine}>
                <span style={styles.terminalGreen}>$</span>{" "}
                analyzing_fitness_data()
              </div>

              <div style={styles.terminalLine}>
                <span style={styles.terminalGreen}>$</span>{" "}
                calculating_fitness_score...
              </div>

              <div style={styles.terminalResult}>
                FITNESS SCORE
                <strong>{score}/100</strong>
              </div>

              <div style={styles.terminalLine}>
                <span style={styles.terminalGreen}>$</span>{" "}
                generating_recommendation...
              </div>

              <div style={styles.aiRecommendation}>
                <span>AI</span>
                Increase daily movement gradually and maintain consistent
                hydration and workout recovery.
              </div>

              <div style={styles.terminalCursor}>_</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={styles.ctaSection}>
        <div style={styles.ctaBox}>
          <div style={styles.ctaGlow} />

          <div style={styles.sectionEyebrow}>04 / START YOUR JOURNEY</div>

          <h2 style={styles.ctaTitle}>
            READY TO
            <br />
            <span style={styles.greenText}>LEVEL UP?</span>
          </h2>

          <p style={styles.ctaDescription}>
            Build better habits. Track your progress. Let AI help you move
            forward.
          </p>

          <button
            className="primary-button"
            style={styles.ctaButton}
            onClick={handleGetStarted}
          >
            ENTER AI FIT TRACK
            <span>→</span>
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" style={styles.footer}>
        <div style={styles.footerLogo}>AI FIT TRACK</div>

        <div style={styles.footerText}>
          AI-Powered 3D Fitness & Wellness Platform
        </div>

        <div style={styles.footerBottom}>
          <span>© 2026 AI Fit Track</span>
          <span>BUILT FOR THE FUTURE OF FITNESS</span>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#050708",
    color: "#ffffff",
    position: "relative",
    overflow: "hidden",
  },

  backgroundGlowOne: {
    position: "fixed",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background: "rgba(0, 255, 170, 0.07)",
    filter: "blur(100px)",
    top: "-250px",
    right: "-180px",
    pointerEvents: "none",
    zIndex: 0,
  },

  backgroundGlowTwo: {
    position: "fixed",
    width: "500px",
    height: "500px",
    borderRadius: "50%",
    background: "rgba(0, 180, 255, 0.05)",
    filter: "blur(120px)",
    bottom: "-250px",
    left: "-200px",
    pointerEvents: "none",
    zIndex: 0,
  },

  backgroundGrid: {
    position: "fixed",
    inset: 0,
    backgroundImage:
      "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
    backgroundSize: "70px 70px",
    maskImage:
      "linear-gradient(to bottom, black 0%, transparent 80%)",
    pointerEvents: "none",
    zIndex: 0,
  },

  nav: {
    position: "relative",
    zIndex: 10,
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "22px 34px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    backdropFilter: "blur(18px)",
  },

  logoArea: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },

  logoMark: {
    width: "36px",
    height: "36px",
    borderRadius: "10px",
    background:
      "linear-gradient(135deg, #00ffaa, #00bfff)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 0 25px rgba(0,255,170,0.25)",
  },

  logoPulse: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
    background: "#04110d",
  },

  logoText: {
    fontSize: "14px",
    fontWeight: 900,
    letterSpacing: "2px",
  },

  logoSub: {
    marginTop: "3px",
    fontSize: "8px",
    letterSpacing: "1.5px",
    color: "#66736f",
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },

  navButton: {
    background: "transparent",
    border: "none",
    color: "#8d9995",
    padding: "10px 15px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.5px",
  },

  navCta: {
    border: "1px solid rgba(0,255,170,0.35)",
    background: "rgba(0,255,170,0.08)",
    color: "#00ffaa",
    padding: "11px 17px",
    borderRadius: "10px",
    fontSize: "11px",
    fontWeight: 800,
    letterSpacing: "0.6px",
    cursor: "pointer",
  },

  hero: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "90px 34px 60px",
  },

  heroGrid: {
    display: "grid",
    gridTemplateColumns: "0.95fr 1.05fr",
    gap: "50px",
    alignItems: "center",
  },

  heroCopy: {
    position: "relative",
    zIndex: 2,
  },

  statusPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "9px",
    border: "1px solid rgba(0,255,170,0.18)",
    background: "rgba(0,255,170,0.045)",
    color: "#83b9aa",
    borderRadius: "100px",
    padding: "9px 13px",
    fontSize: "10px",
    fontWeight: 800,
    letterSpacing: "1.4px",
    marginBottom: "28px",
  },

  statusDot: {
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#00ffaa",
    display: "inline-block",
  },

  heroTitle: {
    fontSize: "76px",
    lineHeight: "0.98",
    letterSpacing: "-4px",
    margin: 0,
    fontWeight: 950,
  },

  greenText: {
    color: "#00ffaa",
  },

  heroSubtitle: {
    maxWidth: "650px",
    color: "#889490",
    fontSize: "17px",
    lineHeight: 1.7,
    marginTop: "28px",
  },

  heroActions: {
    display: "flex",
    alignItems: "center",
    gap: "13px",
    marginTop: "34px",
  },

  heroButton: {
    border: "none",
    background: "#00ffaa",
    color: "#03100c",
    padding: "16px 22px",
    borderRadius: "12px",
    fontSize: "12px",
    fontWeight: 900,
    letterSpacing: "0.7px",
    cursor: "pointer",
  },

  buttonArrow: {
    marginLeft: "14px",
    fontSize: "17px",
  },

  secondaryButton: {
    border: "1px solid rgba(255,255,255,0.11)",
    background: "rgba(255,255,255,0.035)",
    color: "#dce5e1",
    padding: "15px 20px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: 800,
    letterSpacing: "0.6px",
    cursor: "pointer",
  },

  heroMiniStats: {
    display: "flex",
    alignItems: "center",
    gap: "24px",
    marginTop: "48px",
  },

  miniNumber: {
    display: "block",
    fontSize: "18px",
    color: "#ffffff",
  },

  miniLabel: {
    display: "block",
    marginTop: "4px",
    color: "#586560",
    fontSize: "8px",
    letterSpacing: "1.2px",
    fontWeight: 800,
  },

  miniDivider: {
    width: "1px",
    height: "28px",
    background: "rgba(255,255,255,0.08)",
  },

  bodyStage: {
    position: "relative",
    minHeight: "640px",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "28px",
    background:
      "radial-gradient(circle at 50% 42%, rgba(0,255,170,0.08), transparent 34%), linear-gradient(145deg, rgba(18,27,26,0.92), rgba(7,11,12,0.96))",
    overflow: "hidden",
    transition: "transform 0.15s ease-out",
    boxShadow:
      "inset 0 0 80px rgba(0,255,170,0.025), 0 35px 100px rgba(0,0,0,0.35)",
  },

  stageHeader: {
    position: "absolute",
    top: "22px",
    left: "24px",
    right: "24px",
    display: "flex",
    justifyContent: "space-between",
    color: "#76817e",
    fontSize: "9px",
    fontWeight: 800,
    letterSpacing: "1.5px",
    zIndex: 5,
  },

  statusDotSmall: {
    display: "inline-block",
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#00ffaa",
    marginRight: "7px",
  },

  liveText: {
    color: "#00ffaa",
  },

  bodyScene: {
    position: "absolute",
    inset: "60px 0 120px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  energyRing: {
    position: "absolute",
    width: "360px",
    height: "360px",
    border: "1px solid rgba(0,255,170,0.22)",
    borderRadius: "50%",
    boxShadow:
      "0 0 30px rgba(0,255,170,0.07), inset 0 0 30px rgba(0,255,170,0.05)",
  },

  energyRingInner: {
    position: "absolute",
    width: "260px",
    height: "260px",
    border: "1px dashed rgba(0,255,170,0.16)",
    borderRadius: "50%",
  },

  scanLine: {
    position: "absolute",
    width: "280px",
    height: "2px",
    background:
      "linear-gradient(90deg, transparent, #00ffaa, transparent)",
    boxShadow: "0 0 18px rgba(0,255,170,0.8)",
    zIndex: 4,
  },

  humanBody: {
    position: "relative",
    width: "230px",
    height: "490px",
    filter:
      "drop-shadow(0 0 18px rgba(0,255,170,0.16))",
  },

  bodyHead: {
    position: "absolute",
    top: "8px",
    left: "86px",
    width: "58px",
    height: "68px",
    borderRadius: "48% 48% 45% 45%",
    background:
      "linear-gradient(145deg, #c8fff0, #4b8776 58%, #16362e)",
    border: "1px solid rgba(0,255,170,0.55)",
    boxShadow:
      "inset -8px -10px 20px rgba(0,0,0,0.35), 0 0 20px rgba(0,255,170,0.18)",
    zIndex: 3,
  },

  faceGlow: {
    position: "absolute",
    width: "9px",
    height: "9px",
    borderRadius: "50%",
    background: "#00ffaa",
    top: "29px",
    left: "14px",
    boxShadow: "24px 0 0 #00ffaa, 12px 12px 20px rgba(0,255,170,0.5)",
    opacity: 0.65,
  },

  neck: {
    position: "absolute",
    top: "68px",
    left: "104px",
    width: "24px",
    height: "30px",
    background: "linear-gradient(90deg, #356658, #9bd6c3, #315e50)",
    borderRadius: "8px",
    zIndex: 2,
  },

  bodyTorso: {
    position: "absolute",
    top: "85px",
    left: "55px",
    width: "120px",
    height: "190px",
    background:
      "linear-gradient(90deg, #1e493d, #9ce4cf 45%, #376b5b)",
    clipPath:
      "polygon(18% 0, 82% 0, 100% 18%, 90% 78%, 76% 100%, 24% 100%, 10% 78%, 0 18%)",
    border: "1px solid rgba(0,255,170,0.55)",
    boxShadow:
      "inset 0 0 35px rgba(255,255,255,0.12), 0 0 28px rgba(0,255,170,0.14)",
    zIndex: 2,
  },

  chestLine: {
    position: "absolute",
    left: "50%",
    top: "35px",
    width: "1px",
    height: "72px",
    background: "rgba(0,50,40,0.4)",
  },

  abLineOne: {
    position: "absolute",
    left: "24px",
    right: "24px",
    top: "105px",
    height: "1px",
    background: "rgba(0,60,48,0.4)",
  },

  abLineTwo: {
    position: "absolute",
    left: "30px",
    right: "30px",
    top: "132px",
    height: "1px",
    background: "rgba(0,60,48,0.35)",
  },

  leftArm: {
    position: "absolute",
    top: "92px",
    left: "21px",
    width: "39px",
    height: "174px",
    borderRadius: "22px",
    transform: "rotate(8deg)",
    transformOrigin: "top center",
    background:
      "linear-gradient(90deg, #244e42, #75bbaa, #284e43)",
    boxShadow: "0 0 20px rgba(0,255,170,0.1)",
    zIndex: 1,
  },

  rightArm: {
    position: "absolute",
    top: "92px",
    right: "21px",
    width: "39px",
    height: "174px",
    borderRadius: "22px",
    transform: "rotate(-8deg)",
    transformOrigin: "top center",
    background:
      "linear-gradient(90deg, #284e43, #75bbaa, #244e42)",
    boxShadow: "0 0 20px rgba(0,255,170,0.1)",
    zIndex: 1,
  },

  armGlow: {
    position: "absolute",
    inset: "20px 8px",
    borderRadius: "20px",
    border: "1px solid rgba(0,255,170,0.25)",
  },

  leftLeg: {
    position: "absolute",
    top: "250px",
    left: "64px",
    width: "48px",
    height: "210px",
    borderRadius: "24px",
    background:
      "linear-gradient(90deg, #21483d, #79bfae, #294f43)",
    transform: "rotate(2deg)",
    zIndex: 1,
  },

  rightLeg: {
    position: "absolute",
    top: "250px",
    right: "64px",
    width: "48px",
    height: "210px",
    borderRadius: "24px",
    background:
      "linear-gradient(90deg, #294f43, #79bfae, #21483d)",
    transform: "rotate(-2deg)",
    zIndex: 1,
  },

  legGlow: {
    position: "absolute",
    inset: "20px 9px",
    borderRadius: "20px",
    border: "1px solid rgba(0,255,170,0.2)",
  },

  leftFoot: {
    position: "absolute",
    left: "52px",
    bottom: "0",
    width: "67px",
    height: "23px",
    borderRadius: "15px 25px 10px 10px",
    background: "#18372f",
  },

  rightFoot: {
    position: "absolute",
    right: "52px",
    bottom: "0",
    width: "67px",
    height: "23px",
    borderRadius: "25px 15px 10px 10px",
    background: "#18372f",
  },

  dataPoint: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    gap: "3px",
    fontSize: "8px",
    color: "#52635d",
    letterSpacing: "1px",
  },

  scoreCard: {
    position: "absolute",
    left: "24px",
    right: "24px",
    bottom: "22px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "13px 15px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(4,9,9,0.72)",
    backdropFilter: "blur(18px)",
    zIndex: 6,
  },

  scoreCircle: {
    width: "92px",
    height: "92px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  scoreNumber: {
    position: "absolute",
    fontSize: "24px",
    fontWeight: 900,
    color: "#00ffaa",
  },

  scoreTitle: {
    fontSize: "11px",
    fontWeight: 900,
    letterSpacing: "1px",
  },

  scoreStatus: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    marginTop: "8px",
    color: "#65736f",
    fontSize: "8px",
    letterSpacing: "1px",
  },

  scoreStatusDot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "#00ffaa",
  },

  commandGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "12px",
    marginTop: "18px",
  },

  commandCard: {
    minHeight: "115px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    position: "relative",
    padding: "20px",
    borderRadius: "17px",
    border: "1px solid rgba(255,255,255,0.07)",
    background: "rgba(13,18,18,0.78)",
    backdropFilter: "blur(15px)",
  },

  commandIcon: {
    width: "38px",
    height: "38px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "11px",
    background: "rgba(0,255,170,0.07)",
    fontSize: "18px",
  },

  commandLabel: {
    color: "#62706c",
    fontSize: "8px",
    fontWeight: 900,
    letterSpacing: "1.2px",
  },

  commandValue: {
    marginTop: "5px",
    fontSize: "20px",
    fontWeight: 900,
  },

  unit: {
    color: "#66736f",
    fontSize: "9px",
    fontWeight: 600,
  },

  commandTarget: {
    position: "absolute",
    top: "17px",
    right: "17px",
    color: "#00ffaa",
    fontSize: "8px",
    fontWeight: 900,
  },

  commandProgress: {
    width: "100px",
    height: "3px",
    background: "rgba(255,255,255,0.07)",
    borderRadius: "10px",
    marginTop: "9px",
    overflow: "hidden",
  },

  commandProgressFill: {
    height: "100%",
    borderRadius: "10px",
    background: "#00ffaa",
    boxShadow: "0 0 8px rgba(0,255,170,0.4)",
  },

  section: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "120px 34px",
  },

  sectionHeader: {
    maxWidth: "760px",
  },

  sectionEyebrow: {
    color: "#00ffaa",
    fontSize: "9px",
    fontWeight: 900,
    letterSpacing: "2px",
    marginBottom: "20px",
  },

  sectionTitle: {
    margin: 0,
    fontSize: "55px",
    lineHeight: 1,
    letterSpacing: "-2.5px",
  },

  sectionDescription: {
    marginTop: "25px",
    color: "#788581",
    fontSize: "16px",
    lineHeight: 1.7,
    maxWidth: "650px",
  },

  systemPanel: {
    marginTop: "55px",
    minHeight: "500px",
    borderRadius: "28px",
    border: "1px solid rgba(255,255,255,0.08)",
    background:
      "linear-gradient(135deg, rgba(13,22,20,0.95), rgba(7,11,12,0.95))",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    overflow: "hidden",
  },

  systemVisual: {
    minHeight: "500px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    background:
      "radial-gradient(circle, rgba(0,255,170,0.09), transparent 50%)",
  },

  systemOrb: {
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    border: "1px solid rgba(0,255,170,0.35)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow:
      "0 0 70px rgba(0,255,170,0.12), inset 0 0 40px rgba(0,255,170,0.08)",
    zIndex: 2,
  },

  systemOrbInner: {
    width: "110px",
    height: "110px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(0,255,170,0.07)",
    border: "1px solid rgba(0,255,170,0.22)",
    color: "#00ffaa",
    fontSize: "28px",
    fontWeight: 950,
  },

  orbitOne: {
    position: "absolute",
    width: "300px",
    height: "130px",
    border: "1px solid rgba(0,255,170,0.15)",
    borderRadius: "50%",
    transform: "rotate(25deg)",
  },

  orbitTwo: {
    position: "absolute",
    width: "300px",
    height: "130px",
    border: "1px solid rgba(0,255,170,0.1)",
    borderRadius: "50%",
    transform: "rotate(-25deg)",
  },

  orbitThree: {
    position: "absolute",
    width: "240px",
    height: "240px",
    border: "1px dashed rgba(0,255,170,0.08)",
    borderRadius: "50%",
  },

  systemInfo: {
    padding: "60px",
  },

  systemItem: {
    display: "flex",
    gap: "25px",
    padding: "26px 0",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },

  systemItemSpan: {
    color: "#00ffaa",
  },

  systemItem: {
    display: "flex",
    gap: "25px",
    padding: "26px 0",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "14px",
    marginTop: "55px",
  },

  featureCard: {
    position: "relative",
    minHeight: "340px",
    padding: "25px",
    borderRadius: "20px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(13,18,18,0.72)",
    cursor: "default",
  },

  featureActive: {
    borderColor: "rgba(0,255,170,0.35)",
  },

  featureTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  featureNumber: {
    color: "#47534f",
    fontSize: "9px",
    fontWeight: 900,
    letterSpacing: "1px",
  },

  featureIcon: {
    fontSize: "26px",
  },

  featureTitle: {
    marginTop: "70px",
    fontSize: "20px",
    marginBottom: "13px",
  },

  featureDescription: {
    color: "#707d79",
    lineHeight: 1.65,
    fontSize: "13px",
  },

  featureLine: {
    position: "absolute",
    left: "25px",
    right: "25px",
    bottom: "45px",
    height: "1px",
    background: "rgba(255,255,255,0.06)",
  },

  featureLineSpan: {
    width: "30%",
    height: "1px",
    background: "#00ffaa",
  },

  featureArrow: {
    position: "absolute",
    right: "25px",
    bottom: "17px",
    color: "#00ffaa",
    fontSize: "18px",
  },

  aiSection: {
    position: "relative",
    zIndex: 1,
    padding: "120px 34px",
    maxWidth: "1400px",
    margin: "0 auto",
  },

  aiGlow: {
    position: "absolute",
    width: "450px",
    height: "450px",
    background: "rgba(0,255,170,0.05)",
    filter: "blur(120px)",
    left: "-200px",
    top: "100px",
    pointerEvents: "none",
  },

  aiGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "70px",
    alignItems: "center",
  },

  aiTitle: {
    fontSize: "62px",
    lineHeight: 1,
    letterSpacing: "-3px",
    margin: 0,
  },

  aiDescription: {
    color: "#788581",
    fontSize: "16px",
    lineHeight: 1.7,
    maxWidth: "600px",
    marginTop: "25px",
  },

  aiFeatures: {
    marginTop: "35px",
    display: "grid",
    gap: "14px",
  },

  aiFeature: {
    color: "#a7b1ae",
    fontSize: "13px",
  },

  aiFeatureSpan: {
    color: "#00ffaa",
    marginRight: "10px",
  },

  aiTerminal: {
    borderRadius: "20px",
    overflow: "hidden",
    border: "1px solid rgba(0,255,170,0.14)",
    background: "#060a0a",
    boxShadow: "0 30px 90px rgba(0,0,0,0.35)",
  },

  terminalHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 18px",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    color: "#56625e",
    fontSize: "8px",
    letterSpacing: "1.2px",
  },

  terminalDots: {
    display: "flex",
    gap: "5px",
  },

  terminalLive: {
    color: "#00ffaa",
  },

  terminalBody: {
    padding: "28px",
    fontFamily: "monospace",
    minHeight: "330px",
  },

  terminalLine: {
    color: "#63716c",
    fontSize: "11px",
    lineHeight: 2.1,
  },

  terminalGreen: {
    color: "#00ffaa",
  },

  terminalResult: {
    margin: "25px 0",
    padding: "20px",
    borderRadius: "13px",
    background: "rgba(0,255,170,0.045)",
    border: "1px solid rgba(0,255,170,0.1)",
    color: "#62716b",
    fontSize: "9px",
    letterSpacing: "1px",
  },

  aiRecommendation: {
    marginTop: "20px",
    padding: "17px",
    borderLeft: "2px solid #00ffaa",
    background: "rgba(0,255,170,0.035)",
    color: "#8a9893",
    fontFamily: "Inter, Arial",
    fontSize: "12px",
    lineHeight: 1.7,
  },

  terminalCursor: {
    marginTop: "18px",
    color: "#00ffaa",
    animation: "dataPulse 1s infinite",
  },

  ctaSection: {
    position: "relative",
    zIndex: 1,
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "80px 34px 120px",
  },

  ctaBox: {
    position: "relative",
    textAlign: "center",
    overflow: "hidden",
    borderRadius: "28px",
    border: "1px solid rgba(0,255,170,0.16)",
    background:
      "radial-gradient(circle at 50% 0%, rgba(0,255,170,0.11), transparent 45%), rgba(12,18,17,0.92)",
    padding: "90px 30px",
  },

  ctaGlow: {
    position: "absolute",
    width: "400px",
    height: "400px",
    background: "rgba(0,255,170,0.08)",
    filter: "blur(100px)",
    left: "50%",
    top: "-280px",
    transform: "translateX(-50%)",
    pointerEvents: "none",
  },

  ctaTitle: {
    position: "relative",
    margin: 0,
    fontSize: "72px",
    lineHeight: 0.95,
    letterSpacing: "-4px",
  },

  ctaDescription: {
    position: "relative",
    maxWidth: "560px",
    margin: "25px auto 0",
    color: "#788581",
    lineHeight: 1.7,
  },

  ctaButton: {
    position: "relative",
    marginTop: "32px",
    border: "none",
    background: "#00ffaa",
    color: "#03100c",
    padding: "17px 25px",
    borderRadius: "12px",
    fontSize: "11px",
    fontWeight: 900,
    letterSpacing: "1px",
    cursor: "pointer",
  },

  footer: {
    position: "relative",
    zIndex: 2,
    borderTop: "1px solid rgba(255,255,255,0.06)",
    padding: "35px 34px",
    maxWidth: "1400px",
    margin: "0 auto",
  },

  footerLogo: {
    color: "#00ffaa",
    fontSize: "12px",
    fontWeight: 900,
    letterSpacing: "2px",
  },

  footerText: {
    marginTop: "8px",
    color: "#52605b",
    fontSize: "10px",
  },

  footerBottom: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "30px",
    color: "#3e4945",
    fontSize: "8px",
    letterSpacing: "1px",
  },
};

export default App;