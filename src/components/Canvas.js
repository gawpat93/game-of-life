import React, { useState, useEffect } from "react";
import "./Canvas.css";
import { Button } from "@material-ui/core";
import { calculateNeighboursSum, generate2dArray } from "../tools";
import { Line } from "react-chartjs-2";

let calculateNextStepTable = (table, setTable) => {
  let initialTable = table;
  //Any live cell with two or three live neighbours survives.
  //Any dead cell with three live neighbours becomes a live cell.
  //All other live cells die in the next generation. Similarly, all other dead cells stay dead.
  let tmp = [];
  for (var i = 0; i < initialTable.length; i++) {
    let row = [];
    for (var j = 0; j < initialTable[i].length; j++) {
      let alive = initialTable[i][j] === 1;
      let neighbours = calculateNeighboursSum(initialTable, i, j);

      if (alive) {
        if (neighbours < 2 || neighbours > 3) {
          alive = false;
        }
      } else {
        if (neighbours === 3) {
          alive = true;
        }
      }
      row.push(alive ? 1 : 0);
    }
    tmp.push(row);
  }
  setTable(tmp);
};

const Canvas = (props) => {
  const [state, setState] = useState({
    table: props.table,
    step: 0,
    start: false,
    aliveHistory: [],
  });
  let alive = state.table.reduce((a, b) => a.concat(b)).reduce((a, b) => a + b);

  useEffect(() => {
    let aliveHistory = state.aliveHistory;
    if (state.step !== 0) {
      aliveHistory.push(alive);
    }
    const interval = setInterval(
      () =>
        state.start &&
        calculateNextStepTable(state.table, (table) =>
          setState({
            ...state,
            table: table,
            step: state.step + 1,
            aliveHistory,
          })
        ),
      1000 * 0.6
    );
    return () => {
      clearInterval(interval);
    };
  });

  const resetSimulation = () => {
    setState({
      step: 0,
      start: false,
      table: generate2dArray(64, 64),
      aliveHistory: [],
    });
  };
  const data = {
    labels: Array.from(
      Array(
        state.aliveHistory.length > 0 ? state.aliveHistory.length : 1
      ).keys()
    ),
    datasets: [
      {
        label: "Alive",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
        borderWidth: 2,
        data: state.aliveHistory.length > 0 ? state.aliveHistory : [alive],
      },
    ],
  };

  return (
    <div>
      <div className="canvas">
        <div className="table">
          {state.table.map((y, y_index) => (
            <div className="row" key={y_index}>
              {y.map((x, x_index) => (
                <div
                  className={x === 1 ? "coll alive" : "coll"}
                  key={x_index}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="menu">
        <div className="App-title">Game of Life</div>
        <div>Step: {state.step}</div>
        <div>Alive: {alive}</div>
        <Button
          color="secondary"
          onClick={() => setState({ ...state, start: !state.start })}
        >
          {state.start ? "stop" : "Start"}
        </Button>
        <Button color="secondary" onClick={resetSimulation}>
          Reset
        </Button>
        <Line
          data={data}
          options={{
            title: {
              display: true,
              text: "Alive history",
              fontSize: 20,
            },
            legend: {
              display: false,
            },
            scales: {
              yAxes: [
                {
                  stacked: true,
                },
              ],
            },
          }}
        />
      </div>
    </div>
  );
};

export default Canvas;
