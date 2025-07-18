import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import WorkoutPlan from "./pages/WorkoutPlan";
import WorkoutLogging from "./pages/WorkoutLogging";
import History from "./pages/History";
import NutritionPlan from "./pages/NutritionPlan";
import NutritionMeals from "./pages/NutritionMeals";
import Profile from "./pages/Profile";
import SavedPlans from "./pages/SavedPlans";

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workout" element={<WorkoutPlan />} />
          <Route path="/workout-logging" element={<WorkoutLogging />} />
          <Route path="/history" element={<History />} />
          <Route path="/nutrition" element={<NutritionPlan />} />
          <Route path="/nutrition-meals" element={<NutritionMeals />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/saved-plans" element={<SavedPlans />} />
        </Routes>
      </div>
    </Router>
  );
}
