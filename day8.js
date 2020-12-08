const fileSystem = require('fs');

let codeLines = fileSystem.readFileSync('input8.txt', 'utf-8')
    .split('\r\n');

console.log(findAccumulatorAtFirstLoop(codeLines));

let trial = 0
while (trial < codeLines.length) {
    let result = null;
    if (codeLines[trial].startsWith("jmp")) {
        let modifiedCode = [...codeLines]
        modifiedCode[trial] = modifiedCode[trial].replace("jmp", "nop")
        result = executeProgram(modifiedCode);
    } else if (codeLines[trial].startsWith("nop")) {
        let modifiedCode = [...codeLines]
        modifiedCode[trial] = modifiedCode[trial].replace("nop", "jmp")
        result = executeProgram(modifiedCode);
    }
    if (result != null) {
        console.log(result);
        return result;
    }
    trial++;
}

function executeProgram(code) {
    let occuredIndices = new Set();
    let accumulator = 0;
    let index = 0;
    while (index < code.length) {
        if (occuredIndices.has(index)) {
            return null;
        }
        occuredIndices.add(index);
        let instruction = code[index].split(' ');
        switch (instruction[0]) {
            case 'acc':
                accumulator += parseInt(instruction[1]);
            case 'nop':
                index++;
                break;
            case 'jmp':
                index += parseInt(instruction[1]);
        }
    }
    return accumulator;
}

function findAccumulatorAtFirstLoop(code) {
    let occuredIndices = new Set();
    let accumulator = 0;
    let index = 0;
    while (index < code.length) {
        if (occuredIndices.has(index)) {
            return accumulator;
        }
        occuredIndices.add(index);
        let instruction = code[index].split(' ');
        switch (instruction[0]) {
            case 'acc':
                accumulator += parseInt(instruction[1]);
            case 'nop':
                index++;
                break;
            case 'jmp':
                index += parseInt(instruction[1]);
                break;
        }
    }
}