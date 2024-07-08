// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

let simpleScorer = function(word){
   userScore = word.length
   console.log(`Your score for '${word}' is ${userScore}`);
};


let vowelBonusScorer = function(word){
   let vowels =  ['A', 'E', 'I', 'O', 'U'];
   let consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
   let letterPoints = 0
   wordCheck = word.toUpperCase();
 
    for (i = 0; i < word.length; i++) {
      if (vowels.includes(wordCheck[i])) {
         letterPoints = letterPoints + 3;
      } else if (consonants.includes(wordCheck[i])) {
         letterPoints = letterPoints + 1; 
      } else { 
        return console.log (`\nError: Invalid input. Please try again.`);
      }
    }
    
    return  console.log(`Your score for '${word}' is ${letterPoints}`);
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
   console.log(letterPoints);
	return letterPoints;
 }
 
const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z'],
 };



// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let userWord = '';
function initialPrompt() {
   userWord = input.question(`Let's play some Scrabble! \n\nEnter a word to score: `);
   return userWord;
};

let userScore = 0;

let newPointStructure;

let simpleScoreStructure = {
   name: "Simple Score",
   description: "Each letter is worth 1 point.",
   scorefunction: simpleScorer
  
};

let vowelScoreStructure = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scoreFunction: vowelBonusScorer
};

let scrabbleScorer = {
   name: "Scrabble",
   description: "The traditional scoring algorithm",
   scoreFunction: oldScrabbleScorer
 };

const scoringAlgorithms = [simpleScoreStructure, vowelScoreStructure, scrabbleScorer];

function scorerPrompt() {
let userScorer = Number(input.question(
   `\nWhich scoring algorithm would you like to use?\n
   \n 
   0 - Simple: One point per character \n
   1 - Vowel Bonus: Vowels are worth 3 points.\n
   2 - Scrabble: Uses scrabble point system\n
   Enter 0, 1, or 2: `));
  

   if (userScorer === 0) {
      console.log("Algorithm name: ", scoringAlgorithms[0].name)
      return `${scoringAlgorithms[0].scoreFunction(userWord)}`;
      
   } else if (userScorer === 1) {
      console.log("Algorithm name: ", scoringAlgorithms[1].name);
      return `${scoringAlgorithms[1].scoreFunction(userWord)}`;
      
   } else if (userScorer === 2) {
      console.log("Algorithm name: ", scoringAlgorithms[2].name)
      return `${scoringAlgorithms[2].scoreFunction(userWord)}`;
      
   } else{
      return console.log(`\nError: Invalid input. Please try again.`);
   }


};

function transform() {

};

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
