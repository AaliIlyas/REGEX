const fs = require('fs');
const text = fs.readFileSync('test.txt', "utf8");

let textArray = text.split(/\s+/);
let re = /@softwire.com/;
let textArray2 = textArray.filter(function (word) {
    return word.match(/@softwire.com$/);

}); 

console.log(textArray2.length);

