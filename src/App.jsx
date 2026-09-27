import { useEffect, useRef, useState } from "react";
import Auth from "./Auth";
import Dashboard from "./Dashboard";
import ThreeDBody from "./ThreeDBody";

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState(null);

  const [intro, setIntro] = useState(true);
  const [introProgress, setIntroProgress] = useState(0);
  const [introFinished, setIntroFinished] = useState(false);

  const [mouse, setMouse] = useState({
    x: 50,
    y: 50,
  });

  const [visibleSections, setVisibleSections] = useState({});

  const sectionRefs = useRef([]);

  // -----------------------------
  // SAVED LOGIN
  // -----------------------------
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

  // -----------------------------
  // CINEMATIC INTRO
  // -----------------------------
  useEffect(() => {
    if (!intro) return;

    const startTime = Date.now();
    const duration = 2200;

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(
        100,
        Math.round((elapsed / duration) * 100)
      );

      setIntroProgress(progress);

      if (progress >= 100) {
        clearInterval(timer);

        setTimeout(() => {
          setIntroFinished(true);
          setIntro(false);
        }, 100);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [intro]);

  // -----------------------------
  // MOUSE PARALLAX
  // -----------------------------
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 100,
        y: (event.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // -----------------------------
  // SCROLL REVEAL
  // -----------------------------
  useEffect(() => {
    if (!introFinished) return;

    const observers = [];

    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleSections((prev) => ({
                ...prev,
                [index]: true,
              }));
            }
          });
        },
        {
          threshold: 0.12,
        }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, [introFinished]);

  const skipIntro = () => {
    setIntroProgress(100);
    setIntroFinished(true);
    setIntro(false);
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // -----------------------------
  // LOGGED IN
  // -----------------------------
  if (user) {
    return <Dashboard user={user} />;
  }

  // -----------------------------
  // AUTH
  // -----------------------------
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
    <>
      {/* =====================================================
          CINEMATIC INTRO
      ====================================================== */}

      {!introFinished && (
        <div style={styles.introScreen}>
          <div style={styles.introGrid}></div>

          <div
            style={{
              ...styles.introAurora,
              left: `${mouse.x}%`,
              top: `${mouse.y}%`,
            }}
          />

          {/* PARTICLES */}
          <div style={styles.introParticles}>
            {Array.from({ length: 28 }).map((_, index) => (
              <span
                key={index}
                style={{
                  ...styles.introParticle,
                  left: `${(index * 37) % 100}%`,
                  top: `${(index * 19) % 100}%`,
                  animationDelay: `${(index % 7) * 0.2}s`,
                }}
              />
            ))}
          </div>

          {/* TOP SYSTEM HUD */}
          <div style={styles.topHud}>
            <span>AI-FIT-TRACK // CORE-01</span>
            <span>SECURE SYSTEM</span>
          </div>

          {/* CORNER HUD */}
          <div style={styles.cornerTopLeft}></div>
          <div style={styles.cornerTopRight}></div>
          <div style={styles.cornerBottomLeft}></div>
          <div style={styles.cornerBottomRight}></div>

          <div style={styles.introCenter}>
            {/* STATUS */}
            <div style={styles.bootStatus}>
              <span style={styles.statusPulse}></span>

              {introProgress < 30
                ? "INITIALIZING AI CORE"
                : introProgress < 60
                ? "SCANNING HUMAN MOTION"
                : introProgress < 85
                ? "CALIBRATING 3D ENGINE"
                : "SYSTEM READY"}
            </div>

            {/* 3D CORE */}
            <div style={styles.introCore}>
              <div style={styles.coreRingOne}></div>
              <div style={styles.coreRingTwo}></div>
              <div style={styles.coreRingThree}></div>

              <div style={styles.coreGlow}></div>

              <div style={styles.introBody}>
                <ThreeDBody />
              </div>

              {/* SCAN BEAM */}
              <div
                style={{
                  ...styles.introScanBeam,
                  top: `${18 + (introProgress / 100) * 64}%`,
                }}
              ></div>

              {/* DATA POINTS */}
              <div style={{ ...styles.dataPoint, top: "22%", left: "8%" }}>
                <span></span>
                MOTION
              </div>

              <div style={{ ...styles.dataPoint, top: "42%", right: "4%" }}>
                <span></span>
                AI CORE
              </div>

              <div style={{ ...styles.dataPoint, bottom: "24%", left: "5%" }}>
                <span></span>
                BODY
              </div>

              <div style={{ ...styles.dataPoint, bottom: "18%", right: "2%" }}>
                <span></span>
                ANALYSIS
              </div>
            </div>

            {/* TITLE */}
            <div
              style={{
                ...styles.introBrand,
                transform: `translateY(${
                  introProgress >= 65 ? "0px" : "14px"
                })`,
                opacity: introProgress >= 45 ? 1 : 0,
              }}
            >
              <div style={styles.introEyebrow}>
                AI-POWERED 3D FITNESS SYSTEM
              </div>

              <h1 style={styles.introTitle}>
                AI <span>FIT</span> TRACK
              </h1>

              <div style={styles.introLine}>
                TRAIN SMARTER • LIVE STRONGER
              </div>
            </div>

            {/* PROGRESS */}
            <div style={styles.bootProgress}>
              <div style={styles.bootProgressTop}>
                <span>
                  {introProgress < 30
                    ? "LOADING FITNESS CORE..."
                    : introProgress < 60
                    ? "ANALYZING MOTION..."
                    : introProgress < 85
                    ? "ACTIVATING EXPERIENCE..."
                    : "WELCOME TO AI FIT TRACK"}
                </span>

                <strong>{introProgress}%</strong>
              </div>

              <div style={styles.bootTrack}>
                <div
                  style={{
                    ...styles.bootFill,
                    width: `${introProgress}%`,
                  }}
                />
              </div>
            </div>

            <button style={styles.skipIntro} onClick={skipIntro}>
              SKIP INTRO →
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          MAIN WEBSITE
      ====================================================== */}

      <div
        style={{
          ...styles.page,
          opacity: introFinished ? 1 : 0,
          transform: introFinished
            ? "scale(1) translateY(0)"
            : "scale(1.035) translateY(15px)",
          pointerEvents: introFinished ? "auto" : "none",
        }}
      >
        {/* NAVBAR */}
        <nav style={styles.navbar}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>⚡</span>
            <span>AI Fit Track</span>
          </div>

          <div style={styles.navLinks}>
            <button onClick={() => scrollTo("features")}>
              Features
            </button>

            <button onClick={() => scrollTo("ai")}>
              AI Coach
            </button>

            <button onClick={() => scrollTo("progress")}>
              Progress
            </button>

            <button
              style={styles.loginButton}
              onClick={() => setShowAuth(true)}
            >
              Login
            </button>
          </div>
        </nav>

        <main>
          {/* =================================================
              HERO
          ================================================== */}

          <section style={styles.hero}>
            <div style={styles.heroContent}>
              <div style={styles.badge}>
                <span style={styles.badgeDot}></span>
                AI POWERED FITNESS PLATFORM
              </div>

              <h1 style={styles.title}>
                Train Smarter.
                <br />
                <span style={styles.gradient}>
                  Live Stronger.
                </span>
              </h1>

              <p style={styles.description}>
                A next-generation fitness platform combining AI,
                interactive 3D visualization, smart workouts,
                progress analytics and personalized coaching.
              </p>

              <div style={styles.buttons}>
                <button
                  style={styles.primaryButton}
                  onClick={() => setShowAuth(true)}
                >
                  Start Your Journey
                  <span>→</span>
                </button>

                <button
                  style={styles.secondaryButton}
                  onClick={() => scrollTo("features")}
                >
                  Explore Platform
                </button>
              </div>

              <div style={styles.trust}>
                <div>
                  <strong>AI</strong>
                  <span>Powered</span>
                </div>

                <div>
                  <strong>3D</strong>
                  <span>Interactive</span>
                </div>

                <div>
                  <strong>24/7</strong>
                  <span>AI Coach</span>
                </div>
              </div>
            </div>

            {/* HERO 3D */}
            <div style={styles.heroVisual}>
              <div style={styles.heroGlow}></div>

              <div style={styles.heroOrbit}></div>
              <div style={styles.heroOrbitSmall}></div>

              <div style={styles.heroCard}>
                <div style={styles.heroCardHeader}>
                  <span>AI BODY ANALYSIS</span>

                  <span style={styles.live}>
                    <i></i>
                    LIVE
                  </span>
                </div>

                <div style={styles.heroBody}>
                  <ThreeDBody />

                  <div style={styles.floatScore}>
                    <small>AI FITNESS SCORE</small>
                    <strong>92</strong>
                    <span>EXCELLENT</span>
                  </div>

                  <div style={styles.floatStatus}>
                    <small>BODY STATUS</small>
                    <strong>OPTIMAL</strong>
                    <span>● AI ANALYZED</span>
                  </div>

                  <div style={styles.floatEnergy}>
                    <small>ENERGY</small>
                    <strong>84%</strong>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* MARQUEE */}
          <div style={styles.marquee}>
            <div style={styles.marqueeTrack}>
              {[
                "AI FITNESS",
                "3D BODY",
                "SMART WORKOUTS",
                "AI COACH",
                "PROGRESS",
                "GAMIFICATION",
                "AI FITNESS",
                "3D BODY",
                "SMART WORKOUTS",
                "AI COACH",
                "PROGRESS",
                "GAMIFICATION",
              ].map((item, index) => (
                <span key={index}>
                  {item}
                  <b>✦</b>
                </span>
              ))}
            </div>
          </div>

          {/* =================================================
              FEATURES
          ================================================== */}

          <section
            id="features"
            ref={(el) => (sectionRefs.current[0] = el)}
            style={{
              ...styles.section,
              ...getRevealStyle(visibleSections[0]),
            }}
          >
            <div style={styles.sectionHeader}>
              <span style={styles.sectionLabel}>
                THE AI FIT SYSTEM
              </span>

              <h2 style={styles.sectionTitle}>
                Everything you need
                <br />
                <span style={styles.gradient}>
                  to level up.
                </span>
              </h2>

              <p style={styles.sectionDescription}>
                One intelligent platform for your complete fitness journey.
              </p>
            </div>

            <div style={styles.featureGrid}>
              <Feature
                icon="🤖"
                number="01"
                title="AI Fitness Coach"
                text="Personalized fitness guidance based on your goals and activity."
              />

              <Feature
                icon="🏋️"
                number="02"
                title="Smart Workouts"
                text="Track exercises, sets, reps, timers and workout performance."
              />

              <Feature
                icon="🧍"
                number="03"
                title="Interactive 3D Body"
                text="Explore your body through an interactive 3D visualization."
              />

              <Feature
                icon="📊"
                number="04"
                title="Progress Analytics"
                text="Understand your fitness journey using charts and history."
              />

              <Feature
                icon="🧠"
                number="05"
                title="AI Insights"
                text="Convert your fitness data into useful recommendations."
              />

              <Feature
                icon="🏆"
                number="06"
                title="Gamification"
                text="Earn XP, maintain streaks and unlock achievements."
              />
            </div>
          </section>

          {/* =================================================
              AI SECTION
          ================================================== */}

          <section
            id="ai"
            ref={(el) => (sectionRefs.current[1] = el)}
            style={{
              ...styles.aiSection,
              ...getRevealStyle(visibleSections[1]),
            }}
          >
            <div style={styles.aiGlow}></div>

            <div style={styles.aiCard}>
              <div style={styles.aiVisual}>
                <div style={styles.aiRingOne}></div>
                <div style={styles.aiRingTwo}></div>

                <div style={styles.aiCore}>
                  <span>AI</span>
                </div>
              </div>

              <div style={styles.aiContent}>
                <span style={styles.sectionLabel}>
                  YOUR PERSONAL AI
                </span>

                <h2 style={styles.aiTitle}>
                  Meet your
                  <br />
                  <span style={styles.gradient}>
                    AI Fitness Coach.
                  </span>
                </h2>

                <p style={styles.aiText}>
                  Ask about workouts, steps, water, BMI, weight
                  management and fitness goals. Your AI Coach connects
                  with your fitness system.
                </p>

                <button
                  style={styles.primaryButton}
                  onClick={() => setShowAuth(true)}
                >
                  Enter AI Coach
                  <span>→</span>
                </button>
              </div>
            </div>
          </section>

          {/* =================================================
              PROGRESS
          ================================================== */}

          <section
            id="progress"
            ref={(el) => (sectionRefs.current[2] = el)}
            style={{
              ...styles.section,
              ...getRevealStyle(visibleSections[2]),
            }}
          >
            <div style={styles.sectionHeader}>
              <span style={styles.sectionLabel}>
                SMART ANALYTICS
              </span>

              <h2 style={styles.sectionTitle}>
                Progress that
                <br />
                <span style={styles.gradient}>
                  motivates you.
                </span>
              </h2>
            </div>

            <div style={styles.progressDashboard}>
              <div style={styles.progressTop}>
                <div>
                  <span style={styles.mutedLabel}>
                    WEEKLY ACTIVITY
                  </span>

                  <h3 style={styles.progressTitle}>
                    Your fitness momentum
                  </h3>
                </div>

                <div style={styles.scoreCircle}>
                  <strong>86</strong>
                  <span>SCORE</span>
                </div>
              </div>

              <div style={styles.chart}>
                <ChartBar day="MON" height="42%" />
                <ChartBar day="TUE" height="58%" />
                <ChartBar day="WED" height="50%" />
                <ChartBar day="THU" height="72%" />
                <ChartBar day="FRI" height="64%" />
                <ChartBar day="SAT" height="92%" />
                <ChartBar day="SUN" height="78%" />
              </div>

              <div style={styles.analytics}>
                <div>
                  <span>🔥 Calories</span>
                  <strong>642</strong>
                </div>

                <div>
                  <span>👟 Steps</span>
                  <strong>8,426</strong>
                </div>

                <div>
                  <span>💧 Water</span>
                  <strong>1.8L</strong>
                </div>

                <div>
                  <span>⚡ Streak</span>
                  <strong>12 Days</strong>
                </div>
              </div>
            </div>
          </section>

          {/* =================================================
              TECHNOLOGY
          ================================================== */}

          <section
            ref={(el) => (sectionRefs.current[3] = el)}
            style={{
              ...styles.techSection,
              ...getRevealStyle(visibleSections[3]),
            }}
          >
            <span style={styles.sectionLabel}>
              BUILT FOR THE FUTURE
            </span>

            <h2 style={styles.techTitle}>
              AI + 3D + Analytics
              <br />
              <span style={styles.gradient}>
                in one experience.
              </span>
            </h2>

            <div style={styles.techGrid}>
              <Tech icon="⚡" text="AI ENGINE" />
              <Tech icon="🧍" text="3D VISUALIZATION" />
              <Tech icon="📈" text="SMART ANALYTICS" />
              <Tech icon="🏆" text="GAMIFICATION" />
            </div>
          </section>

          {/* =================================================
              FINAL CTA
          ================================================== */}

          <section
            ref={(el) => (sectionRefs.current[4] = el)}
            style={{
              ...styles.finalSection,
              ...getRevealStyle(visibleSections[4]),
            }}
          >
            <div style={styles.finalGlow}></div>

            <span style={styles.sectionLabel}>
              READY TO START?
            </span>

            <h2 style={styles.finalTitle}>
              Your stronger version
              <br />
              <span style={styles.gradient}>
                starts today.
              </span>
            </h2>

            <p style={styles.finalText}>
              Build consistency. Track progress. Train smarter with AI.
            </p>

            <button
              style={styles.finalButton}
              onClick={() => setShowAuth(true)}
            >
              Enter AI Fit Track
              <span>→</span>
            </button>
          </section>
        </main>

        {/* FOOTER */}
        <footer style={styles.footer}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>⚡</span>
            AI Fit Track
          </div>

          <span style={styles.footerText}>
            AI-Powered 3D Fitness & Wellness Platform • © 2026
          </span>
        </footer>
      </div>
    </>
  );
}

