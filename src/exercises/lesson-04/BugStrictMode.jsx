// TOPIC: StrictMode Effects and Cleanup
// TASK: Notice how the count increments incorrectly based on the `setInterval` logic. Fix the useEffect so that the counter increments correctly.

import { useEffect, useState } from 'react';

export default function BugStrictMode() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <h2>Timer</h2>
      <p>Count: {count}</p>
    </div>
  );
}

// StrictMode mounts the component twice in development, so the effect runs twice.
// The cleanup function ensures that the previous interval is cleared before setting up a new one,
// preventing multiple intervals from running simultaneously and causing the count to increment incorrectly.
