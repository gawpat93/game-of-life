import React from "react";
import "./App.css";
import Canvas from "./components/Canvas";
import { generate2dArray } from "./tools";

function App() {
  return (
    <div className="App">
      <Canvas table={generate2dArray(64, 64)} />
    </div>
  );
}

export default App;
