import google.generativeai as genai

def query_ai(user_data, command):
    if command == "workout":
        return generate_workout_plan(user_data)
    elif command == "nutrition":
        return generate_nutrition_advice(user_data)
    elif command == "progression":
        return "Generated progression advice."
    elif command == "form":
        return "Generated form advice."
    else:
        return "Command not recognized."



genai.configure(api_key="GOOGLE API KEY HERE")
model = genai.GenerativeModel('gemini-2.0-flash')
def generate_workout_plan(user_profile: dict) -> str:
    weight_lbs = user_profile['weight'] * 2.20462  # kg to lbs
    height_in = user_profile['height'] * 0.393701  # cm to inches

    prompt = f"""
    You are a certified personal trainer.
    Create a 7-day workout plan based on the user profile:
    Age: {user_profile['age']}
    Gender: {user_profile['gender']}
    Weight: {weight_lbs:.1f} lbs
    Height: {height_in:.1f} inches
    Goal: {user_profile['goal']}
    Activity Level: {user_profile['activity_level']}
    """
    response = model.generate_content(prompt)
    return response.text

def generate_nutrition_advice(user_profile: dict) -> str:
    weight_lbs = user_profile['weight'] * 2.20462  # kg to lbs
    height_in = user_profile['height'] * 0.393701  # cm to inches

    prompt = f"""
    You are a certified nutritionist.
    Provide detailed daily nutrition advice based on the user profile:
    Age: {user_profile['age']}
    Gender: {user_profile['gender']}
    Weight: {weight_lbs:.1f} lbs
    Height: {height_in:.1f} inches
    Goal: {user_profile['goal']}
    Activity Level: {user_profile['activity_level']}
    Dietary Preferences: {user_profile['diet']}
    Health Issues: {user_profile['health_issues']}
    """
    response = model.generate_content(prompt)
    return response.text
