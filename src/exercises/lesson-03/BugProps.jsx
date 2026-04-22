// src/exercises/lesson-03/BugProps.jsx

/*
  BUG #3 — Props Not Updating

  This component displays a message based on a prop and includes
  a button that should change that message.

  Right now, the message is being stored in a way that React does not track,
  so the UI does not update when the value changes.

  Use the commented "Explanation" section at the bottom of this lesson's components.
*/

import { useState } from 'react';

export default function BugProps({ name = 'friend' }) {
  const [message, setMessage] = useState('Hello, ' + name);

  function handleChange() {
    setMessage('Hi, ' + name + '!');
  }

  return (
    <div>
      <p>{message}</p>
      <button onClick={handleChange}>Change Greeting</button>
    </div>
  );
}

// Explanation:
// `message` was a plain local variable, so reassigning it in handleChange
// had no effect on the UI — React only re-renders when something it tracks
// (state or props) changes. Every render also reset the variable back to
// its initial value. Moving the message into useState makes React aware of
// it: calling setMessage queues a re-render with the new value, so the
// updated greeting actually appears on the screen.
