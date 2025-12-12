# Task 09: Expensive Computation

## The Issue

Expensive calculations run on every render, even when their inputs haven't changed, causing performance problems.

## Why It Happens

```jsx
const result = expensiveCalculation(input); // Runs every render!
```

React re-runs all code in the component body on every render.

## How to Fix It

### Use useMemo

```jsx
const result = useMemo(() => {
  return expensiveCalculation(input);
}, [input]); // Only recalculate when input changes
```

## When to Use useMemo

- **Expensive calculations**: Fibonacci, sorting large arrays, complex filtering
- **Referential equality**: When passing objects/arrays to memoized components
- **Don't overuse**: Premature optimization is the root of all evil

## Key Takeaways

- **useMemo** caches computed values
- **Only recalculates** when dependencies change
- **Use for**: expensive operations, not simple calculations
- **Profile first**: Measure before optimizing

## Further Reading

- [React Docs: useMemo](https://react.dev/reference/react/useMemo)
- [When to useMemo](https://kentcdodds.com/blog/usememo-and-usecallback)
