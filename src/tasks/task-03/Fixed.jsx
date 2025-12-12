import React from 'react';
import { useState } from "react";


function Fixed() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a project", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (!newTodo.trim()) return;

    /* FIXED: Create new array with spread operator */
    setTodos([
      ...todos,
      {
        id: Date.now(),
        text: newTodo,
        completed: false,
      },
    ]);
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    /* FIXED: Create new array with map, new object with spread */
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    /* FIXED: Create new array with filter */
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h3>Todo List</h3>

      <div className="flex gap-1 mb-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo..."
          onKeyPress={(e) => e.key === "Enter" && addTodo()}
        />
        <button className="btn btn-primary" onClick={addTodo}>
          Add
        </button>
      </div>

      <ul className="item-list">
        {todos.map((todo) => (
          <li key={todo.id} className="list-item">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span
                style={{
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed
                    ? "var(--text-muted)"
                    : "var(--text-primary)",
                }}
              >
                {todo.text}
              </span>
            </div>
            <button
              className="btn btn-danger"
              onClick={() => removeTodo(todo.id)}
              style={{ padding: "0.5rem 1rem" }}
            >
              Delete
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
        ✅ Now all operations work correctly with immutable updates!
      </p>
    </div>
  );
}

export default Fixed;
