// 1. Crear el contexto
const ThemeContext = React.createContext();

// 2. Componente principal
function App() {
  const [theme, setTheme] = React.useState("light");

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div style={{
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
        height: "100vh",
        padding: "20px"
      }}>
        <h1>Aplicación con ThemeContext</h1>
        <ThemeDisplay />
        <ThemeToggle />
      </div>
    </ThemeContext.Provider>
  );
}

// 3. Componente para mostrar el tema actual
function ThemeDisplay() {
  const { theme } = React.useContext(ThemeContext);

  return <h2>El tema actual es: {theme === "light" ? "Claro ☀️" : "Oscuro 🌙"}</h2>;
}

// 4. Componente para cambiar el tema
function ThemeToggle() {
  const { toggleTheme } = React.useContext(ThemeContext);

  return <button onClick={toggleTheme}>Cambiar Tema</button>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);