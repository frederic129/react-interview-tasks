# Task 07: Conditional Rendering Bug

## The Issue

When using `&&` for conditional rendering in React, the number `0` is treated as falsy in JavaScript but still renders as text in JSX, causing unexpected "0" to appear on the page.

## Why It Happens

### JavaScript Falsy Values

In JavaScript, these values are falsy:

- `false`
- `0`
- `""` (empty string)
- `null`
- `undefined`
- `NaN`

### The Problem with `&&`

```jsx
// BUGGY
{
  count && <span>({count} in stock)</span>;
}
```

When `count` is `0`:

- JavaScript evaluates `0 && <span>...</span>` as `0` (falsy)
- But React renders `0` as text!
- Result: You see "0" on the page instead of nothing

**Why?** React renders:

- `false`, `null`, `undefined` → nothing
- `0` → the number "0" as text

## How to Fix It

### Solution 1: Explicit Boolean Comparison

```jsx
// FIXED
{
  count > 0 && <span>({count} in stock)</span>;
}
```

Now when `count` is `0`:

- `0 > 0` evaluates to `false`
- React renders nothing ✅

### Solution 2: Use Ternary Operator

```jsx
// FIXED
{
  count ? <span>({count} in stock)</span> : null;
}
```

### Solution 3: Convert to Boolean

```jsx
// FIXED
{
  Boolean(count) && <span>({count} in stock)</span>;
}
{
  !!count && <span>({count} in stock)</span>;
}
```

### Solution 4: Handle 0 Explicitly

```jsx
// FIXED
{
  count > 0 && <span>({count} in stock)</span>;
}
{
  count === 0 && <span>(Out of stock)</span>;
}
```

## The Corrected Code

```jsx
function Inventory() {
  const [items, setItems] = useState([
    { id: 1, name: "Apples", count: 5 },
    { id: 2, name: "Bananas", count: 0 },
  ]);

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <strong>{item.name}</strong>
          {/* FIXED: Use explicit comparison */}
          {item.count > 0 && <span>({item.count} in stock)</span>}
          {/* FIXED: Handle 0 case explicitly */}
          {item.count === 0 && <span>(Out of stock)</span>}
        </li>
      ))}
    </ul>
  );
}
```

## Common Scenarios

### Array Length

```jsx
// ❌ WRONG - shows "0" when array is empty
{
  items.length && <div>You have {items.length} items</div>;
}

// ✅ CORRECT
{
  items.length > 0 && <div>You have {items.length} items</div>;
}
```

### Counters

```jsx
// ❌ WRONG - shows "0" when count is 0
{
  count && <span>Count: {count}</span>;
}

// ✅ CORRECT
{
  count > 0 && <span>Count: {count}</span>;
}
```

### Optional Values

```jsx
// ❌ WRONG - might show "0"
{
  value && <div>{value}</div>;
}

// ✅ CORRECT
{
  value != null && <div>{value}</div>;
}
{
  value !== undefined && value !== null && <div>{value}</div>;
}
```

## Key Takeaways

- **`0` renders as text** in React, unlike `false`, `null`, or `undefined`
- **Use explicit comparisons** like `count > 0` instead of just `count`
- **`&&` operator** returns the left side if falsy, right side if truthy
- **React renders** `0`, `"0"`, and other "falsy but renderable" values
- **Be careful** with array lengths, counters, and numeric values

## Best Practices

1. **Always use explicit boolean checks** for numbers
2. **Use ternary** when you need both true and false cases
3. **Test edge cases** like 0, empty arrays, empty strings
4. **Consider using** helper functions for complex conditions

## Further Reading

- [React Docs: Conditional Rendering](https://react.dev/learn/conditional-rendering)
- [JavaScript Falsy Values](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)
- [Common React Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
