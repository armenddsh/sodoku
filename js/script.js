const container = document.getElementById("container");
const sizesAllowed = [4, 9];

function createLayoutGrid(numberOfItems) {
    if (!sizesAllowed.includes(numberOfItems)) {
        numberOfItems = 4;
    }

    const col = new Array(Math.sqrt(numberOfItems)).fill("1fr").join(" ");
    const row = new Array(Math.sqrt(numberOfItems)).fill("1fr").join(" ");

    const sodoku = document.createElement("div");
    sodoku.style.gridTemplateColumns = col;
    sodoku.style.gridTemplateRows = row;
    sodoku.id = "sodoku";

    // group
    for (let group = 0; group < numberOfItems; group++) {
        const groupEl = document.createElement("div");

        const col = new Array(Math.sqrt(numberOfItems)).fill("minmax(10px, 50px)").join(" ");
        const row = new Array(Math.sqrt(numberOfItems)).fill("minmax(10px, 50px)").join(" ");

        groupEl.style.gridTemplateColumns = col;
        groupEl.style.gridTemplateRows = row;

        groupEl.classList.add("group");
        groupEl.setAttribute("group", group);

        // items inside group
        for (let item = 0; item < numberOfItems; item++) {
            const itemEl = document.createElement("div");

            const col = new Array(Math.sqrt(numberOfItems)).fill("1fr").join(" ");
            const row = new Array(Math.sqrt(numberOfItems)).fill("1fr").join(" ");

            itemEl.style.gridTemplateColumns = col;
            itemEl.style.gridTemplateRows = row;

            itemEl.classList.add("item");
            itemEl.setAttribute("group", group);
            itemEl.setAttribute("item", item);
            itemEl.setAttribute("value", item);

            itemEl.innerText = `G${group}${item}`;
            groupEl.appendChild(itemEl);
        }

        sodoku.appendChild(groupEl);
    }

    container.appendChild(sodoku);
}

createLayoutGrid(9);
