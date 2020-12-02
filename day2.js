const fileSystem = require('fs');

String.prototype.count = function(searched) {
    let replaced = this.toString();
    while (replaced.indexOf(searched) > -1) {
        replaced = replaced.replace(searched, "");
    }
    return this.length - replaced.length;
}

let input = fileSystem.readFileSync('input2.txt', 'utf-8');
let correct = 0;
let singleLines = input.split("\n");
console.log(singleLines);

for (let idx in singleLines) {
    let lines = singleLines[idx].split(":");
    let password = lines[1].trim();
    let policyParts = lines[0].split(" ");
    let character = policyParts[1].trim();
    let fromAndTo = policyParts[0].split("-")
        .map(number => parseInt(number));

    let matchedCount = password.count(character);
    if( matchedCount >= fromAndTo[0] && matchedCount <= fromAndTo[1]) {
        correct++;
    } else {
        console.log(matchedCount)
        console.log(matchedCount + " in " + fromAndTo[0]  + " - " + fromAndTo[1]);
    }
}

console.log(correct);