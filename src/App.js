import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Canvas from "./components/Canvas";

function App() {
  const max = 20;

  let table = [];
  for (var y = 0; y < max; y++) {
    let tmpRow = [];
    for (var x = 0; x < max; x++) {
      let random = Math.random();
      tmpRow.push(Math.round(random));
    }
    table.push(tmpRow);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Canvas table={table} />
      </header>
    </div>
  );
}

export default App;
