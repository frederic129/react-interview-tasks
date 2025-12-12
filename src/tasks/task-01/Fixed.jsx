import React from 'react';
import { useState } from "react";

function Fixed() {
  const [items, setItems] = useState([
    { id: 1, name: "Apple", quantity: 5 },
    { id: 2, name: "Banana", quantity: 3 },
    { id: 3, name: "Orange", quantity: 7 },
  ]);

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: "New Item",
      quantity: 1,
    };
    setItems([newItem, ...items]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const shuffleItems = () => {
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    setItems(shuffled);
  };

  const updateQuantity = (id, newQuantity) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div>
      <h3>Inventory Manager</h3>
      <div className="flex gap-1 mb-2">
        <button className="btn btn-primary" onClick={addItem}>
          Add Item
        </button>
        <button className="btn btn-secondary" onClick={shuffleItems}>
          Shuffle
        </button>
      </div>

      <ul className="item-list">
        {items.map((item) => (
          <li key={item.id} className="list-item">
            {" "}
            {/* FIXED: Using unique item.id as key */}
            <div>
              <strong>{item.name}</strong>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) =>
                  updateQuantity(item.id, parseInt(e.target.value) || 0)
                }
                style={{ width: "60px", marginLeft: "10px" }}
              />
            </div>
            <button
              className="btn btn-danger"
              onClick={() => removeItem(item.id)}
              style={{ padding: "0.5rem 1rem" }}
            >
              Remove
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
        ✅ Now input values correctly follow their items when shuffled!
      </p>
    </div>
  );
}

export default Fixed;
