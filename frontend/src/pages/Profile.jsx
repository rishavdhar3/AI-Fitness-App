import { useEffect, useState } from "react";
import { getUserProfile, saveUserProfile } from "../api";

export default function Profile() {
  const [profile, setProfile] = useState({
    age: "",
    gender: "",
    weight: "",
    height: "",
    goal: "",
    activity_level: "",
    diet: "",
    health_issues: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getUserProfile();
        if (data) setProfile(data);
      } catch (error) {
        console.error("Failed to load profile", error);
        setMessage("Failed to load profile.");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
    setMessage(null);
  };

  const handleSave = async () => {
    try {
      await saveUserProfile(profile);
      setMessage("Profile saved successfully!");
    } catch (error) {
      console.error("Failed to save profile", error);
      setMessage("Failed to save profile.");
    }
  };

  if (loading) return <div>Loading profile...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow mt-6">
      <h2 className="text-2xl font-bold mb-6">Your Profile</h2>

      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Age */}
        <div>
          <label className="block font-medium mb-1">Age</label>
          <input
            type="number"
            name="age"
            value={profile.age}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min={0}
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block font-medium mb-1">Gender</label>
          <select
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            className="w-full p-2 border rounded"
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
            value={profile.weight}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min={0}
            step="any"
          />
        </div>

        {/* Height */}
        <div>
          <label className="block font-medium mb-1">Height (cm)</label>
          <input
            type="number"
            name="height"
            value={profile.height}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min={0}
            step="any"
          />
        </div>

        {/* Goal */}
        <div>
          <label className="block font-medium mb-1">Goal</label>
          <select
            name="goal"
            value={profile.goal}
            onChange={handleChange}
            className="w-full p-2 border rounded"
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
            value={profile.activity_level}
            onChange={handleChange}
            className="w-full p-2 border rounded"
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
            value={profile.diet}
            onChange={handleChange}
            className="w-full p-2 border rounded"
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
          value={profile.health_issues}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          rows={3}
          placeholder="e.g. asthma, diabetes, injury..."
        />
      </div>

      {/* Save button and message */}
      <button
        onClick={handleSave}
        className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
      >
        Save Profile
      </button>

      {message && <p className="mt-4 text-green-700">{message}</p>}
    </div>
  );
}
