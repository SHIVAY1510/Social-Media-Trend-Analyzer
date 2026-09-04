export default function StatCard({
  icon,
  title,
  value,
  change,
  description,
  onClick,
}) {
  return (
    <div
      className={`stat-card ${onClick ? "clickable" : ""}`}
      onClick={onClick}
      onKeyDown={(event) => {
        if (onClick && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          onClick();
        }
      }}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="stat-icon">{icon}</div>

      <div className="stat-content">
        <span>{title}</span>

        <h2>{value}</h2>

        <div className="stat-change">
          <strong>{change}</strong>
          <small>{description}</small>
        </div>
      </div>
    </div>
  );
}