import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  generateWorkout,
  generateNutrition,
  saveUserProfile,
  saveWorkoutPlan,
} from "../api";

export default function Home() {
  const [form, setForm] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    goal: "",
    activity_level: "",
    diet: "",
    health_issues: "",
  });

  const [nutritionAdvice, setNutritionAdvice] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerateWorkout = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        age: Number(form.age),
        weight: Number(form.weight),
        height: Number(form.height),
      };

      // Save user profile first
      await saveUserProfile(payload);

      // Generate workout plan
      const { plan } = await generateWorkout(payload);

      // Save workout plan with profile snapshot
      await saveWorkoutPlan({
        profile: payload,
        workout_plan: plan,
      });

      localStorage.setItem("workoutPlan", plan);
      navigate("/workout");
    } catch (error) {
      console.error("Failed to generate or save workout plan", error);
      alert("Error generating workout plan.");
    }
  };

  const handleGenerateNutrition = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        age: Number(form.age),
        weight: Number(form.weight),
        height: Number(form.height),
      };

      const { advice } = await generateNutrition(payload);
      setNutritionAdvice(advice);
    } catch (error) {
      console.error("Failed to generate nutrition advice", error);
      alert("Error generating nutrition advice.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Personalized Fitness & Nutrition Plan
        </h2>

        <form>
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Age */}
            <div>
              <label className="block font-medium mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                min={0}
                required
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block font-medium mb-1">Gender</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="non-binary">Non-binary</option>
              </select>
            </div>

            {/* Weight */}
            <div>
              <label className="block font-medium mb-1">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                min={0}
                step="any"
                required
              />
            </div>

            {/* Height */}
            <div>
              <label className="block font-medium mb-1">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={form.height}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                min={0}
                step="any"
                required
              />
            </div>

            {/* Goal */}
            <div>
              <label className="block font-medium mb-1">Goal</label>
              <select
                name="goal"
                value={form.goal}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Goal</option>
                <option value="weight loss">Weight Loss</option>
                <option value="muscle gain">Muscle Gain</option>
                <option value="recomposition">Body Recomposition</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            {/* Activity Level */}
            <div>
              <label className="block font-medium mb-1">Activity Level</label>
              <select
                name="activity_level"
                value={form.activity_level}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Activity Level</option>
                <option value="sedentary">Sedentary</option>
                <option value="light">Light</option>
                <option value="moderate">Moderate</option>
                <option value="active">Active</option>
                <option value="very active">Very Active</option>
              </select>
            </div>

            {/* Diet */}
            <div>
              <label className="block font-medium mb-1">Diet Preference</label>
              <select
                name="diet"
                value={form.diet}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Diet</option>
                <option value="none">No Preference</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="paleo">Paleo</option>
                <option value="keto">Keto</option>
                <option value="mediterranean">Mediterranean</option>
              </select>
            </div>
          </div>

          {/* Health Issues */}
          <div className="mb-4">
            <label className="block font-medium mb-1">Health Issues (optional)</label>
            <textarea
              name="health_issues"
              value={form.health_issues}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows={3}
              placeholder="e.g. asthma, diabetes, injury..."
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleGenerateWorkout}
              className="flex-1 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Generate Workout Plan
            </button>

            <button
              onClick={handleGenerateNutrition}
              className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Get Nutrition Advice
            </button>
          </div>
        </form>

        {/* Nutrition advice display */}
        {nutritionAdvice && (
          <div className="mt-6 p-4 bg-yellow-100 rounded">
            <h3 className="font-bold mb-2">Nutrition Advice</h3>
            <p>{nutritionAdvice}</p>
          </div>
        )}
      </div>
    </div>
  );
}
