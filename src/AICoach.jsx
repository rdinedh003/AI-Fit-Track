import React, { useEffect, useState } from "react";

export default function AICoach() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi! I'm your AI Fit Coach. Ask me about workouts, weight, water, steps or BMI.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [fitnessGoal, setFitnessGoal] = useState(
    localStorage.getItem("aiFitFitnessGoal") || "Improve Fitness"
  );

  useEffect(() => {
    const savedGoal =
      localStorage.getItem("aiFitFitnessGoal") || "Improve Fitness";

    setFitnessGoal(savedGoal);
  }, []);

  const sendMessage = async (customMessage) => {
    const userMessage = customMessage || input.trim();

    if (!userMessage) return;

    const userMessageObject = {
      role: "user",
      text: userMessage,
    };

    setMessages((previous) => [
      ...previous,
      userMessageObject,
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/ai-coach",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `${userMessage}. My current fitness goal is ${fitnessGoal}.`,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("AI Coach request failed");
      }

      const data = await response.json();

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text: data.reply,
        },
      ]);
    } catch (error) {
      console.error("AI Coach error:", error);

      setMessages((previous) => [
        ...previous,
        {
          role: "assistant",
          text:
            "Sorry, I couldn't connect to the AI Coach backend. Please make sure FastAPI is running.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const quickQuestions = [
    "Give me a workout plan",
    "How can I improve my fitness?",
    "How much water should I drink?",
    "How can I increase my steps?",
  ];

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={styles.title}>
            🤖 AI Fitness Coach
          </h2>

          <p style={styles.subtitle}>
            Personalized guidance based on your fitness goal.
          </p>
        </div>

        <div style={styles.goalBadge}>
          🎯 {fitnessGoal}
        </div>
      </div>

      {/* QUICK QUESTIONS */}
      <div style={styles.quickQuestions}>
        {quickQuestions.map((question) => (
          <button
            key={question}
            onClick={() => sendMessage(question)}
            style={styles.quickButton}
            disabled={loading}
          >
            {question}
          </button>
        ))}
      </div>

      {/* CHAT */}
      <div style={styles.chatBox}>

        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              ...styles.messageRow,
              justifyContent:
                message.role === "user"
                  ? "flex-end"
                  : "flex-start",
            }}
          >
            <div
              style={{
                ...styles.message,
                ...(message.role === "user"
                  ? styles.userMessage
                  : styles.aiMessage),
              }}
            >
              {message.text}
            </div>
          </div>
        ))}

        {loading && (
          <div style={styles.messageRow}>
            <div style={styles.aiMessage}>
              🤖 Thinking...
            </div>
          </div>
        )}

      </div>

      {/* INPUT */}
      <div style={styles.inputArea}>

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              sendMessage();
            }
          }}
          placeholder="Ask your AI Fitness Coach..."
          style={styles.input}
          disabled={loading}
        />

        <button
          onClick={() => sendMessage()}
          style={styles.sendButton}
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>

      </div>

    </div>
  );
}

const styles = {
  container: {
    width: "100%",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "15px",
    flexWrap: "wrap",
    marginBottom: "16px",
  },

  title: {
    margin: 0,
    color: "#f8fafc",
    fontSize: "20px",
  },

  subtitle: {
    margin: "6px 0 0",
    color: "#64748b",
    fontSize: "12px",
  },

  goalBadge: {
    padding: "9px 12px",
    borderRadius: "10px",
    background: "rgba(34,211,238,0.08)",
    border: "1px solid rgba(34,211,238,0.2)",
    color: "#22d3ee",
    fontSize: "11px",
    fontWeight: "800",
  },

  quickQuestions: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
    marginBottom: "14px",
  },

  quickButton: {
    padding: "8px 11px",
    borderRadius: "9px",
    border: "1px solid rgba(148,163,184,0.15)",
    background: "rgba(15,23,42,0.7)",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: "10px",
  },

  chatBox: {
    minHeight: "260px",
    maxHeight: "380px",
    overflowY: "auto",
    padding: "15px",
    borderRadius: "14px",
    background: "rgba(2,6,23,0.55)",
    border: "1px solid rgba(148,163,184,0.1)",
  },

  messageRow: {
    display: "flex",
    marginBottom: "10px",
  },

  message: {
    maxWidth: "80%",
    padding: "10px 13px",
    borderRadius: "12px",
    fontSize: "12px",
    lineHeight: "1.5",
  },

  aiMessage: {
    background: "rgba(34,211,238,0.08)",
    border: "1px solid rgba(34,211,238,0.12)",
    color: "#cbd5e1",
  },

  userMessage: {
    background: "rgba(99,102,241,0.15)",
    border: "1px solid rgba(99,102,241,0.2)",
    color: "#e2e8f0",
  },

  inputArea: {
    display: "flex",
    gap: "8px",
    marginTop: "12px",
  },

  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(148,163,184,0.15)",
    background: "#020617",
    color: "#f8fafc",
    outline: "none",
    fontSize: "12px",
  },

  sendButton: {
    padding: "12px 18px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(135deg, #22d3ee, #6366f1)",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "800",
  },
};