const BASE_URL = "http://localhost:8000";

export const generateWorkout = async (profile) => {
  const res = await fetch(`${BASE_URL}/generate-workout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
  if (!res.ok) throw new Error("Failed to generate workout plan");
  return res.json(); // Expect { plan: string }
};

export const generateNutrition = async (profile) => {
  const res = await fetch(`${BASE_URL}/generate-nutrition`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
  if (!res.ok) throw new Error("Failed to generate nutrition advice");
  return res.json(); // Expect { advice: string }
};

export const generateForm = async (profile) => {
  const res = await fetch(`${BASE_URL}/generate-form`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
  if (!res.ok) throw new Error("Failed to generate form advice");
  return res.json();
};

export const generateProgression = async (profile) => {
  const res = await fetch(`${BASE_URL}/generate-progression`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
  if (!res.ok) throw new Error("Failed to generate progression advice");
  return res.json();
};

export const getWorkoutHistory = async () => {
  const res = await fetch(`${BASE_URL}/get-history`);
  if (!res.ok) throw new Error("Failed to fetch workout history");
  return res.json();
};

export const saveWorkoutEntry = async (entry) => {
  const res = await fetch(`${BASE_URL}/save-history`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });
  if (!res.ok) throw new Error("Failed to save workout entry");
  return res.json();
};

export const deleteWorkoutEntry = async (index) => {
  const res = await fetch(`${BASE_URL}/delete-history`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ index }),
  });
  if (!res.ok) throw new Error("Failed to delete workout entry");
  return res.json();
};

export const getMeals = async () => {
  const res = await fetch(`${BASE_URL}/get-meals`);
  if (!res.ok) throw new Error("Failed to fetch meals");
  return res.json();
};

export const saveMealEntry = async (entry) => {
  const res = await fetch(`${BASE_URL}/save-meal`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(entry),
  });
  if (!res.ok) throw new Error("Failed to save meal entry");
  return res.json();
};

// Save user profile
export const saveUserProfile = async (profile) => {
  const res = await fetch(`${BASE_URL}/save-profile`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(profile),
  });
  if (!res.ok) throw new Error("Failed to save user profile");
  return res.json();
};

// Get user profile
export const getUserProfile = async () => {
  const res = await fetch(`${BASE_URL}/get-profile`);
  if (!res.ok) throw new Error("Failed to fetch user profile");
  return res.json();
};

// Save workout plan
export const saveWorkoutPlan = async (planData) => {
  const res = await fetch(`${BASE_URL}/save-plan`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(planData),
  });
  if (!res.ok) throw new Error("Failed to save workout plan");
  return res.json();
};

// Get saved workout plans
export const getSavedPlans = async () => {
  const res = await fetch(`${BASE_URL}/get-plans`);
  if (!res.ok) throw new Error("Failed to fetch saved plans");
  return res.json();
};
