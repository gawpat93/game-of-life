export const generate2dArray = (maxX, maxY, customValue) => {
  let table = [];
  for (var i = 0; i < maxX; i++) {
    let tmpRow = [];
    for (var j = 0; j < maxY; j++) {
      if (customValue === undefined) {
        let random = Math.random();
        tmpRow.push(Math.round(random));
      } else {
        tmpRow.push(customValue);
      }
    }
    table.push(tmpRow);
  }

  return table;
};

export const calculateNeighboursSum = (table, i, j) => {
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

  return neighbours;
};
