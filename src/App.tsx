import React from 'react';
import logo from './logo.svg';
import './App.css';

import Line3DChart from './shared/Line3DChart';

function App() {
  return (
    <div className="App">
      <div className='logo'>Palantir</div>

      <div style={{ width: "100%", maxWidth: "100vw", overflowX: "auto" }}>
        <Line3DChart />
      </div>
    </div>
  );
}

export default App;
