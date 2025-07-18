import { useEffect, useState } from "react";

export default function WorkoutPlan() {
  const [plan, setPlan] = useState("");

  useEffect(() => {
    const savedPlan = localStorage.getItem("workoutPlan") || "No workout plan found.";
    setPlan(savedPlan);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Workout Plan</h1>
      <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">{plan}</pre>
    </div>
  );
}
