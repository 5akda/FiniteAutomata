import React from 'react';
import './App.css';
import testImg from './images/testImg.png'

function App() {
  return (
    <div>

      <div className="Layout-header">
        Finite Automata - Ticket Vending Machine
      </div>

      <div className="Layout-input">
        Input String:
        <input className="App-input" size="20"/>
        <button className="App-enterbutton">Enter</button>
        <button className="App-clearbutton">Clear</button>
      </div>

      <div className="Layout-body">
        <img src={testImg} alt="testImg" className="Test-img"/>
      </div>

    </div>
  );
}

export default App;
