// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");


const newPointStructure = {
   name: "New Point Structure"
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

let simpleScorer = function (word){
   userScore = word.length;
   return console.log(`Your score for '${word}' is ${userScore}`);
};


let vowelBonusScorer = function(word){
   let vowels =  ['A', 'E', 'I', 'O', 'U'];
   let consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
   let letterPoints = 0;
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

function newScrabbleScorer(word) {
	wordCheck = word.toUpperCase();
	let score = 0;
 

  while (wordCheck.length !== 0){

	  for (const letter in newPointStructure) {
           
		 if (wordCheck.includes(letter)) {
            console.log(score);
            console.log(newPointStructure[letter]);
			   score= score + newPointStructure[letter[0]];
            wordCheck = wordCheck.slice(1);
            console.log(score);
            console.log(wordCheck);
		   }

      } 
   }
     console.log(score);
     return score;
   
}
function transform(obj) {
   
   let keys = Object.keys(obj);
   let letters;
 
  for ( let key in obj) { 
    letters = obj[key]; 

    while (letters.length !== 0) { 
         newPointStructure[letters.splice(0,1)] = Number(keys[0]);
      }
    keys.shift();  
   }
  console.log(newPointStructure);
   return newPointStructure; 
}; 


 
 

 transform(oldPointStructure);
 newScrabbleScorer("serendipity");

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
   scoreFunction: simpleScorer
  
};

let vowelScoreStructure = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scoreFunction: vowelBonusScorer
};

let scrabbleScorer = {
   name: "Scrabble",
   description: "The traditional scoring algorithm",
   scoreFunction: newScrabbleScorer
 };

const scoringAlgorithms = [simpleScoreStructure, vowelScoreStructure, scrabbleScorer];

function scorerPrompt() {
let userScorer = Number(input.question(
   `\nWhich scoring algorithm would you like to use?\n\n0 - Simple: One point per character \n1 - Vowel Bonus: Vowels are worth 3 points.\n2 - Scrabble: Uses scrabble point system\n
   Enter 0, 1, or 2: `));
  

   if (userScorer === 0) {
    return `${scoringAlgorithms[0].scoreFunction(userWord)}`;
      
   } else if (userScorer === 1) {
     return `${scoringAlgorithms[1].scoreFunction(userWord)}`;
      
   } else if (userScorer === 2) {
      return `${scoringAlgorithms[2].scoreFunction(userWord)}`;
      
   } else{
      return console.log(`\nError: Invalid input. Please try again.`);
   }

};


//


function runProgram() {
   //initialPrompt();
  // scorerPrompt();
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
