import { createRoot } from 'react-dom/client';
import App from './App';
console.log(process.env.NODE_ENV, process.env.TEST, process.env.REACT_APP_TEST);
const rootNode = document.getElementById('app');

if (rootNode) {
    createRoot(rootNode).render(<App />);
}
