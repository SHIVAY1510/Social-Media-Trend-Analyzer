import { BarChart3, UserPlus } from "lucide-react";

export default function Navbar({ onNavigate }) {
  return (
    <nav className="navbar">
      <div className="logo" onClick={() => onNavigate("home")}>
        <div className="logo-icon">
          <BarChart3 size={22} />
        </div>
        <span>TrendPulse AI</span>
      </div>

      <div className="nav-links">
        <button onClick={() => onNavigate("home")}>Home</button>
        <button onClick={() => onNavigate("login")}>Login</button>

        <button
          className="signup-nav"
          onClick={() => onNavigate("signup")}
        >
          <UserPlus size={17} />
          Sign Up
        </button>
      </div>
    </nav>
  );
}