/* =========================================================
   HELPERS
========================================================= */

function getRevealStyle(visible) {
  return {
    opacity: visible ? 1 : 0,
    transform: visible
      ? "translateY(0) scale(1)"
      : "translateY(55px) scale(.97)",
    transition:
      "opacity .8s ease, transform .8s cubic-bezier(.2,.8,.2,1)",
  };
}

function Feature({ icon, number, title, text }) {
  return (
    <div style={styles.featureCard}>
      <div style={styles.featureTop}>
        <div style={styles.featureIcon}>{icon}</div>
        <span style={styles.featureNumber}>{number}</span>
      </div>

      <h3>{title}</h3>

      <p>{text}</p>

      <div style={styles.featureArrow}>↗</div>
    </div>
  );
}

function ChartBar({ day, height }) {
  return (
    <div style={styles.chartColumn}>
      <div style={styles.chartBarArea}>
        <div
          style={{
            ...styles.chartBar,
            height,
          }}
        ></div>
      </div>

      <span>{day}</span>
    </div>
  );
}

function Tech({ icon, text }) {
  return (
    <div style={styles.techItem}>
      <span>{icon}</span>
      {text}
    </div>
  );
}

/* =========================================================
   STYLES
========================================================= */

const styles = {
  /* ================= INTRO ================= */

  introScreen: {
    position: "fixed",
    inset: 0,
    zIndex: 9999,
    background:
      "radial-gradient(circle at center, #102c48 0%, #050a14 45%, #01030a 100%)",
    color: "#fff",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  introGrid: {
    position: "absolute",
    inset: 0,
    opacity: 0.14,
    backgroundImage:
      "linear-gradient(rgba(0,217,255,.14) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,.14) 1px, transparent 1px)",
    backgroundSize: "48px 48px",
    maskImage: "radial-gradient(circle, black, transparent 75%)",
  },

  introAurora: {
    position: "absolute",
    width: "550px",
    height: "550px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(0,217,255,.16), rgba(117,87,255,.08), transparent 70%)",
    filter: "blur(35px)",
    transform: "translate(-50%, -50%)",
    transition: "left .5s ease, top .5s ease",
  },

  introParticles: {
    position: "absolute",
    inset: 0,
  },

  introParticle: {
    position: "absolute",
    width: "3px",
    height: "3px",
    borderRadius: "50%",
    background: "#5cecff",
    boxShadow: "0 0 12px #5cecff",
    animation: "fitParticle 2.4s ease-in-out infinite",
  },

  topHud: {
    position: "absolute",
    top: "22px",
    left: "28px",
    right: "28px",
    display: "flex",
    justifyContent: "space-between",
    color: "#4e6884",
    fontSize: "8px",
    letterSpacing: "2px",
    fontWeight: 800,
  },

  cornerTopLeft: {
    position: "absolute",
    top: "65px",
    left: "30px",
    width: "55px",
    height: "55px",
    borderTop: "1px solid rgba(0,217,255,.35)",
    borderLeft: "1px solid rgba(0,217,255,.35)",
  },

  cornerTopRight: {
    position: "absolute",
    top: "65px",
    right: "30px",
    width: "55px",
    height: "55px",
    borderTop: "1px solid rgba(0,217,255,.35)",
    borderRight: "1px solid rgba(0,217,255,.35)",
  },

  cornerBottomLeft: {
    position: "absolute",
    bottom: "30px",
    left: "30px",
    width: "55px",
    height: "55px",
    borderBottom: "1px solid rgba(117,87,255,.35)",
    borderLeft: "1px solid rgba(117,87,255,.35)",
  },

  cornerBottomRight: {
    position: "absolute",
    bottom: "30px",
    right: "30px",
    width: "55px",
    height: "55px",
    borderBottom: "1px solid rgba(117,87,255,.35)",
    borderRight: "1px solid rgba(117,87,255,.35)",
  },

  introCenter: {
    width: "min(900px, 95vw)",
    textAlign: "center",
    position: "relative",
    zIndex: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  bootStatus: {
    fontSize: "9px",
    letterSpacing: "2.5px",
    color: "#8feeff",
    fontWeight: 800,
    marginBottom: "-2px",
  },

  statusPulse: {
    display: "inline-block",
    width: "7px",
    height: "7px",
    borderRadius: "50%",
    background: "#34e6a4",
    boxShadow: "0 0 14px #34e6a4",
    marginRight: "8px",
  },

  introCore: {
    width: "min(470px, 92vw)",
    height: "360px",
    position: "relative",
    display: "grid",
    placeItems: "center",
  },

  coreRingOne: {
    position: "absolute",
    width: "275px",
    height: "275px",
    borderRadius: "50%",
    border: "1px solid rgba(0,217,255,.25)",
    animation: "ringRotate 8s linear infinite",
  },

  coreRingTwo: {
    position: "absolute",
    width: "330px",
    height: "330px",
    borderRadius: "50%",
    border: "1px dashed rgba(139,92,246,.35)",
    animation: "ringReverse 10s linear infinite",
  },

  coreRingThree: {
    position: "absolute",
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    border: "1px solid rgba(0,217,255,.12)",
    boxShadow: "0 0 70px rgba(0,217,255,.08)",
  },

  coreGlow: {
    position: "absolute",
    width: "240px",
    height: "240px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle, rgba(0,217,255,.15), transparent 68%)",
    filter: "blur(15px)",
    animation: "coreGlow 2s ease-in-out infinite",
  },

  introBody: {
    position: "absolute",
    width: "290px",
    height: "290px",
    overflow: "hidden",
    borderRadius: "50%",
    transform: "scale(.68)",
    pointerEvents: "none",
    zIndex: 5,
  },

  introScanBeam: {
    position: "absolute",
    left: "18%",
    width: "64%",
    height: "2px",
    background:
      "linear-gradient(90deg, transparent, #00f0ff, #fff, #00f0ff, transparent)",
    boxShadow: "0 0 22px #00e5ff",
    transition: "top .06s linear",
    zIndex: 20,
  },

  dataPoint: {
    position: "absolute",
    padding: "5px 9px",
    border: "1px solid rgba(0,217,255,.28)",
    background: "rgba(2,14,26,.72)",
    color: "#7edff0",
    fontSize: "7px",
    letterSpacing: "1.5px",
    zIndex: 30,
  },

  introBrand: {
    marginTop: "-15px",
    transition: "opacity .4s ease, transform .4s ease",
  },

  introEyebrow: {
    fontSize: "8px",
    letterSpacing: "4px",
    color: "#637995",
    marginBottom: "7px",
  },

  introTitle: {
    margin: 0,
    fontSize: "clamp(40px, 7vw, 72px)",
    lineHeight: 1,
    letterSpacing: "-4px",
    fontWeight: 900,
    textShadow: "0 0 45px rgba(0,217,255,.2)",
  },

  introLine: {
    marginTop: "8px",
    fontSize: "8px",
    letterSpacing: "2.5px",
    color: "#60718b",
  },

  bootProgress: {
    width: "min(400px, 80vw)",
    marginTop: "17px",
  },

  bootProgressTop: {
    display: "flex",
    justifyContent: "space-between",
    color: "#61748f",
    fontSize: "8px",
    letterSpacing: "1px",
    marginBottom: "6px",
  },

  bootTrack: {
    height: "3px",
    background: "rgba(255,255,255,.07)",
    borderRadius: "10px",
    overflow: "hidden",
  },

  bootFill: {
    height: "100%",
    borderRadius: "10px",
    background: "linear-gradient(90deg,#7557ff,#00e5ff)",
    boxShadow: "0 0 18px #00e5ff",
    transition: "width .06s linear",
  },

  skipIntro: {
    marginTop: "11px",
    border: "1px solid rgba(255,255,255,.1)",
    background: "rgba(255,255,255,.035)",
    color: "#65748b",
    borderRadius: "20px",
    padding: "7px 13px",
    fontSize: "8px",
    letterSpacing: "1.5px",
    cursor: "pointer",
  },

  /* ================= PAGE ================= */

  page: {
    minHeight: "100vh",
    background:
      "radial-gradient(circle at 80% 5%, rgba(102,70,255,.16), transparent 25%), radial-gradient(circle at 10% 30%, rgba(0,217,255,.055), transparent 25%), #040711",
    color: "#fff",
    fontFamily: "Inter, Arial, sans-serif",
    overflowX: "hidden",
    transition:
      "opacity .65s cubic-bezier(.2,.8,.2,1), transform .8s cubic-bezier(.2,.8,.2,1)",
  },

  navbar: {
    height: "76px",
    padding: "0 7%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid rgba(255,255,255,.06)",
    background: "rgba(4,7,17,.78)",
    backdropFilter: "blur(18px)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontWeight: 800,
    fontSize: "20px",
  },

  logoIcon: {
    width: "37px",
    height: "37px",
    display: "grid",
    placeItems: "center",
    borderRadius: "11px",
    background: "linear-gradient(135deg,#7557ff,#00d9ff)",
    boxShadow: "0 0 25px rgba(0,217,255,.18)",
  },

  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "22px",
  },

  loginButton: {
    padding: "9px 18px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,.14)",
    background: "rgba(255,255,255,.05)",
    color: "#fff",
    cursor: "pointer",
    fontWeight: 700,
  },

  hero: {
    minHeight: "700px",
    padding: "80px 7%",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    gap: "50px",
    position: "relative",
  },

  heroContent: {
    maxWidth: "650px",
  },

  badge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "9px 14px",
    borderRadius: "30px",
    background: "rgba(117,87,255,.1)",
    border: "1px solid rgba(117,87,255,.2)",
    color: "#a999ff",
    fontSize: "10px",
    fontWeight: 800,
    letterSpacing: "1px",
    marginBottom: "23px",
  },

  badgeDot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    background: "#00e5ff",
    boxShadow: "0 0 10px #00e5ff",
  },

  title: {
    fontSize: "clamp(50px, 6vw, 82px)",
    lineHeight: 1,
    letterSpacing: "-4px",
    margin: "0 0 25px",
    fontWeight: 900,
  },

  gradient: {
    background: "linear-gradient(90deg,#8c6cff,#00d9ff)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  description: {
    color: "#929db7",
    fontSize: "17px",
    lineHeight: 1.8,
    maxWidth: "590px",
  },

  buttons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "13px",
    marginTop: "30px",
  },

  primaryButton: {
    padding: "14px 22px",
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg,#7557ff,#00cfe8)",
    color: "#fff",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 10px 35px rgba(0,207,232,.13)",
  },

  secondaryButton: {
    padding: "14px 22px",
    border: "1px solid rgba(255,255,255,.12)",
    borderRadius: "12px",
    background: "rgba(255,255,255,.04)",
    color: "#fff",
    cursor: "pointer",
  },

  trust: {
    display: "flex",
    gap: "38px",
    marginTop: "40px",
  },

  heroVisual: {
    minHeight: "540px",
    display: "grid",
    placeItems: "center",
    position: "relative",
  },

  heroGlow: {
    position: "absolute",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background: "rgba(87,75,255,.27)",
    filter: "blur(120px)",
  },

  heroOrbit: {
    position: "absolute",
    width: "480px",
    height: "480px",
    borderRadius: "50%",
    border: "1px solid rgba(0,217,255,.09)",
    animation: "ringRotate 12s linear infinite",
  },

  heroOrbitSmall: {
    position: "absolute",
    width: "390px",
    height: "390px",
    borderRadius: "50%",
    border: "1px dashed rgba(139,92,246,.18)",
    animation: "ringReverse 8s linear infinite",
  },

  heroCard: {
    width: "min(470px, 90vw)",
    padding: "20px",
    borderRadius: "28px",
    background: "rgba(255,255,255,.045)",
    border: "1px solid rgba(255,255,255,.11)",
    backdropFilter: "blur(18px)",
    position: "relative",
    zIndex: 2,
    boxShadow: "0 30px 100px rgba(0,0,0,.35)",
  },

  heroCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    color: "#77849f",
    fontSize: "9px",
    letterSpacing: "1.5px",
    fontWeight: 800,
  },

  live: {
    color: "#45e3a5",
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },

  heroBody: {
    height: "420px",
    position: "relative",
    marginTop: "5px",
  },

  floatScore: {
    position: "absolute",
    left: "-35px",
    top: "80px",
    padding: "13px",
    borderRadius: "14px",
    background: "rgba(5,12,25,.88)",
    border: "1px solid rgba(0,217,255,.2)",
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },

  floatStatus: {
    position: "absolute",
    right: "-35px",
    top: "165px",
    padding: "13px",
    borderRadius: "14px",
    background: "rgba(5,12,25,.88)",
    border: "1px solid rgba(139,92,246,.2)",
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },

  floatEnergy: {
    position: "absolute",
    right: "10px",
    bottom: "18px",
    padding: "12px 16px",
    borderRadius: "14px",
    background: "rgba(5,12,25,.88)",
    border: "1px solid rgba(0,217,255,.18)",
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },

  marquee: {
    overflow: "hidden",
    borderTop: "1px solid rgba(255,255,255,.06)",
    borderBottom: "1px solid rgba(255,255,255,.06)",
    background: "rgba(255,255,255,.015)",
    padding: "17px 0",
  },

  marqueeTrack: {
    display: "flex",
    width: "max-content",
    gap: "30px",
    color: "#63718d",
    fontSize: "10px",
    letterSpacing: "2px",
    fontWeight: 800,
    animation: "marqueeMove 24s linear infinite",
  },

  section: {
    padding: "115px 7%",
  },

  sectionHeader: {
    textAlign: "center",
    marginBottom: "55px",
  },

  sectionLabel: {
    color: "#8875ff",
    fontSize: "10px",
    fontWeight: 900,
    letterSpacing: "2.5px",
  },

  sectionTitle: {
    fontSize: "clamp(38px,5vw,58px)",
    lineHeight: 1.05,
    letterSpacing: "-2px",
    margin: "16px 0",
  },

  sectionDescription: {
    color: "#737f98",
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3,1fr)",
    gap: "17px",
  },

  featureCard: {
    position: "relative",
    padding: "28px",
    minHeight: "205px",
    borderRadius: "22px",
    background:
      "linear-gradient(145deg,rgba(255,255,255,.06),rgba(255,255,255,.025))",
    border: "1px solid rgba(255,255,255,.08)",
    transition:
      "transform .3s ease, border-color .3s ease, box-shadow .3s ease",
  },

  featureTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  featureIcon: {
    fontSize: "30px",
  },

  featureNumber: {
    color: "#45536d",
    fontSize: "12px",
    fontWeight: 900,
  },

  featureArrow: {
    position: "absolute",
    right: "25px",
    bottom: "20px",
    color: "#00d9ff",
    fontSize: "20px",
  },

  aiSection: {
    padding: "90px 7%",
    position: "relative",
    overflow: "hidden",
  },

  aiGlow: {
    position: "absolute",
    width: "600px",
    height: "400px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle,rgba(117,87,255,.18),transparent 70%)",
    filter: "blur(70px)",
    left: "50%",
    top: "50%",
    transform: "translate(-50%,-50%)",
  },

  aiCard: {
    maxWidth: "1100px",
    margin: "auto",
    padding: "65px",
    borderRadius: "32px",
    display: "flex",
    alignItems: "center",
    gap: "55px",
    background:
      "linear-gradient(135deg,rgba(117,87,255,.14),rgba(0,217,255,.045))",
    border: "1px solid rgba(255,255,255,.1)",
    position: "relative",
    zIndex: 2,
  },

  aiVisual: {
    width: "180px",
    height: "180px",
    position: "relative",
    display: "grid",
    placeItems: "center",
    flexShrink: 0,
  },

  aiRingOne: {
    position: "absolute",
    inset: 0,
    borderRadius: "50%",
    border: "1px solid rgba(0,217,255,.3)",
    animation: "ringRotate 6s linear infinite",
  },

  aiRingTwo: {
    position: "absolute",
    inset: "18px",
    borderRadius: "50%",
    border: "1px dashed rgba(139,92,246,.35)",
    animation: "ringReverse 5s linear infinite",
  },

  aiCore: {
    width: "105px",
    height: "105px",
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    background: "linear-gradient(135deg,#7557ff,#00d9ff)",
    boxShadow: "0 0 70px rgba(0,217,255,.28)",
    animation: "corePulse 2s ease-in-out infinite",
  },

  aiCore: {
    width: "105px",
    height: "105px",
    borderRadius: "50%",
    display: "grid",
    placeItems: "center",
    background: "linear-gradient(135deg,#7557ff,#00d9ff)",
    boxShadow: "0 0 70px rgba(0,217,255,.28)",
    animation: "corePulse 2s ease-in-out infinite",
  },

  aiContent: {
    flex: 1,
  },

  aiTitle: {
    fontSize: "clamp(35px,4vw,52px)",
    lineHeight: 1,
    letterSpacing: "-2px",
    margin: "15px 0",
  },

  aiText: {
    color: "#8d99b2",
    lineHeight: 1.8,
    maxWidth: "600px",
  },

  progressDashboard: {
    maxWidth: "1050px",
    margin: "auto",
    padding: "35px",
    borderRadius: "25px",
    background: "rgba(255,255,255,.045)",
    border: "1px solid rgba(255,255,255,.08)",
  },

  progressTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  mutedLabel: {
    color: "#66738b",
    fontSize: "9px",
    letterSpacing: "2px",
  },

  progressTitle: {
    fontSize: "23px",
    marginTop: "8px",
  },

  scoreCircle: {
    width: "72px",
    height: "72px",
    borderRadius: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid #00d9ff",
    boxShadow: "0 0 25px rgba(0,217,255,.15)",
  },

  chart: {
    height: "230px",
    display: "flex",
    alignItems: "end",
    gap: "12px",
    marginTop: "30px",
  },

  chartColumn: {
    flex: 1,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    alignItems: "center",
    gap: "8px",
  },

  chartBarArea: {
    width: "100%",
    height: "90%",
    display: "flex",
    alignItems: "end",
    justifyContent: "center",
  },

  chartBar: {
    width: "70%",
    maxWidth: "45px",
    minHeight: "15px",
    borderRadius: "8px 8px 3px 3px",
    background: "linear-gradient(180deg,#8c6cff,#00d9ff)",
    boxShadow: "0 0 20px rgba(0,217,255,.1)",
  },

  analytics: {
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "12px",
    marginTop: "25px",
  },

  techSection: {
    padding: "100px 7%",
    textAlign: "center",
    borderTop: "1px solid rgba(255,255,255,.05)",
  },

  techTitle: {
    fontSize: "clamp(36px,5vw,58px)",
    lineHeight: 1,
    margin: "18px 0 45px",
    letterSpacing: "-2px",
  },

  techGrid: {
    maxWidth: "900px",
    margin: "auto",
    display: "grid",
    gridTemplateColumns: "repeat(4,1fr)",
    gap: "12px",
  },

  techItem: {
    padding: "18px 12px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,.08)",
    background: "rgba(255,255,255,.03)",
    color: "#8793ab",
    fontSize: "10px",
    letterSpacing: "1px",
    fontWeight: 800,
    transition: "transform .25s ease, border-color .25s ease",
  },

  finalSection: {
    minHeight: "520px",
    padding: "100px 7%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
  },

  finalGlow: {
    position: "absolute",
    width: "550px",
    height: "320px",
    borderRadius: "50%",
    background:
      "radial-gradient(circle,rgba(117,87,255,.2),transparent 70%)",
    filter: "blur(55px)",
  },

  finalTitle: {
    fontSize: "clamp(42px,6vw,70px)",
    lineHeight: 1,
    letterSpacing: "-3px",
    margin: "18px 0",
    position: "relative",
  },

  finalText: {
    color: "#78849e",
    position: "relative",
  },

  finalButton: {
    marginTop: "25px",
    padding: "16px 28px",
    border: "none",
    borderRadius: "13px",
    background: "linear-gradient(135deg,#7557ff,#00d9ff)",
    color: "#fff",
    fontWeight: 900,
    cursor: "pointer",
    position: "relative",
    boxShadow: "0 15px 45px rgba(0,217,255,.12)",
  },

  footer: {
    padding: "35px 7%",
    borderTop: "1px solid rgba(255,255,255,.06)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  footerText: {
    color: "#56627a",
    fontSize: "11px",
  },
};

