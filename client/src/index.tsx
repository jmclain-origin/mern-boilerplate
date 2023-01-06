import { createRoot } from 'react-dom/client';
import App from './App';
console.log(process.env.NODE_ENV);

const rootNode = document.getElementById('app');

if (rootNode) {
    createRoot(rootNode).render(<App />);
}
