var Word = require("./Word.js");
let fs = require("fs");
var prompts = require("prompts");

let currentWord = "";
let wordBank = [];
let allowedChars = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
guessedLetters = "";
totalWords = 0;
let gRemaining = 10;

fs.readFile("word-bank.txt", (err, data) => {
    wordBank = data.toString().split("\r\n");
    totalWords = wordBank.length;
    playGame();
 });

 function pickWord(){
     return wordBank.splice(Math.floor(Math.random() * wordBank.length), 1);
 }

 function playGame(){
    if(currentWord === ""){
        currentWord = new Word(pickWord()[0]);
        gRemaining = 10;
        playGame();
    }
    else{
        currentWord.printWord();
        console.log("guessed letters: " + guessedLetters);
        console.log("Guesses remaining: " + gRemaining);
        let response = prompts({
           type: 'text',
           name: 'letter',
           message: 'Guess a letter!'
        }).then(function(response){
            let includes = guessedLetters.includes(response.letter)
            if(!allowedChars.includes(response.letter)){
                console.log("\nInvalid Input.");
                playGame();
            }
            else if(includes){
                console.log("\nYou've already guessed that letter.");
                playGame();
            }
            else{
           let correct = currentWord.makeGuess(response.letter);
           guessedLetters += response.letter;
           if(!correct){
               gRemaining--;
               console.log("\nIncorrect :(")
           }
           else{
               console.log("\nCorrect!")
           }
           if(gRemaining === 0){
               console.log("\n****************\nOh no! You lost!\nBye!!!\n****************\n");
               return process.exit(1);
           }
           if(currentWord.isGuessed()){
               currentWord.printWord();
               if(wordBank.length === 0){
                    console.log("\n\n\n********************************\nThat's all the words! You win!!!\n********************************\n\n\n");
                    return process.exit(1);
                }
                else{
                    console.log("\nOn to the next word!")
                    currentWord = "";
                    guessedLetters = "";
                }
           }
            playGame();
            }//end of else for includes
        }); //end of promtp then
    }//end of first else
 }

 
 