import React from "react";
import { Link } from "react-router-dom";

const tasks = [
  {
    id: "01",
    title: "Missing Key Attribute",
    description: "List items lose their state when reordered or shuffled.",
    icon: "🔑",
  },
  {
    id: "02",
    title: "Closure Issue in Loops",
    description:
      "Event handlers capture stale values from when they were created.",
    icon: "🔒",
  },
  {
    id: "03",
    title: "Reference Type Mutation",
    description:
      "UI doesn't update when arrays or objects are modified directly.",
    icon: "🔄",
  },
  {
    id: "04",
    title: "Stale State in useState",
    description:
      "Multiple rapid state updates only apply once instead of accumulating.",
    icon: "⏰",
  },
  {
    id: "05",
    title: "useEffect Missing Dependency",
    description: "Effect doesn't re-run when values it depends on change.",
    icon: "📦",
  },
  {
    id: "06",
    title: "useEffect Infinite Loop",
    description:
      "Effect runs continuously, causing performance issues and crashes.",
    icon: "♾️",
  },
  {
    id: "07",
    title: "Conditional Rendering Bug",
    description:
      "Number 0 renders as text instead of being hidden in conditional rendering.",
    icon: "❓",
  },
  {
    id: "08",
    title: "Re-render Performance Issue",
    description:
      "Child components re-render unnecessarily when parent state changes.",
    icon: "⚡",
  },
  {
    id: "09",
    title: "Expensive Computation",
    description:
      "Heavy calculations run on every render, even when inputs haven't changed.",
    icon: "🧮",
  },
  {
    id: "10",
    title: "Incorrect Unmount Cleanup",
    description:
      "Timers and subscriptions continue running after component is removed.",
    icon: "🧹",
  },
  {
    id: "11",
    title: "Event Handler Binding",
    description:
      "Click handlers execute immediately on render instead of on click.",
    icon: "🎪",
  },
  {
    id: "12",
    title: "Async Race Condition",
    description: "Wrong data appears when switching between items quickly.",
    icon: "🏁",
  },
];

function Dashboard() {
  return (
    <div className="container">
      <header className="header">
        <h1>⚛️ React Interview Tasks</h1>
        <p>Master common React bugs through interactive examples</p>
      </header>

      <div className="dashboard-grid">
        {tasks.map((task, index) => (
          <Link
            to={`/task/${task.id}`}
            key={task.id}
            style={{
              textDecoration: "none",
              animationDelay: `${index * 0.05}s`,
            }}
          >
            <div className="task-card">
              <div className="task-card-header">
                <div className="task-icon">{task.icon}</div>
                <h3 className="task-title">Task {task.id}</h3>
              </div>
              <p className="task-description">{task.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <footer
        className="text-center"
        style={{ marginTop: "3rem", paddingBottom: "2rem" }}
      >
        <p style={{ color: "var(--text-muted)", marginBottom: "1rem" }}>
          Click on any task to see the buggy version, fixed version, and
          detailed explanation
        </p>
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Created by <strong>Mahmoud Taha</strong>
        </p>
        <p style={{ marginTop: "0.5rem" }}>
          <a
            href="https://www.linkedin.com/in/mahmoud-taha-dev/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "var(--primary)",
              textDecoration: "none",
              fontSize: "0.9rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            💼 Connect on LinkedIn
          </a>
        </p>
      </footer>
    </div>
  );
}

export default Dashboard;
