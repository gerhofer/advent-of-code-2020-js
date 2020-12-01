const readline = require('readline');
const fileSystem = require('fs');

let input = fileSystem.readFileSync('input1.txt', 'utf-8');
let numbers = input.split("\n")
.map(it => parseInt(it));

for (let i = 0; i < input.length; i++) {
    for (let j = i; j < input.length; j++) {
        for (let k = j; k < input.length; k++) {
            if (numbers[i] + numbers[j] + numbers[k] === 2020) {
                console.log(numbers[i] +  ' & ' + numbers[j] + ' & ' + numbers[k]);
                console.log(numbers[i]*numbers[j]*numbers[k]);
            }
        }
    }
}

