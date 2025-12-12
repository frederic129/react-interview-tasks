# Task 12: Async Race Condition

## The Issue

When making async requests based on changing state, responses can arrive out of order, causing stale data to overwrite fresh data.

## Why It Happens

```jsx
useEffect(() => {
  fetch(`/api/users/${userId}`).then((data) => setUserData(data)); // No cleanup!
}, [userId]);
```

**Scenario:**

1. User clicks userId=1 → Request A starts
2. User clicks userId=2 → Request B starts
3. Request B finishes → Shows user 2 ✓
4. Request A finishes → Shows user 1 ✗ (Wrong!)

## How to Fix It

### Solution 1: Cleanup Flag

```jsx
useEffect(() => {
  let cancelled = false;

  fetch(`/api/users/${userId}`).then((data) => {
    if (!cancelled) {
      setUserData(data);
    }
  });

  return () => {
    cancelled = true; // Ignore stale responses
  };
}, [userId]);
```

### Solution 2: AbortController

```jsx
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/users/${userId}`, {
    signal: controller.signal,
  })
    .then((data) => setUserData(data))
    .catch((err) => {
      if (err.name !== "AbortError") {
        // Handle real errors
      }
    });

  return () => {
    controller.abort(); // Cancel the request
  };
}, [userId]);
```

## Key Takeaways

- **Race conditions** happen with async operations
- **Use cleanup** to ignore stale responses
- **AbortController** can cancel requests
- **Always handle** component unmounting during async ops

## Further Reading

- [React Docs: Fetching Data](https://react.dev/learn/synchronizing-with-effects#fetching-data)
- [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)
- [Race Conditions in React](https://maxrozen.com/race-conditions-fetching-data-react-with-useeffect)
