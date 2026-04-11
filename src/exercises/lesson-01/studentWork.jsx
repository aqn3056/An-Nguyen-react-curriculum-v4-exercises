//Lesson-01 Introduction to React
//Exercise: Build an "About Me" Component in this file

export default function StudentWork() {
  const name = 'An Nguyen';
  const age = 21;
  const hobbies = ['Reading', 'Gaming', 'Coding', 'Fishing'];

  return (
    <div>
      <h1>About Me</h1>
      <p>
        Hi! My name is {name} and I am {age} years old.
      </p>
      <h2>My Hobbies</h2>
      <ul>
        {hobbies.map((hobby, index) => (
          <li key={index}>{hobby}</li>
        ))}
      </ul>
    </div>
  );
}
