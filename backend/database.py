import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")

client = MongoClient(MONGODB_URI)

db = client["ai_fit_track"]

users_collection = db["users"]
fitness_collection = db["fitness_data"]
workouts_collection = db["workouts"]