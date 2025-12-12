import React from 'react';
import { useState, memo, useCallback } from "react";

// Child component that logs when it renders
const ExpensiveChild = memo(({ onClick, label }) => {
  console.log(`ExpensiveChild "${label}" rendered`);

  return (
    <div
      style={{
        padding: "var(--spacing-sm)",
        background: "var(--bg-secondary)",
        borderRadius: "var(--radius-md)",
        marginBottom: "var(--spacing-xs)",
      }}
    >
      <button className="btn btn-secondary" onClick={onClick}>
        {label}
      </button>
    </div>
  );
});


function Fixed() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  /* FIXED: Memoize callbacks with useCallback */
  const handleIncrement1 = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const handleIncrement2 = useCallback(() => {
    setCount((prev) => prev + 2);
  }, []);

  const handleIncrement3 = useCallback(() => {
    setCount((prev) => prev + 3);
  }, []);

  return (
    <div>
      <h3>Count: {count}</h3>
      <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
        Other State: {otherState}
      </p>

      <div className="mb-2">
        <button
          className="btn btn-primary"
          onClick={() => setOtherState(otherState + 1)}
        >
          Update Other State
        </button>
      </div>

      {/* FIXED: Stable function references */}
      <ExpensiveChild label="Button 1" onClick={handleIncrement1} />
      <ExpensiveChild label="Button 2" onClick={handleIncrement2} />
      <ExpensiveChild label="Button 3" onClick={handleIncrement3} />

      <p
        style={{
          marginTop: "1rem",
          fontSize: "0.9rem",
          color: "var(--success)",
        }}
      >
        ✅ Check console: Children don't re-render when "Other State" changes!
      </p>
    </div>
  );
}

export default Fixed;
