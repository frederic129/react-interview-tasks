import React from 'react';
import { useState, useEffect } from "react";


function Fixed() {
  const [count, setCount] = useState(0);
  const [multiplier, setMultiplier] = useState(2);
  const [result, setResult] = useState(0);

  /* FIXED: Include all dependencies */
  useEffect(() => {
    const calculated = count * multiplier;
    setResult(calculated);
  }, [count, multiplier]); // Both dependencies included!

  return (
    <div>
      <h3>Calculator</h3>

      <div className="mb-2">
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Count: {count}
        </label>
        <input
          type="range"
          min="0"
          max="10"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </div>

      <div className="mb-2">
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Multiplier: {multiplier}
        </label>
        <input
          type="range"
          min="1"
          max="5"
          value={multiplier}
          onChange={(e) => setMultiplier(Number(e.target.value))}
          style={{ width: "100%" }}
        />
      </div>

      <div
        style={{
          background: "var(--bg-primary)",
          padding: "var(--spacing-md)",
          borderRadius: "var(--radius-md)",
          textAlign: "center",
        }}
      >
        <h2>
          {count} × {multiplier} = {result}
        </h2>
      </div>

      <p
        style={{
          marginTop: "1rem",
          fontSize: "0.9rem",
          color: "var(--success)",
        }}
      >
        ✅ Now result updates when either count or multiplier changes!
      </p>
    </div>
  );
}

export default Fixed;
