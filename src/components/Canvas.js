import React from "react";

const Canvas = () => {
  let list = [
    [0, 0, 1],
    [0, 1, 0],
    [0, 0, 0],
  ];
  return (
    <div className="canvas">
      {list.map((y, y_index) =>
        y.map((x, x_index) => (
          <div row={y_index} column={x_index}>
            {x}
          </div>
        ))
      )}
    </div>
  );
};

export default Canvas;
