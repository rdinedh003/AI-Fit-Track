from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


# =========================================================
# APP
# =========================================================

app = FastAPI(
    title="AI Fit Track API",
    description="AI-powered fitness and wellness backend",
    version="1.0.0",
)


# =========================================================
# CORS
# =========================================================

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


# =========================================================
# REQUEST MODELS
# =========================================================

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=1000)


class FitnessData(BaseModel):
    height: float = Field(..., gt=0, le=300)
    weight: float = Field(..., gt=0, le=500)
    age: int = Field(..., ge=1, le=120)
    steps: int = Field(..., ge=0, le=100000)
    water: float = Field(..., ge=0, le=20000)
    workouts: int = Field(..., ge=0, le=100)


# =========================================================
# HELPER FUNCTIONS
# =========================================================

def calculate_bmi(height: float, weight: float) -> float:
    """
    Calculate BMI using height in centimeters
    and weight in kilograms.
    """

    height_meters = height / 100

    if height_meters <= 0:
        raise ValueError("Height must be greater than zero.")

    bmi = weight / (height_meters ** 2)

    return round(bmi, 1)


def get_bmi_status(bmi: float) -> str:

    if bmi < 18.5:
        return "Underweight"

    elif bmi < 25:
        return "Healthy weight range"

    elif bmi < 30:
        return "Overweight range"

    else:
        return "Obesity range"


def get_step_message(steps: int) -> str:

    if steps < 3000:
        return (
            "Your daily activity is currently low. "
            "Try increasing your steps gradually."
        )

    elif steps < 7000:
        return (
            "Your activity level is moderate. "
            "Try gradually moving toward a higher daily step count."
        )

    else:
        return (
            "Great job staying active with your daily steps!"
        )


def get_water_message(water: float) -> str:

    if water < 1500:
        return (
            "Your water intake appears low. "
            "Try drinking water regularly throughout the day."
        )

    elif water < 2500:
        return (
            "Your hydration level is reasonable. "
            "Keep drinking water consistently."
        )

    else:
        return (
            "Great hydration consistency!"
        )


def get_workout_message(workouts: int) -> str:

    if workouts == 0:
        return (
            "You have not logged a workout yet. "
            "Start with a simple beginner workout."
        )

    elif workouts < 3:
        return (
            "Good start! "
            "Try building a consistent weekly workout routine."
        )

    else:
        return (
            "Excellent workout consistency! "
            "Keep maintaining your routine."
        )


def get_overall_message(
    steps: int,
    water: float,
    workouts: int
) -> str:

    if (
        steps >= 7000
        and water >= 2000
        and workouts >= 3
    ):
        return (
            "Your overall activity pattern looks strong. "
            "Keep focusing on consistency, recovery and balanced nutrition."
        )

    elif (
        steps >= 5000
        or workouts >= 2
    ):
        return (
            "You are making good progress. "
            "Focus on consistency and gradually improve your activity level."
        )

    else:
        return (
            "Start with small, realistic fitness goals "
            "and build consistency over time."
        )


# =========================================================
# HOME / HEALTH CHECK
# =========================================================

@app.get("/")
def home():

    return {
        "success": True,
        "message": "AI Fit Track Backend is Running!",
        "status": "online",
        "version": "1.0.0",
    }


@app.get("/health")
def health_check():

    return {
        "success": True,
        "status": "healthy",
        "service": "AI Fit Track Backend",
    }


# =========================================================
# AI FITNESS ANALYSIS
# =========================================================

@app.post("/fitness-analysis")
def fitness_analysis(data: FitnessData):

    try:

        # -------------------------
        # BMI
        # -------------------------

        bmi = calculate_bmi(
            height=data.height,
            weight=data.weight,
        )

        bmi_status = get_bmi_status(bmi)

        # -------------------------
        # Steps
        # -------------------------

        step_message = get_step_message(
            data.steps
        )

        # -------------------------
        # Water
        # -------------------------

        water_message = get_water_message(
            data.water
        )

        # -------------------------
        # Workouts
        # -------------------------

        workout_message = get_workout_message(
            data.workouts
        )

        # -------------------------
        # Overall
        # -------------------------

        overall = get_overall_message(
            steps=data.steps,
            water=data.water,
            workouts=data.workouts,
        )

        # -------------------------
        # Response
        # -------------------------

        return {
            "success": True,
            "analysis": {
                "bmi": bmi,
                "bmi_status": bmi_status,
                "step_message": step_message,
                "water_message": water_message,
                "workout_message": workout_message,
                "overall": overall,
            },
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Fitness analysis failed: {str(error)}",
        )


# =========================================================
# AI COACH
# =========================================================

@app.post("/ai-coach")
def ai_coach(request: ChatRequest):

    try:

        message = request.message.strip().lower()

        if not message:

            return {
                "success": False,
                "reply": "Please enter a fitness question.",
            }

        # -------------------------
        # Workout
        # -------------------------

        if (
            "workout" in message
            or "exercise" in message
            or "gym" in message
        ):

            reply = (
                "Try a balanced workout with a warm-up, "
                "strength training and a cool-down. "
                "Start gradually and focus on proper form."
            )

        # -------------------------
        # Weight
        # -------------------------

        elif (
            "weight" in message
            or "lose weight" in message
            or "fat" in message
        ):

            reply = (
                "For healthy weight management, focus on "
                "regular exercise, balanced nutrition and "
                "consistent sleep. Gradual progress is more sustainable."
            )

        # -------------------------
        # Water
        # -------------------------

        elif (
            "water" in message
            or "hydration" in message
        ):

            reply = (
                "Stay hydrated throughout the day and adjust "
                "your water intake based on your activity level "
                "and environment."
            )

        # -------------------------
        # Steps
        # -------------------------

        elif (
            "steps" in message
            or "walking" in message
        ):

            reply = (
                "Try gradually increasing your daily steps "
                "and take short walking breaks during the day."
            )

        # -------------------------
        # BMI
        # -------------------------

        elif "bmi" in message:

            reply = (
                "BMI is a screening measure based on height and weight. "
                "Your AI Fit Track dashboard can calculate it for you."
            )

        # -------------------------
        # Muscle
        # -------------------------

        elif (
            "muscle" in message
            or "strength" in message
        ):

            reply = (
                "For building strength, combine resistance training "
                "with enough recovery and balanced nutrition. "
                "Increase training gradually."
            )

        # -------------------------
        # Sleep
        # -------------------------

        elif (
            "sleep" in message
            or "rest" in message
        ):

            reply = (
                "Good recovery is an important part of fitness. "
                "Maintain a consistent sleep schedule and allow "
                "your body enough recovery time."
            )

        # -------------------------
        # Default
        # -------------------------

        else:

            reply = (
                "I'm your AI Fit Coach. Ask me about "
                "workouts, weight, water, steps, BMI, "
                "muscle building or recovery."
            )

        return {
            "success": True,
            "reply": reply,
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"AI Coach failed: {str(error)}",
        )


# =========================================================
# FITNESS DATA
# =========================================================

@app.post("/fitness-data")
def fitness_data(data: FitnessData):

    try:

        bmi = calculate_bmi(
            height=data.height,
            weight=data.weight,
        )

        return {
            "success": True,
            "message": "Fitness data received successfully!",
            "data": {
                "height": data.height,
                "weight": data.weight,
                "age": data.age,
                "steps": data.steps,
                "water": data.water,
                "workouts": data.workouts,
                "bmi": bmi,
            },
        }

    except Exception as error:

        raise HTTPException(
            status_code=500,
            detail=f"Fitness data processing failed: {str(error)}",
        )