# Task 01: Missing Key Attribute

## The Issue

When rendering lists in React without proper `key` attributes (or using array indices as keys), React cannot correctly track which items have changed, been added, or been removed. This causes:

- **Lost component state** when list order changes
- **Incorrect re-rendering** behavior
- **Performance issues** due to unnecessary DOM updates
- **Input values** staying with the wrong items

## Why It Happens

### React's Reconciliation Algorithm

React uses a "reconciliation" algorithm to determine what changes need to be made to the DOM. When rendering a list:

1. React compares the new list with the previous list
2. It uses the `key` prop to match elements between renders
3. Without proper keys, React relies on element position in the array

### The Problem with Index as Key

```jsx
// BUGGY
{
  items.map((item, index) => (
    <li key={index}>
      {" "}
      {/* ❌ Using index */}
      <input value={item.quantity} />
    </li>
  ));
}
```

When you shuffle or reorder items:

- The index stays the same (0, 1, 2...)
- React thinks the items haven't moved
- But the data has changed positions
- Input state stays at the old position!

**Example:**

```
Before shuffle:
  index 0: Apple (input: 5)
  index 1: Banana (input: 3)

After shuffle:
  index 0: Banana (but input still shows 5!)
  index 1: Apple (but input still shows 3!)
```

## How to Fix It

### Use Unique, Stable IDs

```jsx
// FIXED
{
  items.map((item) => (
    <li key={item.id}>
      {" "}
      {/* ✅ Using unique ID */}
      <input value={item.quantity} />
    </li>
  ));
}
```

### Best Practices for Keys

1. **Use unique IDs from your data**

   ```jsx
   key={item.id}  // Database ID, UUID, etc.
   ```

2. **Generate stable IDs if needed**

   ```jsx
   const itemsWithIds = items.map((item, index) => ({
     ...item,
     id: item.id || `item-${index}-${item.name}`,
   }));
   ```

3. **Never use random values**

   ```jsx
   key={Math.random()}  // ❌ Creates new key every render!
   ```

4. **Index is OK only if:**
   - List never reorders
   - List never filters
   - List items have no state
   - List is static

## The Corrected Code

```jsx
function InventoryManager() {
  const [items, setItems] = useState([
    { id: 1, name: "Apple", quantity: 5 },
    { id: 2, name: "Banana", quantity: 3 },
  ]);

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          {" "}
          {/* ✅ Unique, stable key */}
          <strong>{item.name}</strong>
          <input
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, e.target.value)}
          />
        </li>
      ))}
    </ul>
  );
}
```

## Key Takeaways

- **Keys help React identify which items have changed**
- **Use unique, stable identifiers** (like database IDs)
- **Avoid using array index** when list can change
- **Never use random values** as keys
- **Keys must be unique among siblings** (not globally)
- **Keys should be stable** across re-renders

## Further Reading

- [React Docs: Lists and Keys](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key)
- [Why React needs keys](https://react.dev/learn/rendering-lists#why-does-react-need-keys)
- [Index as key is an anti-pattern](https://robinpokorny.com/blog/index-as-a-key-is-an-anti-pattern/)
