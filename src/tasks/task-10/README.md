# Task 10: Incorrect Unmount Cleanup

## The Issue

Failing to clean up side effects (timers, subscriptions, event listeners) causes memory leaks and unexpected behavior.

## Why It Happens

```jsx
useEffect(() => {
  const interval = setInterval(() => {
    // ...
  }, 1000);
  // Missing cleanup!
}, []);
```

When the component unmounts or effect re-runs, the interval keeps running.

## How to Fix It

### Return Cleanup Function

```jsx
useEffect(() => {
  const interval = setInterval(() => {
    // ...
  }, 1000);

  return () => {
    clearInterval(interval); // Cleanup!
  };
}, []);
```

## What Needs Cleanup

- **Timers**: `setInterval`, `setTimeout`
- **Event listeners**: `addEventListener`
- **Subscriptions**: WebSocket, Firebase, etc.
- **Async operations**: Fetch with AbortController

## Key Takeaways

- **Always cleanup** side effects
- **Return function** from useEffect
- **Runs on**: unmount and before re-running effect
- **Prevents**: memory leaks and bugs

## Further Reading

- [React Docs: useEffect Cleanup](https://react.dev/reference/react/useEffect#cleaning-up-side-effects)
- [Memory Leaks in React](https://felixgerschau.com/react-memory-leaks-useeffect-hook/)
