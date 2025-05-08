function Counter() {
    const [count, setCount] = React.useState(0);

    return (
        <div className="counter">
            <h1>Contador React</h1>
            <div className="counter-display">
                <h2>{count}</h2>
            </div>
            <div className="counter-buttons">
                <button onClick={() => setCount(count - 1)}>-</button>
                <button onClick={() => setCount(count + 1)}>+</button>
            </div>
        </div>
    );
}

// Render the Counter component
ReactDOM.render(<Counter />, document.getElementById('root'));
