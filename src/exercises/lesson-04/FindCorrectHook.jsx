// TOPIC: Choose the correct tool: useRef vs useState
// TASK: Make sure it updates the text *without* triggering a re-render
import { useState } from 'react';

export default function FindCorrectHook() {
  // useState is the right choice here because the displayed click count must
  // re-render when it changes. useRef would persist the value but would not
  // trigger React to update the UI.
  const [clickCount, setClickCount] = useState(0);

  function handleClick() {
    setClickCount((c) => c + 1);
  }

  return (
    <div>
      <h2>Click Counter</h2>
      <button onClick={handleClick}>{clickCount} Clicks</button>
    </div>
  );
}
