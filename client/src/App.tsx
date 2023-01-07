import { FC, useState } from 'react';

const App: FC = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h1>Hello World</h1>
            <h2>from React App</h2>
            <h3>Update the count and edit src/App.tsx, state is preserved</h3>
            <p>some stuff here</p>
            <button onClick={() => setCount((c) => c + 1)}>Count - {count}</button>
        </div>
    );
};

export default App;
