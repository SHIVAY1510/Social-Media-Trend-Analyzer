import {
  ArrowLeft,
  BarChart3,
  Lock,
  Mail,
  User,
} from "lucide-react";

export default function Signup({ onNavigate, onSignup }) {
  const submit = (e) => {
    e.preventDefault();
    onSignup();
  };

  return (
    <div className="auth-page">
      <button
        className="back-home"
        onClick={() => onNavigate("home")}
      >
        <ArrowLeft size={17} />
        Back to Home
      </button>

      <div className="auth-card">
        <div className="auth-brand">
          <div className="logo-icon">
            <BarChart3 size={21} />
          </div>
          TrendPulse AI
        </div>

        <h1>Create Account</h1>

        <p>
          Start discovering the next big trend.
        </p>

        <form onSubmit={submit}>
          <label>Full Name</label>

          <div className="input-field">
            <User size={17} />
            <input
              type="text"
              placeholder="Your name"
              required
            />
          </div>

          <label>Email</label>

          <div className="input-field">
            <Mail size={17} />
            <input
              type="email"
              placeholder="you@example.com"
              required
            />
          </div>

          <label>Password</label>

          <div className="input-field">
            <Lock size={17} />
            <input
              type="password"
              placeholder="Create password"
              required
            />
          </div>

          <button className="auth-submit">
            Create Account
          </button>
        </form>

        <div className="auth-switch">
          Already have an account?

          <button onClick={() => onNavigate("login")}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}