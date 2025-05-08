import { createRoot } from 'react-dom/client';
import Componente1 from './Componente1.js';
// Crea un nuevo root
const root = createRoot(document.getElementById('root'));
// Renderiza el componente App
root.render(<Componente1 />);