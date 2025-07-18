from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime
from storage import load_from_file, save_to_file, load_profile, save_profile, load_plans, save_plans
from fastapi import HTTPException

import storage 
from ai import query_ai 

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data Models
class UserProfile(BaseModel):
    age: int
    gender: str
    weight: float
    height: float
    goal: str
    activity_level: str
    diet: str
    health_issues: str

class WorkoutEntry(BaseModel):
    date: Optional[str] = None
    exercise: str
    muscle_group: Optional[str] = None
    sets: int
    reps: int
    weight: Optional[float] = None
    rpe: Optional[float] = None
    notes: Optional[str] = None

class MealEntry(BaseModel):
    date: Optional[str] = None
    mealName: str
    calories: float
    protein: float
    carbs: float
    fat: float
    ingredients: Optional[str] = None
    notes: Optional[str] = None

class SavedPlan(BaseModel):
    id: Optional[int] = None  # Optional unique ID for plans
    created_at: Optional[str] = None
    profile: UserProfile
    workout_plan: str

# AI endpoints
@app.post("/generate-workout")
async def generate_workout(profile: UserProfile):
    text = query_ai(profile.dict(), "workout")
    return {"plan": text}

@app.post("/generate-nutrition")
async def generate_nutrition(profile: UserProfile):
    text = query_ai(profile.dict(), "nutrition")
    return {"advice": text}

# Profile endpoints
@app.post("/save-profile")
async def save_profile(profile: UserProfile):
    storage.save_profile(profile.dict())
    return {"message": "User profile saved."}

@app.get("/get-profile")
async def get_profile():
    profile = storage.load_profile()
    if profile is None:
        return {}
    return profile

# Workout history endpoints
@app.post("/save-history")
async def save_history(entry: WorkoutEntry):
    if entry.date is None:
        entry.date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    history = storage.load_history()
    history.append(entry.dict())
    storage.save_history(history)
    return {"message": "Workout history saved."}

@app.get("/get-history", response_model=List[WorkoutEntry])
async def get_history():
    return storage.load_history()

HISTORY_FILE = "workout_history.json"

@app.post("/delete-history")
def delete_history(index_data: dict):
    index = index_data.get("index")
    if index is None:
        return {"error": "Missing index"}, 400
    history = load_from_file(HISTORY_FILE)
    if 0 <= index < len(history):
        history.pop(index)
        save_to_file(HISTORY_FILE, history)
        return {"message": "Entry deleted"}
    else:
        return {"error": "Index out of range"}, 400

# Meal endpoints
@app.post("/save-meal")
async def save_meal(entry: MealEntry):
    if entry.date is None:
        entry.date = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    meals = storage.load_meals()
    meals.append(entry.dict())
    storage.save_meals(meals)
    return {"message": "Meal entry saved."}

@app.get("/get-meals", response_model=List[MealEntry])
async def get_meals():
    return storage.load_meals()

# Saved plans endpoints
@app.post("/save-plan")
async def save_plan(plan: SavedPlan):
    plans = storage.load_plans()
    if plan.id is None:
        plan.id = max([p.get("id", 0) for p in plans], default=0) + 1
    if plan.created_at is None:
        plan.created_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    plans.append(plan.dict())
    storage.save_plans(plans)
    return {"message": "Workout plan saved.", "id": plan.id}

@app.get("/get-plans", response_model=List[SavedPlan])
async def get_plans():
    return storage.load_plans()
