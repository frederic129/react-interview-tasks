# Task 06: useEffect Infinite Loop

## The Issue

An infinite loop occurs when `useEffect` updates state that's included in its dependency array, causing the effect to run again, update state again, and so on forever.

## Why It Happens

```jsx
// BUGGY
useEffect(() => {
  setData([...data, newItem]); // Updates 'data'
}, [data]); // Depends on 'data' → infinite loop!
```

**The cycle:**

1. Effect runs
2. Updates `data`
3. `data` changed → effect runs again
4. Updates `data` again
5. Repeat forever...

## How to Fix It

### Solution 1: Use Functional Updates

```jsx
// FIXED
useEffect(() => {
  setData((prev) => [...prev, newItem]); // Don't depend on data
}, [newItem]); // Only depend on what triggers the update
```

### Solution 2: Remove from Dependencies (if safe)

```jsx
// FIXED
useEffect(() => {
  if (shouldUpdate) {
    setData([...data, newItem]);
  }
}, [shouldUpdate, newItem]); // Don't include 'data'
// Use functional update inside: setData(prev => [...prev, newItem])
```

### Solution 3: Add Condition

```jsx
// FIXED
useEffect(() => {
  if (!data.includes(count)) {
    // Only update if needed
    setData([...data, count]);
  }
}, [data, count]);
```

## Key Takeaways

- **Never update state that's in the dependency array** without a condition
- **Use functional updates** to avoid depending on the state you're updating
- **Add conditions** to prevent unnecessary updates
- **Watch the console** for infinite loop warnings

## Further Reading

- [React Docs: useEffect](https://react.dev/reference/react/useEffect)
- [Infinite Loops in useEffect](https://dmitripavlutin.com/react-useeffect-infinite-loop/)
