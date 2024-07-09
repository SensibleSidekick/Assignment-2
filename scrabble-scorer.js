// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

function transform(obj) {
   let keys = Object.keys(obj);
   let letters;
   let structure = {};
 
  for ( let key in obj) { 
    letters = obj[key];
    letters = letters.join('').toLowerCase().split(''); 

    while (letters.length !== 0) { 
      structure[letters.splice(0,1)] = Number(keys[0]);
      }
    keys.shift(); 
   } 
   return structure; 
}; 

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z'],
 };
 
 const newPointStructure = transform(oldPointStructure);
 

let simpleScorer = function (word){
   userScore = word.length;
   console.log(`Your score for '${word}' is ${userScore}`);
   return userScore;
};


let vowelBonusScorer = function(word){
   let vowels =  ['A', 'E', 'I', 'O', 'U'];
   let consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
   let letterPoints = 0;
   let wordCheck = word.toUpperCase();
 
    for (i = 0; i < word.length; i++) {
      if (vowels.includes(wordCheck[i])) {
         letterPoints = letterPoints + 3;
      } else if (consonants.includes(wordCheck[i])) {
         letterPoints = letterPoints + 1; 
      } else { 
        return console.log (`\nError: Invalid input. Please try again.`);
      }
    }
    
    console.log(`Your score for '${word}' is ${letterPoints}`);
    return letterPoints;
};

function scrabbleScorer(word) {
	let wordCheck = word.toLowerCase();
	let score = 0;
  while (wordCheck.length !== 0){
	  for (const letter in newPointStructure) {         
		 if (wordCheck[0] === letter) {
			   score = score + newPointStructure[letter[0]];
            wordCheck = wordCheck.slice(1);
		   }
      } 
   }
     console.log(`Your score for ${word} is ${score}.`);
     return score;
};

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let userWord = '';
function initialPrompt() {
   userWord = input.question(`Let's play some Scrabble! \n\nEnter a word to score: `);
   return userWord;
};

let userScore = 0;




let simpleScoreStructure = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
  
};

let vowelScoreStructure = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
};

let scrabble = {
   name: "Scrabble",
   description: "The traditional scoring algorithm",
   scorerFunction: scrabbleScorer
 };

const scoringAlgorithms = [simpleScoreStructure, vowelScoreStructure, scrabble];

function scorerPrompt() {
let userScorer = Number(input.question(
   `\nWhich scoring algorithm would you like to use?\n\n0 - Simple: One point per character \n1 - Vowel Bonus: Vowels are worth 3 points.\n2 - Scrabble: Uses scrabble point system\n
   Enter 0, 1, or 2: `));
  

   if (userScorer === 0) {
    return `${scoringAlgorithms[0].scorerFunction(userWord)}`;
      
   } else if (userScorer === 1) {
     return `${scoringAlgorithms[1].scorerFunction(userWord)}`;
      
   } else if (userScorer === 2) {
      return `${scoringAlgorithms[2].scorerFunction(userWord)}`;
      
   } else{
      return console.log(`\nError: Invalid input. Please try again.`);
   }

};


//


function runProgram() {
   initialPrompt();
   scorerPrompt();
}
   

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
