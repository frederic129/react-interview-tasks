# Task 04: Stale State in useState

## The Issue

When you read state values directly in event handlers or async operations, you might be reading a "stale" (outdated) value. This is especially problematic when:

- Making multiple rapid state updates
- Using state in setTimeout/setInterval
- Using state in async operations

## Why It Happens

### State Batching and Closures

React batches state updates for performance. When you call `setState` multiple times:

```jsx
const [count, setCount] = useState(0);

// All three read count = 0
setCount(count + 1); // 0 + 1 = 1
setCount(count + 1); // 0 + 1 = 1
setCount(count + 1); // 0 + 1 = 1
// Final result: 1 (not 3!)
```

Each call captures the current value of `count` (which is 0), so all three updates set it to 1.

### In Async Operations

```jsx
const handleClick = () => {
  setTimeout(() => {
    setCount(count + 1); // Uses count from when setTimeout was called
  }, 1000);
};
```

If `count` changes between when `setTimeout` is called and when it executes, you're working with stale data.

## How to Fix It

### Use Functional Updates

The functional form of `setState` receives the current state as an argument:

```jsx
// FIXED
setCount((prev) => prev + 1); // prev is always the latest value
setCount((prev) => prev + 1);
setCount((prev) => prev + 1);
// Final result: 3 ✅
```

### How It Works

React queues these updates and applies them in order:

1. Initial state: `count = 0`
2. First update: `prev = 0`, returns `0 + 1 = 1`
3. Second update: `prev = 1`, returns `1 + 1 = 2`
4. Third update: `prev = 2`, returns `2 + 1 = 3`
5. Final state: `count = 3`

### In Async Operations

```jsx
// FIXED
setTimeout(() => {
  setCount((prev) => prev + 1); // Always uses latest count
}, 1000);
```

## Common Scenarios

### Multiple Updates

```jsx
// ❌ WRONG
const increment = () => {
  setCount(count + 1);
  setCount(count + 1);
  setCount(count + 1);
}; // Only increments by 1

// ✅ CORRECT
const increment = () => {
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
  setCount((prev) => prev + 1);
}; // Increments by 3
```

### Timers

```jsx
// ❌ WRONG
useEffect(() => {
  const interval = setInterval(() => {
    setCount(count + 1); // Stale count
  }, 1000);
  return () => clearInterval(interval);
}, []); // Empty deps = count never updates

// ✅ CORRECT
useEffect(() => {
  const interval = setInterval(() => {
    setCount((prev) => prev + 1); // Always latest
  }, 1000);
  return () => clearInterval(interval);
}, []); // Can keep empty deps now
```

### Async API Calls

```jsx
// ❌ WRONG
const fetchData = async () => {
  const data = await api.get("/data");
  setItems([...items, ...data]); // items might be stale
};

// ✅ CORRECT
const fetchData = async () => {
  const data = await api.get("/data");
  setItems((prev) => [...prev, ...data]); // Always current items
};
```

### Updating Multiple Related States

```jsx
// When updating one state based on another
const addToCart = (item) => {
  setCart((prevCart) => [...prevCart, item]);
  setTotal((prevTotal) => prevTotal + item.price);
};
```

## The Corrected Code

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  const incrementThreeTimes = () => {
    // Use functional updates
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
    setCount((prev) => prev + 1);
  };

  const delayedIncrement = () => {
    setTimeout(() => {
      // Functional update ensures latest value
      setCount((prev) => prev + 1);
    }, 1000);
  };

  return (
    <div>
      <h3>Count: {count}</h3>
      <button onClick={incrementThreeTimes}>+3</button>
      <button onClick={delayedIncrement}>Delayed +1</button>
    </div>
  );
}
```

## Key Takeaways

- **Use functional updates** when new state depends on old state
- **Functional form**: `setState(prev => newValue)` always gets latest state
- **Direct form**: `setState(newValue)` uses captured value (can be stale)
- **Essential for**: multiple updates, timers, async operations
- **React batches updates** for performance
- **Closures capture values** - functional updates solve this

## When to Use Each Form

### Direct Form (Simple Value)

```jsx
setName("John"); // Setting to a specific value
setIsOpen(false); // Setting to a specific value
setItems([]); // Resetting to empty
```

### Functional Form (Based on Previous)

```jsx
setCount((prev) => prev + 1); // Based on previous
setItems((prev) => [...prev, newItem]); // Based on previous
setUser((prev) => ({ ...prev, name })); // Based on previous
```

## Further Reading

- [React Docs: State as a Snapshot](https://react.dev/learn/state-as-a-snapshot)
- [React Docs: Queueing State Updates](https://react.dev/learn/queueing-a-series-of-state-updates)
- [Understanding setState](https://css-tricks.com/understanding-react-setstate/)
