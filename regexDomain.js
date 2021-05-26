const fs = require('fs');
const text = fs.readFileSync('test.txt', "utf8");
const input = require('readline').createInterface({
    input: process.stdin, 
    output: process.stdout
  }); 


// extracting emails into an emailArray
const textArray = text.split(/\s+/);
const emailArray = textArray.filter(function (word) {
    return word.match(/[\w+._]+@[\w]+.[\w.]+/);
}); 

// extracting domains into domainArray
const domainArray = emailArray.map(function(email) {
    let ampersandIndex = email.indexOf('@');
    return email.substring(ampersandIndex + 1);
});

// making a dictionary of domains and their respective frequencies
const domainFrequencyDictionary = {};
domainArray.forEach(function (domain) {
    if (domainFrequencyDictionary.hasOwnProperty(domain)) {
        domainFrequencyDictionary[domain]++;
    } else {
        domainFrequencyDictionary[domain] = 1;
    }
});

// sorting the domains by frequency
const dictionaryArr = Object.keys(domainFrequencyDictionary);
dictionaryArr.sort(function (domainA, domainB) {
   return domainFrequencyDictionary[domainB] - domainFrequencyDictionary[domainA];

});

// Obtaining a frequency dictionary of the high level domains using the existing dictionary.
const topDomainFrequencyDictionary = {};
dictionaryArr.forEach(function (domain) {
    let dotPosition = domain.indexOf('.');
    let currentTopDomain = domain.substring(0, dotPosition);
    if (topDomainFrequencyDictionary.hasOwnProperty(currentTopDomain)) {
        topDomainFrequencyDictionary[currentTopDomain] += domainFrequencyDictionary[domain];
    }
    else topDomainFrequencyDictionary[currentTopDomain] = domainFrequencyDictionary[domain];
})

console.log(topDomainFrequencyDictionary);

// printing top 10 domains
console.log(dictionaryArr.slice(0, 10));

// Making an array of just high level domains
const domainArrayTop = domainArray.map(function (domain) {
     let dotPosition = domain.indexOf('.');
     return domain.substring(0, dotPosition);
 });
//  console.log(domainArrayTop);

// making a dictionary of the frequency of the high level domains.
//const topLevelDictionary = {};


console.log(topDomainFrequencyDictionary);


// Asking the user to input frequency
  
let userFrequency;
input.question(`Please enter frequency: `, freq => {
    userFrequency = freq;

    user(userFrequency);
    input.close();
})

// Github is updated (wooo!)

// Printing the user specified domains 
function user(userFrequency) {
    let frequentDomains = dictionaryArr.filter(function (domain) {
        return domainFrequencyDictionary[domain] > userFrequency;

    })
    console.log('Domains that appear more often than ' + userFrequency + ' times are: ' + frequentDomains.join(', '));
}
