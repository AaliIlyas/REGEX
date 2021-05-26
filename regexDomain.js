const fs = require('fs');
const text = fs.readFileSync('test.txt', "utf8");

const input = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
}); 

let userFrequency;
input.question(`Please enter frequency:`, freq => {
    userFrequency = freq;

    user(userFrequency)
    input.close()
  })


// extracting emails into an textArray2
const textArray = text.split(/\s+/);

const emailArray = textArray.filter(function (word) {
    return word.match(/[\w+._]+@[\w]+.[\w.]+/);

}); 

// extracting domains into domainArray
const domainArray = emailArray.map(function(email) {
    let ampersandIndex = email.indexOf('@');
    return email.substring(ampersandIndex + 1);
});




// making the dictionary of domains
let dictionary = {};
domainArray.forEach(function (domain) {
    if (dictionary.hasOwnProperty(domain)) {
        dictionary[domain]++;
    } else {
        dictionary[domain] = 1;
    }
})

// Making an array of just high level domains
let domainArray2 = domainArray.map(function (domain) {
    let dotPosition = domain.indexOf('.');
    return domain.substring(0, dotPosition);
});

// making a dictionary of the frequency of the high level domains.
let dictionary2 = {};
domainArray2.forEach(function (domain) {
    if (dictionary2.hasOwnProperty(domain)) {
        dictionary2[domain]++;
    } else {
        dictionary2[domain] = 1;
    }
})

console.log(dictionary2);

// sorting the domains by frequency
let dictionaryArr = Object.keys(dictionary);
dictionaryArr.sort(function (domainA, domainB) {
   return dictionary[domainB] - dictionary[domainA];

});
// printing top 10 domanins
console.log(dictionaryArr.slice(0, 10));

function user(userFrequency) {
    let frequentDomains = dictionaryArr.filter(function (domain) {
        return dictionary[domain] > userFrequency

    })
    console.log('Domains that appear more often than ' + userFrequency + ' times are: ' + frequentDomains.join(', '));
}

//printing the library of domains
console.log(dictionary);



// regex to obtain all domains: @something
// find index of appearance of "@"
// remove all characters before it
// document the rest in an object