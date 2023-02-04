import { createRoot } from 'react-dom/client';
import App from './App';
import './main.css';

const rootNode = document.getElementById('app');

if (rootNode) {
    createRoot(rootNode).render(<App />);
}
