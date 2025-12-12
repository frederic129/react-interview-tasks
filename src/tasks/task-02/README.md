# Task 02: Closure Issue in Loops

## The Issue

When creating event handlers inside loops or using state values in callbacks, JavaScript closures can capture "stale" values. This means the callback references the value from when it was created, not the current value when it's executed.

## Why It Happens

### Understanding Closures

A closure is when a function "remembers" the variables from its outer scope, even after that scope has finished executing.

```jsx
function createCounter() {
  let count = 0;
  return function () {
    console.log(count); // Closure: remembers 'count'
  };
}
```

### The Problem in React

```jsx
// BUGGY
const [count, setCount] = useState(0);

const handleClick = () => {
  // This captures the current value of 'count'
  setTimeout(() => {
    console.log(count); // Will show old value!
  }, 1000);
};
```

When the function is created, it captures `count` at that moment. Even if `count` changes later, the closure still references the old value.

### In Loops

```jsx
// BUGGY
for (let i = 0; i < 3; i++) {
  buttons.push(
    <button
      onClick={() => {
        // Captures current 'count' and 'messages'
        setMessages([...messages, `Count: ${count}`]);
      }}
    >
      Button {i}
    </button>
  );
}
```

Each button's onClick captures:

- The value of `count` when the button was created
- The value of `messages` when the button was created

## How to Fix It

### Solution 1: Functional State Updates

Use the functional form of setState to always get the current state:

```jsx
// FIXED
onClick={() => {
  setMessages(prevMessages => [
    ...prevMessages,
    `Count: ${count}` // Still captures count, but messages is fresh
  ]);
}}
```

### Solution 2: Move Handler Outside Loop

Create the handler as a separate function that gets called with parameters:

```jsx
// FIXED
const handleButtonClick = (buttonNumber) => {
  setMessages((prevMessages) => [
    ...prevMessages,
    `Button ${buttonNumber}, Count: ${count}`,
  ]);
};

// In render:
{
  [1, 2, 3].map((num) => (
    <button onClick={() => handleButtonClick(num)}>Button {num}</button>
  ));
}
```

### Solution 3: Use useRef for Latest Value

For complex cases, store the latest value in a ref:

```jsx
const countRef = useRef(count);

useEffect(() => {
  countRef.current = count; // Always keep ref updated
}, [count]);

// In handler:
onClick={() => {
  console.log(countRef.current); // Always latest value
}}
```

## The Corrected Code

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  const [messages, setMessages] = useState([]);

  // Handler that uses current state
  const handleButtonClick = (buttonNumber) => {
    // Functional update ensures we get latest messages
    setMessages((prevMessages) => [
      ...prevMessages,
      `Button ${buttonNumber} clicked! Count: ${count}`,
    ]);
  };

  return (
    <div>
      <h3>Counter: {count}</h3>
      <button onClick={() => setCount(count + 1)}>Increment</button>

      {[1, 2, 3].map((num) => (
        <button key={num} onClick={() => handleButtonClick(num)}>
          Button {num}
        </button>
      ))}
    </div>
  );
}
```

## Key Takeaways

- **Closures capture values** from when they're created
- **State in closures can become stale** if not handled properly
- **Use functional updates** (`setState(prev => ...)`) to get current state
- **Move handlers outside loops** when possible
- **useRef can store latest values** that don't trigger re-renders
- **Be careful with async operations** (setTimeout, promises) - they always use closures

## Common Scenarios

### Async Operations

```jsx
// BUGGY
const handleClick = () => {
  setTimeout(() => {
    setCount(count + 1); // Uses stale count!
  }, 1000);
};

// FIXED
const handleClick = () => {
  setTimeout(() => {
    setCount((prev) => prev + 1); // Always uses current count
  }, 1000);
};
```

### Event Listeners

```jsx
// BUGGY
useEffect(() => {
  const handler = () => console.log(count); // Stale count
  window.addEventListener("click", handler);
  return () => window.removeEventListener("click", handler);
}, []); // Empty deps = stale closure

// FIXED
useEffect(() => {
  const handler = () => console.log(count); // Fresh count
  window.addEventListener("click", handler);
  return () => window.removeEventListener("click", handler);
}, [count]); // Re-create when count changes
```

## Further Reading

- [JavaScript Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [React: Closures and Hooks](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)
- [Stale Closures](https://dmitripavlutin.com/react-hooks-stale-closures/)
