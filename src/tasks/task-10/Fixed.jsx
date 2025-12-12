import React from 'react';
import { useState, useEffect } from "react";


function Fixed() {
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 100);
    }

    /* FIXED: Cleanup function */
    return () => {
      if (interval) {
        clearInterval(interval);
        console.log("Timer cleaned up!");
      }
    };
  }, [isRunning]);

  return (
    <div>
      <h3>Timer: {count}</h3>

      <div className="flex gap-1 mb-2">
        <button
          className="btn btn-primary"
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="btn btn-secondary" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>

      <p
        style={{
          marginTop: "1rem",
          fontSize: "0.9rem",
          color: "var(--success)",
        }}
      >
        ✅ Timer properly stops when you click Stop. No memory leaks!
      </p>
    </div>
  );
}

export default Fixed;
