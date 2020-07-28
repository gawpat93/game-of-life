import React, { useState, useEffect } from "react";
import "./Canvas.css";

const Canvas = (props) => {
  const [time, setTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  let table = props.table;
  //Any live cell with two or three live neighbours survives.
  //Any dead cell with three live neighbours becomes a live cell.
  //All other live cells die in the next generation. Similarly, all other dead cells stay dead.

  for (var y = 0; y < table.length; y++) {
    for (var x = 0; x < table[y].length; x++) {}
  }
  return (
    <div className="table">
      {table.map((y, y_index) => (
        <div className="row">
          {y.map((x, x_index) => (
            <div
              row={y_index}
              column={x_index}
              className={x === 1 ? "coll alive" : "coll"}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Canvas;
