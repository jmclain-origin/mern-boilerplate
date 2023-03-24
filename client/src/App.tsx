import { FC, useState } from 'react';
import './app.styles.css';

const App: FC = () => {
    const [count, setCount] = useState(0);
    return (
        <div>
            <h1 className="text-3xl">Hello World</h1>
            <h2 className="text-red-400">from React App</h2>
            <h3>Update the count and edit src/App.tsx, state is preserved</h3>
            <h3>Update the count and edit src/App.tsx, state is preserved</h3>
            <h3>Update the count and edit src/App.tsx, state is preserved</h3>
            <h3>Update the count and edit src/App.tsx, state is preserved</h3>
            <p>webpack serve</p>
            <p>webpack serve</p>
            <button onClick={() => setCount((c) => c + 1)}>Count - {count}</button>
        </div>
    );
};

export default App;
