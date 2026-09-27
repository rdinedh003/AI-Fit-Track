from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Request Models
# -----------------------------

class ChatRequest(BaseModel):
    message: str


class FitnessData(BaseModel):
    height: float
    weight: float
    age: int
    steps: int
    water: float
    workouts: int


# -----------------------------
# Home
# -----------------------------

@app.get("/")
def home():
    return {
        "message": "AI Fit Track Backend is Running!"
    }


# -----------------------------
# AI Fitness Analysis
# -----------------------------

@app.post("/fitness-analysis")
def fitness_analysis(data: FitnessData):

    # BMI calculation
    bmi = data.weight / ((data.height / 100) ** 2)
    bmi = round(bmi, 1)

    # BMI category
    if bmi < 18.5:
        bmi_status = "Underweight"
    elif bmi < 25:
        bmi_status = "Healthy weight range"
    elif bmi < 30:
        bmi_status = "Overweight range"
    else:
        bmi_status = "Obesity range"

    # Step analysis
    if data.steps < 3000:
        step_message = "Your daily activity is currently low. Try increasing your steps gradually."
    elif data.steps < 7000:
        step_message = "Your activity level is moderate. Try gradually moving toward a higher daily step count."
    else:
        step_message = "Great job staying active with your daily steps!"

    # Water analysis
    if data.water < 1500:
        water_message = "Your water intake appears low. Try drinking water regularly throughout the day."
    elif data.water < 2500:
        water_message = "Your hydration level is reasonable. Keep drinking water consistently."
    else:
        water_message = "Great hydration consistency!"

    # Workout analysis
    if data.workouts == 0:
        workout_message = "You have not logged a workout yet. Start with a simple beginner workout."
    elif data.workouts < 3:
        workout_message = "Good start! Try building a consistent weekly workout routine."
    else:
        workout_message = "Excellent workout consistency! Keep maintaining your routine."

    # Overall insight
    if data.steps >= 7000 and data.water >= 2000 and data.workouts >= 3:
        overall = "Your overall activity pattern looks strong. Keep focusing on consistency, recovery and balanced nutrition."
    elif data.steps >= 5000 or data.workouts >= 2:
        overall = "You are making good progress. Focus on consistency and gradually improve your activity level."
    else:
        overall = "Start with small, realistic fitness goals and build consistency over time."

    return {
        "success": True,
        "analysis": {
            "bmi": bmi,
            "bmi_status": bmi_status,
            "step_message": step_message,
            "water_message": water_message,
            "workout_message": workout_message,
            "overall": overall,
        }
    }


# -----------------------------
# AI Coach
# -----------------------------

@app.post("/ai-coach")
def ai_coach(request: ChatRequest):

    message = request.message.lower()

    if "workout" in message:
        reply = (
            "Try a balanced workout with warm-up, "
            "strength training and a cool-down."
        )

    elif "weight" in message:
        reply = (
            "For healthy weight management, focus on "
            "regular exercise, balanced nutrition and consistent sleep."
        )

    elif "water" in message:
        reply = (
            "Stay hydrated throughout the day and adjust "
            "your water intake based on your activity and environment."
        )

    elif "steps" in message:
        reply = (
            "Try gradually increasing your daily steps "
            "and take short walking breaks during the day."
        )

    elif "bmi" in message:
        reply = (
            "BMI is a screening measure based on height and weight. "
            "Your AI Fit Track dashboard can calculate it for you."
        )

    else:
        reply = (
            "I'm your AI Fit Coach. Ask me about "
            "workouts, weight, water, steps or BMI."
        )

    return {
        "reply": reply
    }


# -----------------------------
# Fitness Data
# -----------------------------

@app.post("/fitness-data")
def fitness_data(data: FitnessData):

    bmi = data.weight / ((data.height / 100) ** 2)

    return {
        "message": "Fitness data received successfully!",
        "data": {
            "height": data.height,
            "weight": data.weight,
            "age": data.age,
            "steps": data.steps,
            "water": data.water,
            "workouts": data.workouts,
            "bmi": round(bmi, 1),
        },
    }