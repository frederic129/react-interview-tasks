import React from 'react';
import { useState, useEffect } from "react";


function Fixed() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  /* FIXED: Only depend on 'count', use functional update for 'data' */
  useEffect(() => {
    console.log("Effect running for count:", count);
    // Use functional update to avoid depending on 'data'
    setData((prevData) => [...prevData, count]);
  }, [count]); // Only re-run when count changes!

  const reset = () => {
    setCount(0);
    setData([]);
  };

  return (
    <div>
      <h3>Counter: {count}</h3>
      <div className="flex gap-1 mb-2">
        <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
          Increment
        </button>
        <button className="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>

      <div
        style={{
          background: "var(--bg-primary)",
          padding: "var(--spacing-sm)",
          borderRadius: "var(--radius-md)",
          maxHeight: "200px",
          overflowY: "auto",
        }}
      >
        <strong>Data Array:</strong>
        <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
          [{data.join(", ")}]
        </p>
        <p style={{ fontSize: "0.9rem", color: "var(--text-muted)" }}>
          {data.length} items
        </p>
      </div>

      <p
        style={{
          marginTop: "1rem",
          fontSize: "0.9rem",
          color: "var(--success)",
        }}
      >
        ✅ Effect only runs when count changes - no infinite loop!
      </p>
    </div>
  );
}

export default Fixed;
