import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Canvas from "./components/Canvas";

function App() {
  const max = 64;

  let table = [];
  for (var i = 0; i < max; i++) {
    let tmpRow = [];
    for (var j = 0; j < max; j++) {
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
