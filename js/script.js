const container = document.getElementById("container");
const sizesAllowed = [4, 9];

const groups = [];

function createGrid(numberOfItems) {
  if (!sizesAllowed.includes(numberOfItems)) {
    numberOfItems = 4;
  }

  const sodokuCol = new Array(numberOfItems).fill("minmax(50px, 70px)").join(" ");
  const sodokuRow = new Array(numberOfItems).fill("minmax(50px, 70px)").join(" ");

  const sodoku = document.createElement("div");
  sodoku.style.gridTemplateColumns = sodokuCol;
  sodoku.style.gridTemplateRows = sodokuRow;
  sodoku.id = "sodoku";

  const groupCount = 4;

  for (let row = 1; row <= groupCount; row++) {
    for (let col = 1; col <= groupCount; col++) {

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
}

createGrid(4);
