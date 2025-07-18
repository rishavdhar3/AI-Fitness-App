import { useEffect, useState } from "react";
import { getSavedPlans } from "../api";

export default function SavedPlans() {
  const [plans, setPlans] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const data = await getSavedPlans();
        setPlans(data);
      } catch (err) {
        console.error("Failed to load saved plans", err);
        setError("Failed to load saved plans.");
      } finally {
        setLoading(false);
      }
    }
    fetchPlans();
  }, []);

  if (loading) return <div>Loading saved plans...</div>;
  if (error) return <div className="text-red-600">{error}</div>;
  if (plans.length === 0) return <div>No saved workout plans found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-6">Saved Workout Plans</h2>

      {plans.map((plan) => (
        <div key={plan.id} className="mb-6 border p-4 rounded shadow-sm">
          <h3 className="font-semibold text-lg mb-2">
            Plan from {new Date(plan.created_at).toLocaleString()}
          </h3>
          <p><strong>Goal:</strong> {plan.profile.goal}</p>
          <p><strong>Activity Level:</strong> {plan.profile.activity_level}</p>
          <pre className="whitespace-pre-wrap mt-2 bg-gray-100 p-3 rounded max-h-64 overflow-auto">
            {plan.workout_plan}
          </pre>
        </div>
      ))}
    </div>
  );
}
