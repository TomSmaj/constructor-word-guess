function Letter(l) {
    this.letter = l;
    this.guessed = false;
    this.print = function(){
        if(this.guessed){
            return l;
        }
        else{
            return '_';
        }
    }
    this.check = function(arg){
        if(!this.guessed){
            if(arg === l){
                this.guessed = true;
                return true;
            }
            else{return false;}
        }
    }
}

module.exports = Letter;