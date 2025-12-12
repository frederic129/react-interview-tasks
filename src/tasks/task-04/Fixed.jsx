import React from 'react';
import { useState } from "react";


function Fixed() {
  const [count, setCount] = useState(0);
  const [log, setLog] = useState([]);

  const incrementThreeTimes = () => {
    /* FIXED: Use functional updates to get current state */
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    // Now correctly adds 3!
  };

  const delayedIncrement = () => {
    setTimeout(() => {
      /* FIXED: Functional update always uses latest state */
      setCount((prev) => {
        const newCount = prev + 1;
        setLog((prevLog) => [...prevLog, `Incremented to ${newCount}`]);
        return newCount;
      });
    }, 1000);
  };

  return (
    <div>
      <h3>Count: {count}</h3>

      <div className="flex flex-col gap-1 mb-2">
        <button className="btn btn-primary" onClick={incrementThreeTimes}>
          Increment 3 Times (Fixed)
        </button>

        <button className="btn btn-secondary" onClick={delayedIncrement}>
          Delayed Increment (1s)
        </button>

        <button
          className="btn btn-success"
          onClick={() => {
            setCount(0);
            setLog([]);
          }}
        >
          Reset
        </button>
      </div>

      <div
        style={{
          background: "var(--bg-primary)",
          padding: "var(--spacing-sm)",
          borderRadius: "var(--radius-md)",
          maxHeight: "150px",
          overflowY: "auto",
        }}
      >
        <strong>Log:</strong>
        {log.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            No logs yet
          </p>
        ) : (
          <ul style={{ listStyle: "none", marginTop: "0.5rem" }}>
            {log.map((entry, idx) => (
              <li
                key={idx}
                style={{ fontSize: "0.9rem", padding: "0.25rem 0" }}
              >
                {entry}
              </li>
            ))}
          </ul>
        )}
      </div>

      <p
        style={{
          marginTop: "1rem",
          fontSize: "0.9rem",
          color: "var(--success)",
        }}
      >
        ✅ Now correctly increments by 3 and handles delayed updates!
      </p>
    </div>
  );
}

export default Fixed;
