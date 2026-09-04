import { useState } from "react";
import { Bell, Check, Globe, LockKeyhole, UserRound } from "lucide-react";

import Sidebar from "../components/Sidebar";

export default function Settings({ onNavigate, onLogout }) {
  const [saved, setSaved] = useState(false);
  const [email, setEmail] = useState("alex.morgan@example.com");
  const [preferences, setPreferences] = useState({
    weeklyDigest: true,
    trendAlerts: true,
    productUpdates: false,
  });

  const togglePreference = (name) => {
    setPreferences((current) => ({ ...current, [name]: !current[name] }));
    setSaved(false);
  };

  const saveSettings = (event) => {
    event.preventDefault();
    setSaved(true);
  };

  return (
    <div className="dashboard-layout">
      <Sidebar page="settings" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-content">
        <header className="page-header settings-header">
          <div>
            <span className="eyebrow">ACCOUNT CONTROL</span>
            <h1>Settings</h1>
            <p>Manage your profile, alerts, and analysis preferences.</p>
          </div>
          <div className="settings-avatar">AM</div>
        </header>

        <form className="settings-grid" onSubmit={saveSettings}>
          <section className="panel settings-panel">
            <div className="settings-section-title">
              <div className="settings-icon"><UserRound size={17} /></div>
              <div><h2>Profile</h2><p>How you appear across TrendPulse.</p></div>
            </div>
            <div className="settings-fields">
              <label>Full name<input type="text" defaultValue="Alex Morgan" /></label>
              <label>Email address<input type="email" value={email} onChange={(event) => { setEmail(event.target.value); setSaved(false); }} /></label>
              <label>Role<select defaultValue="Content strategist"><option>Content strategist</option><option>Social media manager</option><option>Marketing analyst</option></select></label>
            </div>
          </section>

          <section className="panel settings-panel">
            <div className="settings-section-title">
              <div className="settings-icon"><Bell size={17} /></div>
              <div><h2>Notifications</h2><p>Choose the signals worth a closer look.</p></div>
            </div>
            <div className="settings-options">
              {[
                ["weeklyDigest", "Weekly trend digest", "A Monday summary of your strongest signals."],
                ["trendAlerts", "Trend momentum alerts", "Get notified when a saved trend starts moving."],
                ["productUpdates", "Product updates", "Occasional news about new TrendPulse features."],
              ].map(([name, title, description]) => (
                <label className="settings-option" key={name}>
                  <span><strong>{title}</strong><small>{description}</small></span>
                  <input type="checkbox" checked={preferences[name]} onChange={() => togglePreference(name)} />
                  <span className="toggle" />
                </label>
              ))}
            </div>
          </section>

          <section className="panel settings-panel">
            <div className="settings-section-title">
              <div className="settings-icon"><Globe size={17} /></div>
              <div><h2>Analysis defaults</h2><p>Set the starting point for new trend searches.</p></div>
            </div>
            <div className="settings-fields">
              <label>Default region<select defaultValue="India"><option>India</option><option>Global</option><option>North America</option><option>Europe</option><option>Asia Pacific</option></select></label>
              <label>Default time range<select defaultValue="Last 7 days"><option>Last 7 days</option><option>Last 30 days</option><option>Last 90 days</option></select></label>
            </div>
          </section>

          <section className="panel settings-panel security-panel">
            <div className="settings-section-title">
              <div className="settings-icon"><LockKeyhole size={17} /></div>
              <div><h2>Security</h2><p>Keep your account access up to date.</p></div>
            </div>
            <button type="button" className="outline-btn settings-action">Change password</button>
            <button type="button" className="outline-btn settings-action">Manage active sessions</button>
          </section>

          <div className="settings-footer">
            {saved && <span className="save-confirmation"><Check size={15} /> Changes saved</span>}
            <button className="primary-btn" type="submit">Save changes</button>
          </div>
        </form>
      </main>
    </div>
  );
}
