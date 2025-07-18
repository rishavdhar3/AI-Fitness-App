import { useState } from 'react';
import { saveMealEntry } from '../api'; 

export default function NutritionMeals() {
  const [meal, setMeal] = useState({
    date: '',
    mealName: '',
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    ingredients: '',
    notes: '',
  });

  const handleChange = (e) => {
    setMeal({ ...meal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...meal,
        calories: Number(meal.calories) || 0,
        protein: Number(meal.protein) || 0,
        carbs: Number(meal.carbs) || 0,
        fat: Number(meal.fat) || 0,
      };

      await saveMealEntry(payload);
      alert('Meal logged successfully!');
      setMeal({
        date: '',
        mealName: '',
        calories: '',
        protein: '',
        carbs: '',
        fat: '',
        ingredients: '',
        notes: '',
      });
    } catch (error) {
      alert('Failed to save meal entry.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Log New Meal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={meal.date}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Meal Name</label>
          <input
            type="text"
            name="mealName"
            value={meal.mealName}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block mb-1">Calories</label>
            <input
              type="number"
              name="calories"
              value={meal.calories}
              onChange={handleChange}
              min="0"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Protein (g)</label>
            <input
              type="number"
              name="protein"
              value={meal.protein}
              onChange={handleChange}
              min="0"
              step="any"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Carbs (g)</label>
            <input
              type="number"
              name="carbs"
              value={meal.carbs}
              onChange={handleChange}
              min="0"
              step="any"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Fat (g)</label>
            <input
              type="number"
              name="fat"
              value={meal.fat}
              onChange={handleChange}
              min="0"
              step="any"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-1">Ingredients</label>
          <textarea
            name="ingredients"
            value={meal.ingredients}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Notes</label>
          <textarea
            name="notes"
            value={meal.notes}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Meal
        </button>
      </form>
    </div>
  );
}
