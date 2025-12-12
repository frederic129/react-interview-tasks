import React from "react";
import { useState } from "react";

function Fixed() {
  const [count, setCount] = useState(0);
  const [messages, setMessages] = useState([]);

  // Better solution: Create handler that always uses current state
  const handleButtonClick = (buttonNumber) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      `Button ${buttonNumber} clicked! Count: ${count}`,
    ]);
  };

  return (
    <div>
      <h3>Counter: {count}</h3>
      <button
        className="btn btn-success mb-2"
        onClick={() => setCount(count + 1)}
      >
        Increment Counter
      </button>

      <div className="mb-2">
        <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
          Click buttons below after incrementing:
        </p>
        {[1, 2, 3].map((num) => (
          <button
            key={num}
            className="btn btn-primary"
            onClick={() => handleButtonClick(num)}
            style={{ margin: "0.25rem" }}
          >
            Button {num}
          </button>
        ))}
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
        <strong>Messages:</strong>
        {messages.length === 0 ? (
          <p style={{ color: "var(--text-muted)" }}>No messages yet</p>
        ) : (
          <ul style={{ listStyle: "none", marginTop: "0.5rem" }}>
            {messages.map((msg, idx) => (
              <li
                key={idx}
                style={{ padding: "0.25rem 0", fontSize: "0.9rem" }}
              >
                {msg}
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
        ✅ Now buttons always show the current count value!
      </p>
    </div>
  );
}

export default Fixed;
