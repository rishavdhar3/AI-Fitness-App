import { useState } from 'react';
import { saveWorkoutEntry } from '../api';

export default function WorkoutLogging() {
  const [entry, setEntry] = useState({
    date: '',
    exercise: '',
    sets: '',
    reps: '',
    weight: '',
    notes: '',
  });

  const handleChange = (e) => {
    setEntry({ ...entry, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveWorkoutEntry({
        ...entry,
        sets: Number(entry.sets),
        reps: Number(entry.reps),
        weight: entry.weight ? Number(entry.weight) : undefined,
      });
      alert('Workout logged successfully!');
      setEntry({
        date: '',
        exercise: '',
        sets: '',
        reps: '',
        weight: '',
        notes: '',
      });
    } catch (error) {
      alert('Failed to save workout entry.');
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Log New Workout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={entry.date}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Exercise</label>
          <input
            type="text"
            name="exercise"
            value={entry.exercise}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded"
            required
          />
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Sets</label>
            <input
              type="number"
              name="sets"
              value={entry.sets}
              onChange={handleChange}
              min="1"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-medium">Reps</label>
            <input
              type="number"
              name="reps"
              value={entry.reps}
              onChange={handleChange}
              min="1"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>

          <div className="flex-1">
            <label className="block mb-1 font-medium">Weight</label>
            <input
              type="number"
              name="weight"
              value={entry.weight}
              onChange={handleChange}
              step="any"
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium">Notes</label>
          <textarea
            name="notes"
            value={entry.notes}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 p-2 rounded resize-none"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Entry
        </button>
      </form>
    </div>
  );
}
