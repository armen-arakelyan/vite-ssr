import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import ClientOnly from './ClientOnly.jsx';
import Counter from './Counter.jsx';

function App() {
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React SSR</h1>
      
      {/* Client-only component */}
      {typeof window !== 'undefined' && <ClientOnly>
        <Counter />
      </ClientOnly>}

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
