# Task 08: Re-render Performance Issue (Inline Functions)

## The Issue

Creating inline functions in JSX causes child components to re-render unnecessarily, even when memoized with `React.memo`, because each render creates a new function reference.

## Why It Happens

```jsx
// New function created every render
<Child onClick={() => doSomething()} />
```

Even if `Child` is wrapped in `React.memo`, it re-renders because the `onClick` prop is a new function reference each time.

## How to Fix It

### Use useCallback

```jsx
const handleClick = useCallback(() => {
  doSomething();
}, []); // Stable reference

<Child onClick={handleClick} />;
```

## Key Takeaways

- **Inline functions** create new references every render
- **useCallback** memoizes functions
- **Only matters** when passing to memoized components
- **Don't overuse**: Only optimize when needed

## Further Reading

- [React Docs: useCallback](https://react.dev/reference/react/useCallback)
- [When to useMemo and useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)
