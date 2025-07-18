import { NavLink } from "react-router-dom";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive ? "underline font-semibold" : "hover:underline";

  return (
    <nav className="bg-blue-600 p-4 text-white flex space-x-4">
      <NavLink to="/" className={linkClass}>
        Home
      </NavLink>
      <NavLink to="/workout" className={linkClass}>
        Workout Plan
      </NavLink>
      <NavLink to="/workout-logging" className={linkClass}>
        Log Workout
      </NavLink>
      <NavLink to="/history" className={linkClass}>
        History
      </NavLink>
      <NavLink to="/nutrition" className={linkClass}>
        Nutrition Plan
      </NavLink>
      <NavLink to="/nutrition-meals" className={linkClass}>
        Meal Entry
      </NavLink>
      <NavLink to="/profile" className={linkClass}>
        Profile
      </NavLink>
      <NavLink to="/saved-plans" className={linkClass}>
        Saved Plans
      </NavLink>
    </nav>
  );
}
