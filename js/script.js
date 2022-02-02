const container = document.getElementById("container");
const sizesAllowed = [4, 9, 16, 25, 36, 49, 64, 81, 100];

const borderStyle = "2px solid #000";
const groups = [];

function findGroupElement(groupNumber, elementNumber) {
  const element = groups[groupNumber][elementNumber - 1];
  const row = element.getAttribute("row");
  const col = element.getAttribute("col");
  const group = element.getAttribute("group");
  const item = element.getAttribute("item");

  return `${row}-${item}`;
}

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
      groups[group] = [];
      for (let row = 1; row <= p; row++) {
        for (let col = 1; col <= p; col++) {
          const itemEl = document.getElementById(`${row + r}-${col + c}`);
          itemEl.innerText = `${item}`;
          itemEl.setAttribute("group", group);
          itemEl.setAttribute("item", item);
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
          groups[group].push(itemEl);
        }
      }
      group = group + 1;
    }
  }
}

createGrid(9);