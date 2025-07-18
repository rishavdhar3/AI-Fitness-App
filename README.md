# AI-Fitness-App
This is the entire file structure and code for an intelligent, full-stack fitness planner. Users can generate workout and nutrition advice using AI, track workout history, log meals, and view saved workout plans, all in a modern and responsive web interface.

---

Features

AI-Powered Planning
- **Workout Plan Generator** – Tailored routines based on user goals, body metrics, and activity level.
- **Nutrition Advice Generator** – Personalized dietary recommendations to support goals like fat loss, muscle gain, or maintenance.
- **Form Guide Generator** – AI provides exercise-specific guidance to ensure safe and effective execution.
- **Progression Scheme Generator** – Smart progression suggestions to help users continually challenge themselves.

Tracking & History
- **Workout History Log** – Users can log sets, reps, and exercise notes via a simple modern interface.
- **Meal Logging** – Add daily meals and view your nutritional habits over time.
- **Saved Workout Plans** – Store and revisit past workout programs.
- **User Profile Creation** - Gender, age, weight, height, activity level, and fitness goal are saved for seamless AI usage.

---

How It Works

**Backend (FastAPI)**
- Receives user profile and requests.
- Calls AI model (Google Gemini) to generate responses.
- Stores and retrieves data using simple JSON-based local storage (`user_profile.json`, `workout_history.json`, etc.).

**Frontend (React + Tailwind)**
- A simple, clean UI with multiple pages:
  - **Home** – Allows users to enter profile data and generate a nutrition plan or workout advice.
  - **Workout Plan** – View the AI-generated workout, form guide, and progression scheme.
  - **Nutrition Plan** – View AI-generated nutrition advice and add meals.
  - **History** – Review and manage workout and meal logs.
  - **Saved Plans** – See saved AI-generated workouts.
  - **Profile** – Update or review your personal data.

---

**Prerequisites and How to Run**
- Python 3.10+
- Node.js 18+
- A Gemini key for AI generation
- There is a .bat file called start_app.bat in this repository that will run the frontend and backend of this project locally if you run it.

---
