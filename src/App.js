import React, { useState } from 'react';
import './App.css';
import Four from './Component/Four';

function App() {
  const [n, setN] = useState(4);
  const [element, setElement] = useState(null);

  const handleIncrement = () => {
    if (n < 9) {
      setN(n + 1);
    }
  };

  const handleDecrement = () => {
    if (n > 0) {
      setN(n - 1);
    }
  };

  return (
    <div>
      <div className="controls">
        <button className="controlBtn minusBtn" onClick={handleDecrement} disabled={n <= 0}>
          -
        </button>
        <span>{n}</span>
        <button className="controlBtn plusBtn" onClick={handleIncrement} disabled={n >= 9}>
          +
        </button>
      </div>
      <Four n={n} element={element} setElement={setElement}/>
    </div>
  );
}

export default App;
