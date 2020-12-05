const fileSystem = require('fs');

let seatIds = fileSystem.readFileSync('input5.txt', 'utf-8')
    .split("\r\n")
    .map(line => getRow(line) * 8 + getCol(line));

let max = Math.max(...seatIds)
let min = Math.min(...seatIds)

for (i = min + 1; i < max; i++) {
    if (!seatIds.includes(i)) {
        console.log(i)
    }
}

function getRow(binarySeat) {
    let minRow = 0;
    let maxRow = 127;
    let rowDefinition = binarySeat.replace(/[LR]*/, "");

    for (rowJump of rowDefinition) {
        if (rowJump === 'F') {
            maxRow = minRow + Math.floor((maxRow - minRow)/2.0);
        } else if (rowJump === 'B') {
            minRow = minRow + Math.ceil((maxRow - minRow)/2.0);
        }
    }

    return minRow;
}

function getCol(binarySeat) {
    let colDefinition = binarySeat.replace(/[FB]*/, "");
    let minCol = 0;
    let maxCol = 7;

    for (colJump of colDefinition) {
        if (colJump === 'L') {
            maxCol = minCol + Math.floor((maxCol - minCol)/2.0);
        } else if (colJump === 'R') {
            minCol = minCol + Math.ceil((maxCol - minCol)/2.0);
        }
    }

    return minCol;
}