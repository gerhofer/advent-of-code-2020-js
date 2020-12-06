const fileSystem = require('fs');

let uniqueSum = fileSystem.readFileSync('input6.txt', 'utf-8')
    .split('\r\n\r\n')
    .map(groups => new Set(groups
        .split('\n') // [ ['a', 'b', 'c'], ['a', 'b']]
        //[ 'a', 'b', 'c', 'a', 'b']
        .flatMap(person => person.split('')
            .filter(answer => answer !== '' && answer !== '\r')
        )
    ).size // [ 3, 1, 1, 3]
    ).reduce((a, b) => a + b, 0);

console.log(uniqueSum);


let allSum = fileSystem.readFileSync('input6.txt', 'utf-8')
    .split('\r\n\r\n')
    .map(groups => groups
        .split('\n')
        .map(person => new Set(person.split('')
            .filter(answer => answer !== '' && answer !== '\r'))
        )
        .reduce((a, b) => new Set([...a].filter(x => b.has(x))))
        .size
    )
    .reduce((a, b) => a + b, 0);

console.log(allSum);
