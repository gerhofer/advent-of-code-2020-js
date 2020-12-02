const fileSystem = require('fs');

String.prototype.count = function (searched) {
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

    if (password.charAt(fromAndTo[0] - 1) === character && character !== password.charAt(fromAndTo[1] - 1) ||
        password.charAt(fromAndTo[0] - 1) !== character && character === password.charAt(fromAndTo[1] - 1)) {
        correct++;
    }
}

console.log(correct);