//src/exercises/lesson-03/BugEffectLoop.jsx

/* 
  BUG #1 — Effect Issue 

  This component uses useState and useEffect to update a value.
  The effect is running on every render, which causes the
  component to behave incorrectly.
  */

import { useEffect, useState } from 'react';

export default function BugEffectLoop() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(count + 1);
  }, []);

  return <p>Bug 1 Count: {count}</p>;
}

// Explanation:
// The useEffect was missing a dependency array, so it ran after every render.
// Because the effect called setCount, each run scheduled another render, which
// triggered the effect again — an infinite update loop. Adding an empty
// dependency array ([]) tells React to run the effect only once, right after
// the component mounts, which is the "runs on first appearance" behavior we want.
