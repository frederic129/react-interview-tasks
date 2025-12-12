# Task 03: Reference Type Mutation Bug

## The Issue

Directly mutating arrays and objects in React state prevents React from detecting changes, causing the UI to not update. This happens because React uses shallow comparison to detect state changes.

## Why It Happens

### JavaScript Reference Types

In JavaScript, arrays and objects are reference types:

```jsx
const arr1 = [1, 2, 3];
const arr2 = arr1;
arr2.push(4);

console.log(arr1); // [1, 2, 3, 4] - Both changed!
console.log(arr1 === arr2); // true - Same reference
```

### React's Shallow Comparison

React compares state using `Object.is()` (similar to `===`):

```jsx
const [todos, setTodos] = useState([...]);

// BUGGY: Mutates the same array
todos.push(newTodo);
setTodos(todos); // React sees: old todos === new todos → No update!

// FIXED: Creates new array
setTodos([...todos, newTodo]); // React sees: old !== new → Update!
```

### Why Shallow Comparison?

React uses shallow comparison for performance:

- Deep comparison (checking every nested property) is expensive
- Immutable updates are fast to compare (just check reference)
- Encourages better state management patterns

## Common Mutation Mistakes

### Arrays

```jsx
// ❌ WRONG - These mutate the array
state.push(item);           // Adds to end
state.pop();                // Removes from end
state.shift();              // Removes from start
state.unshift(item);        // Adds to start
state.splice(index, 1);     // Removes at index
state.sort();               // Sorts in place
state.reverse();            // Reverses in place
state[index] = newValue;    // Updates at index

// ✅ CORRECT - These create new arrays
[...state, item]            // Add to end
state.slice(0, -1)          // Remove from end
state.slice(1)              // Remove from start
[item, ...state]            // Add to start
state.filter((_, i) => i !== index)  // Remove at index
[...state].sort()           // Sort (copy first)
[...state].reverse()        // Reverse (copy first)
state.map((item, i) => i === index ? newValue : item)  // Update
```

### Objects

```jsx
// ❌ WRONG - These mutate the object
state.property = newValue;
delete state.property;
Object.assign(state, updates);

// ✅ CORRECT - These create new objects
{ ...state, property: newValue }
const { property, ...rest } = state; // rest is new object
{ ...state, ...updates }
```

### Nested Structures

```jsx
// ❌ WRONG - Shallow copy, but nested object is still mutated
const newState = { ...state };
newState.user.name = "New Name"; // Mutates nested object!

// ✅ CORRECT - Deep immutable update
const newState = {
  ...state,
  user: {
    ...state.user,
    name: "New Name",
  },
};
```

## How to Fix It

### Use Immutable Update Patterns

```jsx
// Adding to array
setTodos([...todos, newTodo]);
setTodos(todos.concat(newTodo));

// Removing from array
setTodos(todos.filter((todo) => todo.id !== id));

// Updating in array
setTodos(
  todos.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  )
);

// Updating object
setUser({ ...user, name: "New Name" });

// Updating nested object
setState({
  ...state,
  user: {
    ...state.user,
    address: {
      ...state.user.address,
      city: "New City",
    },
  },
});
```

### Use Immer (for complex state)

For deeply nested state, consider using Immer:

```jsx
import { useImmer } from "use-immer";

const [state, setState] = useImmer(initialState);

// Can write "mutating" code - Immer handles immutability
setState((draft) => {
  draft.user.address.city = "New City";
});
```

## The Corrected Code

```jsx
function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    // ✅ Create new array
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  const toggleTodo = (id) => {
    // ✅ Create new array with updated object
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  const removeTodo = (id) => {
    // ✅ Create new array without the item
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (/* ... */);
}
```

## Key Takeaways

- **Never mutate state directly** - always create new references
- **React uses shallow comparison** to detect changes
- **Use spread operator** (`...`) to create copies
- **Array methods matter**: `map`, `filter`, `concat` create new arrays; `push`, `splice`, `sort` mutate
- **For nested updates**, spread at each level
- **Consider Immer** for complex nested state
- **This applies to props too** - never mutate props

## Performance Note

Creating new objects/arrays is fast! JavaScript engines optimize this well. The performance benefit of shallow comparison far outweighs the cost of creating new references.

## Further Reading

- [React Docs: Updating Objects in State](https://react.dev/learn/updating-objects-in-state)
- [React Docs: Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)
- [Immer Library](https://immerjs.github.io/immer/)
