const container = document.getElementById("container");
const sizesAllowed = [...Array(10).keys()].map((m) => m + 1).map((m) => m * m);

const numberOfItems = 4;
const borderStyle = "2px solid #000";
const groups = [];
let selected = "";

function validateGrid() {
    // TO DO
}

function removeSomeItems() {
    const childNodes = document.getElementById("sodoku").childNodes;
    for (const node of childNodes) {
        const p = Math.random() * 100;
        if (p < 35) {
            node.innerText = "";
        } else {
            node.style.pointerEvents = "none";
        }
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function pickElementFromList(cells, numberOfItems, stack) {
    let least = numberOfItems * numberOfItems;
    let item = null;
    let numbers = [];
    for (const cell of cells) {
        const elements = [
            ...findXYElements(cell.id, numberOfItems),
            ...groups[cell.getAttribute("group")],
        ].filter((f) => f.id !== cell.id && f.innerText === "");
        if (elements.length < least) {
            least = elements.length;
            item = cell;
        }
    }

    if (item) {
        const elements = [
            ...findXYElements(item.id, numberOfItems),
            ...groups[item.getAttribute("group")],
        ]
            .filter((f) => f && f !== "")
            .map((m) => m.innerText)
            .filter((f) => f && f !== "" && f !== "undefined");

        for (let index = 1; index <= numberOfItems; index++) {
            if (!elements.includes("" + index)) {
                numbers.push(index);
            }
        }
    }

    if (item) {
        let allVisited = false;
        const itemStack = stack.find((f) => f.item.id === item.id);
        if (itemStack) {
            for (let visit of itemStack.visited) {
                if (numbers.includes(visit)) {
                    allVisited = true;
                } else {
                    allVisited = false;
                }
            }
        }
        if (allVisited) {
            numbers = [];
        }
    }

    return [item, numbers];
}

function goBack(cell, number, numberOfItems, stack, retry) {
    if (checkIfFinnished()) {
        return;
    }
    const lastElement = stack.pop().item;
    if (lastElement) {
        retry = 0;
        const numbers = [];
        for (let index = 1; index <= numberOfItems; index++) {
            if (index !== parseInt(lastElement.innerText)) {
                numbers.push(index);
            }
        }

        lastElement.innerText = "";

        const randomNumber =
            numbers[(0, randomIntFromInterval(1, numbers.length) - 1)];
        return backtracking(lastElement, randomNumber, numberOfItems, stack, retry);
    }
}

function checkIfFinnished() {
    const emptyCells = getAllCells().filter((f) => f.innerText === "");
    if (emptyCells.length === 0) {
        return validateGrid() || true;
    }
    return false;
}

function backtracking(cell, number, numberOfItems, stack, retry) {
    if (checkIfFinnished()) {
        return;
    }
    if (!cell) {
        const randomCell =
            emptyCells[randomIntFromInterval(0, emptyCells.length - 1)];
        const randomNumber = randomIntFromInterval(1, numberOfItems);
        return backtracking(randomCell, randomNumber, numberOfItems, stack, retry);
    }
    const elements = [
        ...findXYElements(cell.id, numberOfItems),
        ...groups[cell.getAttribute("group")],
    ].filter((f) => f.id !== cell.id);

    const elementsExistsOnOtherCells = elements
        .map((f) => f.innerText)
        .filter((f) => f == number);
    if (elementsExistsOnOtherCells.length === 0) {
        cell.innerText = number;
        if (!stack.find((f) => f.id == cell.id)) {
            stack.push({
                item: cell,
                visited: [number],
            });
        }

        const filterFilteredElements = elements.filter((f) => f.innerText === "");
        const [randomPickFromList, numbers] = pickElementFromList(
            filterFilteredElements,
            numberOfItems,
            stack
        );
        const randomNumber = numbers[randomIntFromInterval(1, numbers.length) - 1];
        if (!randomNumber) {
            return goBack(cell, retry, numberOfItems, stack, retry);
        }
        return backtracking(
            randomPickFromList,
            randomNumber || 0,
            numberOfItems,
            stack,
            retry
        );
    } else {
        const stackCell = stack.find((f) => f.item.id === cell.id);
        if (retry < numberOfItems) {
            retry = retry + 1;
            if (stackCell && !stackCell.visited.includes(retry)) {
                return backtracking(cell, retry, numberOfItems, stack, retry);
            }
        } else {
            return goBack(cell, retry, numberOfItems, stack, retry);
        }

        return goBack(cell, retry, numberOfItems, stack, retry);
    }
}

function getAllCells() {
    const nodes = [];
    const childNodes = document.getElementById("sodoku").childNodes;
    for (const node of childNodes) {
        if (node.innerText === "") {
            nodes.push(node);
        }
    }

    return nodes;
}

function generateRandomCell(numberOfItems) {
    const randomRow = randomIntFromInterval(1, numberOfItems);
    const randomCol = randomIntFromInterval(1, numberOfItems);

    const randomCell = document.getElementById(`${randomRow}-${randomCol}`);
    return randomCell;
}

function generateSolvedPuzzle(numberOfItems) {
    const randomCell = generateRandomCell(numberOfItems);
    const randomNumber = randomIntFromInterval(1, numberOfItems);
    const stack = [
        {
            item: randomCell,
            visited: [],
        },
    ];
    const retry = 0;
    backtracking(randomCell, randomNumber, numberOfItems, stack, retry);
}

function generateNumbers() {
    // TO DO Implement
}

function checkSolution() {
    // TO DO Implement
}

function numberClick(event) {
    if (selected) {
        const number = event.target.innerText;
        document.getElementById(selected).innerText = number;
    }
}

function createNumbers() {
    const containerNumbers = document.createElement("div");
    containerNumbers.id = "numbers";
    containerNumbers.classList.add("numbers");

    for (let k = 1; k <= numberOfItems; k++) {
        const number = document.createElement("span");
        number.addEventListener("click", numberClick);
        number.classList.add("number");
        number.innerText = k;

        containerNumbers.appendChild(number);
    }
    container.appendChild(containerNumbers);
}

function findGroupElement(groupNumber, elementNumber) {
    const element = groups[groupNumber][elementNumber - 1];
    const row = element.getAttribute("row");
    const col = element.getAttribute("col");
    const group = element.getAttribute("group");
    const item = element.getAttribute("item");

    return `${row}-${item}`;
}

function clearAllHover() {
    const elements = document.getElementById("sodoku").childNodes;
    for (const element of elements) {
        if (element.classList.contains("hover")) {
            element.classList.remove("hover");
        }
        if (element.classList.contains("hint")) {
            element.classList.remove("hint");
        }
    }
}

function itemOnHover(id, numberOfItems) {
    clearAllHover();
    document.getElementById(id).classList.add("hover");
    const elements = findXYElements(id, numberOfItems);
    for (const element of elements) {
        element.classList.add("hint");
    }
}

function findXYElements(id, numberOfItems) {
    if (!id) {
        debugger;
    }
    const [row, col] = id.split("-");
    const elements = [];
    for (let r = 1; r <= numberOfItems; r++) {
        const el = document.getElementById(`${row}-${r}`);
        elements.push(el);
    }
    for (let c = 1; c <= numberOfItems; c++) {
        const el = document.getElementById(`${c}-${col}`);
        elements.push(el);
    }

    return elements;
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
            itemEl.innerText = ``;
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
                    itemEl.addEventListener("click", (e) => {
                        selected = e.target.id;
                        itemOnHover(e.target.id, numberOfItems);
                    });
                    itemEl.innerText = "";
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

createGrid(numberOfItems);
createNumbers();
generateSolvedPuzzle(numberOfItems);
removeSomeItems();
