const fileSystem = require('fs');

let REQUIRED_FIELDS = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
let input = fileSystem.readFileSync('input4.txt', 'utf-8');
let passports = input.split('\r\n\r\n').map(line =>  
        line.split(RegExp('\\s+')).reduce(function(map, keyAndValueString) {
            let keyAndValue = keyAndValueString.split(':');
            map[keyAndValue[0]] = keyAndValue[1];
            return map;
        }, {})
    )

let partOne = passports.filter( passport => 
    REQUIRED_FIELDS.every(requiredField => Object.keys(passport).includes(requiredField))
).length;
console.log(partOne);

let partTwo = passports.filter( passport =>
    REQUIRED_FIELDS.every(requiredField => Object.keys(passport).includes(requiredField)) &&
    birthYearValid(passport) && issueYearValid(passport) && expirationYearValid(passport) &&
    heightValid(passport) && eyeColorValid(passport) && hairColorValid(passport) && passportIdValid(passport)
).length;
console.log(partTwo);

function birthYearValid(passport) {
    return passport['byr'] >= 1920 && passport['byr'] <= 2002;
}

function issueYearValid(passport) {
    return passport['iyr'] >= 2010 && passport['iyr'] <= 2020;
}

function expirationYearValid(passport) {
    return passport['eyr'] >= 2020 && passport['eyr'] <= 2030;
}

function heightValid(passport) {
    if (passport['hgt'].endsWith('cm')) {
        let centimeters = passport['hgt'].replace('cm', '');
        return centimeters >= 150 && centimeters <= 193;
    } else if (passport['hgt'].endsWith('in')) {
        let inch = passport['hgt'].replace('in', '');
        return inch >= 59 && inch <= 76;
    } else {
        return false
    }
}

function eyeColorValid(passport) {
    return ['amb', 'blu', 'brn', 'gry' ,'grn', 'hzl', 'oth'].includes(passport['ecl']);
}

function hairColorValid(passport) {
    return passport['hcl'].match(/^#[a-f0-9]{6}$/) != null;
}

function passportIdValid(passport) {
    return passport['pid'].match(/^[0-9]{9}$/) != null;
}