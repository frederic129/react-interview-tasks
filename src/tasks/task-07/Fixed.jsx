import React from "react";
import { useState } from "react";

function Fixed() {
  const [items, setItems] = useState([
    { id: 1, name: "Apples", count: 5 },
    { id: 2, name: "Bananas", count: 0 },
    { id: 3, name: "Oranges", count: 3 },
  ]);

  const decrementItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id && item.count > 0
          ? { ...item, count: item.count - 1 }
          : item
      )
    );
  };

  return (
    <div>
      <h3>Inventory</h3>

      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className="list-item">
            <div>
              <strong>{item.name}</strong>
              {item.count > 0 && (
                <span style={{ marginLeft: "10px", color: "var(--primary)" }}>
                  {" "}
                  {/* FIXED: Use item.count > 0 instead of just item.count */}(
                  {item.count} in stock)
                </span>
              )}
              {item.count === 0 && (
                <span style={{ marginLeft: "10px", color: "var(--error)" }}>
                  {" "}
                  {/* FIXED: Explicitly handle 0 case */}
                  (Out of stock)
                </span>
              )}
            </div>
            <button
              className="btn btn-secondary"
              onClick={() => decrementItem(item.id)}
              disabled={item.count === 0}
              style={{ padding: "0.5rem 1rem" }}
            >
              Sell One
            </button>
          </li>
        ))}
      </ul>

      <p
        style={{
          marginTop: "1rem",
          fontSize: "0.9rem",
          color: "var(--success)",
        }}
      >
        ✅ Now 0 is handled correctly - shows "Out of stock" instead of
        rendering "0"!
      </p>
    </div>
  );
}

export default Fixed;
