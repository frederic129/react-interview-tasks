# Task 11: Event Handler Binding Issue

## The Issue

Calling a function immediately instead of passing a reference causes it to execute on render, not on click.

## Why It Happens

```jsx
// WRONG: Calls function immediately
<button onClick={handleClick(param)}>Click</button>

// Function executes during render, returns undefined
// onClick receives undefined, not a function
```

## How to Fix It

### Use Arrow Function

```jsx
// CORRECT: Pass a function that calls your handler
<button onClick={() => handleClick(param)}>Click</button>
```

### Or Bind

```jsx
// CORRECT: Bind the parameter
<button onClick={handleClick.bind(null, param)}>Click</button>
```

### Or Curry

```jsx
// CORRECT: Return a function
const handleClick = (param) => () => {
  // Handle click
};

<button onClick={handleClick(param)}>Click</button>;
```

## Key Takeaways

- **onClick expects a function**, not a function call
- **Use arrow functions** to pass parameters
- **Common mistake**: `onClick={func()}` vs `onClick={func}`
- **Remember**: `()` executes immediately

## Further Reading

- [React Docs: Responding to Events](https://react.dev/learn/responding-to-events)
- [Event Handling in React](https://react.dev/learn/responding-to-events#passing-event-handlers-as-props)
