import React, { useState } from "react";

type Props = {};

const App = ({}: Props) => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Hello World!</h1>
      <h2>from react app</h2>
      <h3>Update the count and edit src/App.tsx, state is preserved</h3>
      <button onClick={() => setCount((c) => c + 1)}>Count - {count}</button>
    </div>
  );
};

export default App;
