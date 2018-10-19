var letter = require("./Letter.js");

function Word(word){
    this.genWord = function(w){
        let nuArr = [];
        for(let i = 0; i < w.length; i++){
            nuArr.push(new letter(w[i]));
        }
        return nuArr;
    }
    this.wordArr = this.genWord(word);
    this.printWord = function(){
        let outWord = "";
        for(let i = 0; i < this.wordArr.length; i++){
            outWord += this.wordArr[i].print() + " ";
        }
        console.log("\n" + outWord);
    }
    this.makeGuess = function(l){
        let correct = false;
        for(let i = 0; i < this.wordArr.length; i++){
            if(!this.wordArr[i].guessed){
                if(this.wordArr[i].check(l)){
                    correct = true;
                }
            }
        }
        return correct;
    }
    this.isGuessed = function(){
        for(let i = 0; i < this.wordArr.length; i++){
            if(!this.wordArr[i].guessed){
                return false;
            }
        }
        return true;
    }
}

module.exports = Word;