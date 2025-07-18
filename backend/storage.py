import json
import os

PROFILE_FILE = "user_profile.json"
HISTORY_FILE = "workout_history.json"
MEALS_FILE = "meal_history.json"
PLANS_FILE = "saved_plans.json"

def load_from_file(filename: str):
    if not os.path.exists(filename):
        return []
    with open(filename, "r") as f:
        return json.load(f)

def save_to_file(filename: str, data):
    with open(filename, "w") as f:
        json.dump(data, f, indent=4)

# User Profile
def load_profile():
    if not os.path.exists(PROFILE_FILE):
        return None
    with open(PROFILE_FILE, "r") as f:
        return json.load(f)

def save_profile(profile: dict):
    with open(PROFILE_FILE, "w") as f:
        json.dump(profile, f, indent=4)

# Workout History
def load_history():
    return load_from_file(HISTORY_FILE)

def save_history(history: list):
    save_to_file(HISTORY_FILE, history)

# Meal History
def load_meals():
    return load_from_file(MEALS_FILE)

def save_meals(meals: list):
    save_to_file(MEALS_FILE, meals)

# Saved Workout Plans
def load_plans():
    return load_from_file(PLANS_FILE)

def save_plans(plans: list):
    save_to_file(PLANS_FILE, plans)