/* =========================================================
   ANIMATIONS
========================================================= */

if (typeof document !== "undefined") {
  const styleId = "ai-fit-track-premium-animations";

  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");

    style.id = styleId;

    style.innerHTML = `
      @keyframes ringRotate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes ringReverse {
        from {
          transform: rotate(360deg);
        }
        to {
          transform: rotate(0deg);
        }
      }

      @keyframes coreGlow {
        0%,100% {
          transform: scale(.9);
          opacity: .5;
        }

        50% {
          transform: scale(1.08);
          opacity: 1;
        }
      }

      @keyframes corePulse {
        0%,100% {
          transform: scale(1);
          box-shadow: 0 0 45px rgba(0,217,255,.2);
        }

        50% {
          transform: scale(1.06);
          box-shadow: 0 0 85px rgba(0,217,255,.4);
        }
      }

      @keyframes fitParticle {
        0%,100% {
          opacity: .1;
          transform: translateY(0) scale(.7);
        }

        50% {
          opacity: 1;
          transform: translateY(-18px) scale(1.2);
        }
      }

      @keyframes marqueeMove {
        from {
          transform: translateX(0);
        }

        to {
          transform: translateX(-50%);
        }
      }

      html {
        scroll-behavior: smooth;
      }

      body {
        margin: 0;
        background: #040711;
      }

      * {
        box-sizing: border-box;
      }

      a {
        color: inherit;
        text-decoration: none;
      }

      button {
        font-family: inherit;
      }

      .ai-fit-hover-card {
        transition:
          transform .3s ease,
          border-color .3s ease,
          box-shadow .3s ease;
      }

      @media (hover:hover) {
        .ai-fit-hover-card:hover {
          transform: translateY(-8px);
          border-color: rgba(0,217,255,.25);
          box-shadow: 0 25px 60px rgba(0,0,0,.2);
        }
      }

      @media (max-width: 900px) {
        .ai-fit-hide-mobile {
          display: none;
        }
      }

      @media (max-width: 768px) {
        .ai-fit-mobile-nav {
          display: none;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        *,
        *::before,
        *::after {
          animation-duration: .01ms !important;
          animation-iteration-count: 1 !important;
          scroll-behavior: auto !important;
          transition-duration: .01ms !important;
        }
      }
    `;

    document.head.appendChild(style);
  }
}

export default App;