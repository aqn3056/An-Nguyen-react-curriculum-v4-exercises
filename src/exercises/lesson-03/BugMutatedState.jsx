// src/exercises/lesson-03/BugMutatedState.jsx

/*
  BUG #2 — State Issue

  This component displays a count and updates it when the button is clicked.
  However, the way the count is being changed causes the component to behave
  incorrectly.
*/

import { useState } from 'react';
export default function BugMutatedState() {
  const [count, setCount] = useState(0);

  function handleAdd() {
    setCount(count + 1);
  }

  return (
    <div>
      <p>Bug 2 Count: {count}</p>
      <button onClick={handleAdd}>Add 1</button>
    </div>
  );
}

// Explanation:
// The original code used `count++`, which mutates the local variable in place
// before calling setCount. React state should be treated as immutable: you
// compute a new value and hand it to the setter (setCount(count + 1)) so
// React can compare the new value to the old and decide to re-render.
// Mutating the existing value sidesteps that contract and leads to
// unreliable updates, especially with objects and arrays.
