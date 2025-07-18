import { useState, useEffect } from 'react';
import { getWorkoutHistory, deleteWorkoutEntry } from '../api';

export default function History() {
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const data = await getWorkoutHistory();
      if (Array.isArray(data)) {
        setHistory(data);
      } else {
        console.warn('Workout history data is not an array:', data);
        setHistory([]);
      }
      setError(null);
    } catch (err) {
      console.error('Failed to fetch workout history:', err);
      setError('Failed to load workout history.');
      setHistory([]);
    }
  }

  async function handleDelete(index) {
    if (!window.confirm("Are you sure you want to delete this workout entry?")) {
      return;
    }
    setLoadingDelete(true);
    try {
      await deleteWorkoutEntry(index);
      // Refetch history after successful delete
      await fetchHistory();
    } catch (err) {
      console.error('Failed to delete workout entry:', err);
      alert('Error deleting workout entry.');
    } finally {
      setLoadingDelete(false);
    }
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md text-red-600">
        {error}
      </div>
    );
  }

  if (!Array.isArray(history) || history.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md text-center text-gray-500">
        No workout history found.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow-md">
      <h2 className="text-xl font-bold mb-4">Workout History</h2>
      <ul className="space-y-4">
        {history.map((entry, index) => (
          <li key={index} className="border p-4 rounded flex flex-col space-y-2">
            <div><strong>Date:</strong> {entry.date || 'N/A'}</div>
            <div><strong>Exercise:</strong> {entry.exercise || 'N/A'}</div>
            <div><strong>Sets:</strong> {entry.sets ?? 'N/A'}</div>
            <div><strong>Reps:</strong> {entry.reps ?? 'N/A'}</div>
            {entry.weight !== undefined && <div><strong>Weight:</strong> {entry.weight}</div>}
            {entry.notes && <div><strong>Notes:</strong> {entry.notes}</div>}
            <button
              onClick={() => handleDelete(index)}
              disabled={loadingDelete}
              className="self-start bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 disabled:opacity-50"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
