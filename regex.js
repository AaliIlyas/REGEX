const fs = require('fs');
const text = fs.readFileSync('test.txt', "utf8");

let textArray = text.split(/\s+/);


const filteredText = textArray.filter(function (word) {
    return word.includes("@softwire.com")
}
)
//  /[ ,]+/

// /\n/g, " " 
console.log(filteredText);