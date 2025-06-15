
function myFunction(str){
    let score = JSON.parse(localStorage.getItem('score')) || 
    {
        win : 0,
        lose : 0,
        tie : 0,
        displayScore(){
            return (`win : ${score.win}  lose : ${score.lose}  tie : ${score.tie}`);
        }
    };
    let userChoice = str;
    let randomNo = Math.random()*3;
    let computerChoice = "";
    let result = "";
    if(randomNo > 0 && randomNo <= 1){
        computerChoice = 'Bat';
    }
    else if(randomNo > 1 && randomNo <= 2){
        computerChoice = 'Ball';
    }
    else{
        computerChoice = 'Stump';
    }
    if((userChoice == 'Bat' && computerChoice == 'Ball') || (userChoice == 'Stump' && computerChoice == 'Bat') || (userChoice == 'Ball' && computerChoice == 'Stump')){
        score.win++;
        result += `You win the match`;
    }
    else if(userChoice == computerChoice){
        score.tie++;
        result += `This match is a tie`;
    }
    else{
        score.lose++;
        result += `You lose the match`;
    }
    localStorage.setItem('score', JSON.stringify(score));
    alert(`${result} \n \n ${localStorage.getItem('score')}`);
}