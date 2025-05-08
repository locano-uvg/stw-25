function Stopwatch() {
    // Segundos para le reloj
    const [seconds, setSeconds] = React.useState(0);
    // Estado para saber si el cronómetro está corriendo
    const [isRunning, setIsRunning] = React.useState(false);
    // Estado para guardar las sesiones
    const [sessions, setSessions] = React.useState([]);
    
    // Referencia para el intervalo para que no se pierda el estado
    const cambiodeSegundosRef = React.useRef(null);
  
    // Efecto para iniciar el cronómetro
    React.useEffect(() => {
        console.log("isRunning",isRunning);
        
        // validamos si esta corriendo el cronómetro
      if (isRunning) {
        // si esta corriendo, seteamos el intervalo
        cambiodeSegundosRef.current = setInterval(() => {
          setSeconds(prev => prev + 1);
        }, 1000);
      } else {
        clearInterval(cambiodeSegundosRef.current);
      };
    }, [isRunning]);
  
    const toggleStartPause = () => {
      setIsRunning(!isRunning);
    };
  
    const reset = () => {
      setIsRunning(false);
      setSeconds(0);
    };
  
    const saveSession = () => {
      if (seconds > 0) {
        setSessions([...sessions, seconds]);
      }
    };
  
    return (
      <div className="stopwatch-container">
        <h1 className="stopwatch-title">Cronómetro</h1>
        <div className="stopwatch-display">
          <h2>{seconds} segundos</h2>
        </div>
        <div className="stopwatch-controls">
          <button 
            className={`control-btn ${isRunning ? 'pause' : 'start'}`}
            onClick={toggleStartPause}
          >
            {isRunning ? "Pausar" : "Iniciar"}
          </button>
          <button 
            className="control-btn reset"
            onClick={reset}
          >
            Reiniciar
          </button>
          <button 
            className="control-btn save"
            onClick={saveSession}
          >
            Guardar sesión
          </button>
        </div>
  
        <div className="sessions-container">
          <h3>Sesiones guardadas:</h3>
          <ul className="sessions-list">
            {sessions.map((s, i) => (
              <li key={i} className="session-item">
                Sesión {i + 1}: {s} segundos
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<Stopwatch />);