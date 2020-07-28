import React, { useState, useEffect } from "react";
import "./Canvas.css";

let calculateNeighbours = (table, i, j) => {
  let neighbours = 0;

  if (i > 0 && j > 0) {
    neighbours += table[i - 1][j - 1];
  }
  if (i > 0) {
    neighbours += table[i - 1][j];
  }

  if (i > 0 && j < table[i - 1].length - 1) {
    neighbours += table[i - 1][j + 1];
  }

  if (j > 0) {
    neighbours += table[i][j - 1];
  }

  if (j < table[i].length - 1) {
    neighbours += table[i][j + 1];
  }

  if (i < table.length - 1 && j > 0) {
    neighbours += table[i + 1][j - 1];
  }
  if (i < table.length - 1) {
    neighbours += table[i + 1][j];
  }

  if (i < table.length - 1 && j < table[i + 1].length - 1) {
    neighbours += table[i + 1][j + 1];
  }

  //console.log(`${i}, ${j} ${neighbours}`);
  return neighbours;
};

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
      let neighbours = calculateNeighbours(initialTable, i, j);

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
  const [table, setTable] = useState(props.table);
  useEffect(() => {
    const interval = setInterval(
      () => calculateNextStepTable(table, setTable),
      1000
    );
    return () => {
      clearInterval(interval);
    };
  }, [table]);

  return (
    <div className="table">
      {table.map((y, y_index) => (
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
  );
};

export default Canvas;
