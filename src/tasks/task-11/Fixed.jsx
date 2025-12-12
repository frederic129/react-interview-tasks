import React from 'react';
import { useState } from "react";


function Fixed() {
  const [items, setItems] = useState(["Apple", "Banana", "Cherry"]);
  const [log, setLog] = useState([]);

  const handleClick = (item) => {
    setLog((prev) => [...prev, `Clicked: ${item}`]);
  };

  return (
    <div>
      <h3>Fruit List</h3>

      <div className="mb-2">
        {items.map((item, index) => (
          <button
            key={index}
            className="btn btn-primary"
            style={{ margin: "0.25rem" }}
            /* FIXED: Arrow function to delay execution */
            onClick={() => handleClick(item)}
          >
            {item}
          </button>
        ))}
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
        <strong>Click Log:</strong>
        {log.length === 0 ? (
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            No clicks yet
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
        ✅ Buttons work correctly! Functions execute only when clicked.
      </p>
    </div>
  );
}

export default Fixed;
