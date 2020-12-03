const fileSystem = require('fs');

let input = fileSystem.readFileSync('input3.txt', 'utf-8');
let grid = input.split("\r\n").map(line => line.split(''))

let product = 1;
let jumps = [ 
    { xJump: 1, yJump: 1},
    { xJump: 3, yJump: 1},
    { xJump: 5, yJump: 1},
    { xJump: 7, yJump: 1},
    { xJump: 1, yJump: 2}
 ]

 jumps.forEach(jump => {
    let width = grid[0].length
    let x = 0; 
    let y = 0;
    let treeCount = 0;
    const xJump = jump.xJump;
    const yJump = jump.yJump;
    
    while (y + yJump < grid.length) {
        x += xJump
        y += yJump
        if (grid[y][x % width] === '#') {
            treeCount++;
        } 
    }
    
    product *= treeCount;
    console.log(treeCount);
});

console.log(product);
