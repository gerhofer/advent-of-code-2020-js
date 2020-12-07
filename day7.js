const fileSystem = require('fs');

let bagMap = new Map();
let input = fileSystem.readFileSync('input7.txt', 'utf-8')
    .split('\r\n')
    .map(line => line.split(" contain "))
    .forEach(pair => bagMap[pair[0].replace(" bags", "")] = pair[1].split(", ")
        .map(colorAndCount => {
            if (colorAndCount.includes("no other bags")) {
                return { count: 0, color: null }
            }
            let parts = colorAndCount.split(' ')
            return { count: parseInt(parts[0]), color: parts[1] + " " + parts[2] };
        })
    )

function sumInnerBags(bagColor) {
    let sum = 0;
    for (entry of bagMap[bagColor]) {
        console.log(entry.count);
        sum = sum + entry.count;
        if (entry.count > 0) {
            sum = sum + entry.count * sumInnerBags(entry.color);
        }
    }
    return sum;
}

console.log("sum", sumInnerBags('shiny gold'))