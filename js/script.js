const container = document.getElementById("container");
const sizesAllowed = [4, 9];

const borderStyle = "2px solid #000";
const groups = [];

function findGroupElement(groupNumber, elementNumber, numberOfItems) {
  numberOfItems = Math.sqrt(numberOfItems);

  // numberOfItems - 2
  // group - 4
  // element - 2
  // result 3-4

  const row = 1;
  const col = 1;

  return `${row}-${col}`;
}

findGroupElement(4, 3, 4);

function createGrid(numberOfItems) {
  if (!sizesAllowed.includes(numberOfItems)) {
    numberOfItems = 4;
  }

  const sodokuCol = new Array(numberOfItems)
    .fill("minmax(50px, 70px)")
    .join(" ");
  const sodokuRow = new Array(numberOfItems)
    .fill("minmax(50px, 70px)")
    .join(" ");

  const sodoku = document.createElement("div");
  sodoku.style.gridTemplateColumns = sodokuCol;
  sodoku.style.gridTemplateRows = sodokuRow;
  sodoku.id = "sodoku";

  for (let row = 1; row <= numberOfItems; row++) {
    for (let col = 1; col <= numberOfItems; col++) {
      const itemEl = document.createElement("div");
      itemEl.id = `${row}-${col}`;
      itemEl.classList.add("item");
      itemEl.setAttribute("row", row);
      itemEl.setAttribute("col", col);
      itemEl.innerText = `${row}-${col}`;
      sodoku.appendChild(itemEl);
    }
  }

  container.appendChild(sodoku);

  let group = 1;
  const p = Math.sqrt(numberOfItems);
  for (let r = 0; r < numberOfItems; r += p) {
    for (let c = 0; c < numberOfItems; c += p) {
      let item = 1;
      for (let row = 1; row <= p; row++) {
        for (let col = 1; col <= p; col++) {
          const itemEl = document.getElementById(`${row + r}-${col + c}`);
          itemEl.innerText = `${item}`;
          itemEl.setAttribute("group", group);
          item = item + 1;

          if (col == 1) {
            itemEl.style.borderLeft = borderStyle;
          }
          if (col == p) {
            itemEl.style.borderRight = borderStyle;
          }
          if (row == 1) {
            itemEl.style.borderTop = borderStyle;
          }
          if (row == p) {
            itemEl.style.borderBottom = borderStyle;
          }
        }
      }
      group = group + 1;
    }
  }
}

createGrid(4);
