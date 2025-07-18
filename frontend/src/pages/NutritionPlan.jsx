import { useEffect, useState } from "react";

export default function NutritionPlan() {
  const [advice, setAdvice] = useState("");

  useEffect(() => {
    const savedAdvice = localStorage.getItem("nutritionAdvice") || "No nutrition advice found.";
    setAdvice(savedAdvice);
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Your Nutrition Advice</h1>
      <pre className="whitespace-pre-wrap bg-gray-100 p-4 rounded">{advice}</pre>
    </div>
  );
}
