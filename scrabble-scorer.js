// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

function transform(obj) {
   let keys = Object.keys(obj); //grabbing the numbers to set as scores later
   let letters; //declaring for future use
   let structure = {}; //declaring for future use
 
  for ( let key in obj) { //time to iterate through the object
    letters = obj[key]; //setting the variable to the value of the current key
    letters = letters.join('').toLowerCase().split(''); // setting the values to lowercase

    while (letters.length !== 0) { //exit condition
      structure[letters.splice(0,1)] = Number(keys[0]); //defining new key as letter with corresponding score within this object.
      }
    keys.shift(); //removing the score to keep from re-using the same number
   } 
   return structure; //returning the newly formed object
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
   score = word.length; // setting the score to be equal to the length of the word entered. 
   console.log(`Score for '${word}': ${score}`);
   return score;
};


let vowelBonusScorer = function(word){
   let vowels =  ['A', 'E', 'I', 'O', 'U']; //this and the following line are setting up the arrays to go through for scoring.
   let consonants = ['B', 'C', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'V', 'W', 'X', 'Y', 'Z'];
   let wordCheck = word.toUpperCase(); //declaring and initializing a variable to manipulate the user word without losing the word itself.
   let score = 0; //declaring and initializing score variable.
 
    for (i = 0; i < word.length; i++) { //looping conditions through the word
      if (vowels.includes(wordCheck[i])) { //checking each letter in the word for either vowel or consonant via arrays of each. 
         score = score + 3; //if a vowel, add three to current score.
      } else if (consonants.includes(wordCheck[i])) {
         score = score + 1; //if a consonant add 1 to current score.
      } else { 
        return console.log (`\nError: Invalid input. Please try again.`); //throwing an error for incorrect inputs. 
      }
    }
    
    console.log(`Score for '${word}': ${score}`); //printing score message
    return score;//returning score
};

function scrabbleScorer(word) {
	let wordCheck = word.toLowerCase(); //declaring and initializing a variable to manipulate word without changing the word itself. set to lower case for the object it is iterating against.
	let score = 0; //declaring and initializingscore.
  while (wordCheck.length !== 0){ //while loop ending condition, ending once the wordCheck variable has been emptied of all its letters.
	  for (const letter in newPointStructure) { //iterating through the newPointStructure object          
		 if (wordCheck[0] === letter) { //checking the inidcated letter index against the current letter in the object being looked at. 
			   score = score + newPointStructure[letter[0]]; //When a match is found, take the value of that letter key and add it to the current score.
            wordCheck = wordCheck.slice(1); //remove this letter from the word and loop. 
		   }
      } 
   }
     console.log(`Score for ${word}: ${score}.`); //printing score message.
     return score; //returning score.
};

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //
let userWord = ''; //declaring here so it is avaiable for future use elsewhere. 
function initialPrompt() {
   userWord = input.question(`Let's play some Scrabble! \n\nEnter a word to score: `); //getting word from user input
   return userWord; // returning the user input.
};



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
   
let userScorer = Number(input.question(`\nWhich scoring algorithm would you like to use?\n\n0 - Simple: One point per character \n1 - Vowel Bonus: Vowels are worth 3 points.\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: `));
  //declaring and initializing variable to bring in user input for selecting a scorer algorithm and turning it into a number to compare below.
//Selecting with scorer depending on what they picked. 
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
