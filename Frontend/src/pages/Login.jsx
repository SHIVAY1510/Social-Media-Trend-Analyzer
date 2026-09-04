import { ArrowLeft, BarChart3, Lock, Mail } from "lucide-react";

export default function Login({ onNavigate, onLogin }) {
  const submit = (e) => {
    e.preventDefault();
    onLogin();
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

        <h1>Welcome Back</h1>

        <p>
          Sign in to continue analyzing social trends.
        </p>

        <form onSubmit={submit}>
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
              placeholder="Your password"
              required
            />
          </div>

          <button className="auth-submit">
            Login
          </button>
        </form>

        <div className="auth-switch">
          Don't have an account?

          <button onClick={() => onNavigate("signup")}>
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
}