const cells = document.querySelectorAll('.cell');
const titleheader = document.querySelector('#titleHeader');
const xplayerDisplay = document.querySelector('#xplayerDisplay');
const oplayerDisplay = document.querySelector('#oplayerDisplay');
const restartBtn = document.querySelector('#restart');

let player = 'X';
let cPlayer = 'O';
let isPauseGame = false;
let isGameStart = false;

console.log(Math.round(Math.random()*8));

const inputCells = ['', '','',
                    '', '','',
                    '', '','']
    
const winConditions = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], 
                       [1,4,7], [2,5,8], [0,4,8], [2,4,6]]
    
cells.forEach((cell, index) => {
    cell.addEventListener('click', () => tapCell(cell, index, player))
}) 

function tapCell(cell, index, khiladi){
    if(cell.textContent == '' && !isPauseGame){
        isGameStart = true;
        updateCell(cell, index, khiladi);
        if(!checkWinner(khiladi)){
            if(!checkDraw()){
                if(khiladi == player)
                {
                    setTimeout(computerMove, 900);
                }
            }
        }
    }
}

function updateCell(cell,index, khiladi){
    cell.textContent = khiladi;
    inputCells[index] = khiladi;
    cell.style.color = khiladi == 'X' ? '#1892EA' : '#A737FF';
}

function computerMove(){
    let random;
    while(inputCells[random] != ''){
        random = Math.round(Math.random()*9);
    }
    tapCell(cells[random], random, cPlayer);
}

function checkWinner(khiladi){
    for(const [a,b,c] of winConditions){
        if(inputCells[a] == khiladi&&
            inputCells[b] == khiladi &&
            inputCells[c] == khiladi
        ){
            declareWinner([a,b,c], khiladi);
            return true;
        }
    }
}

function checkDraw(){
    if(inputCells.every(cell => cell != '')){
        declareDraw();
        return true;
    }
    return false;
}
function declareDraw(){
    titleheader.textContent = 'Draw'
    isGameStart = false;
    isPauseGame = true;
    restartBtn.style.visibility = 'visible';
}
 function declareWinner(winingIndex, khiladi){
    titleheader.textContent = `${khiladi} Wins!`
    winingIndex.forEach(idx => {
        cells[idx].style.background = '#3a305c'
    })
    isGameStart = false;
    isPauseGame = true;
    restartBtn.style.visibility = 'visible'
}


restartBtn.addEventListener('click', () => {
    restartBtn.style.visibility = 'hidden';
    inputCells.fill('');
    cells.forEach(cell => {
        cell.textContent = ''
        cell.style.background = ''
    })
    isPauseGame = false;
    isGameStart = false;
    titleheader.textContent = 'Choose';
 })

 xplayerDisplay.addEventListener('click', () => {
    if(!isGameStart){ 
        oplayerDisplay.classList.remove('player-active');
        xplayerDisplay.classList.add('player-active');
        cPlayer = 'O';
        player = 'X';
    }
 })

 oplayerDisplay.addEventListener('click', () => {
    if(!isGameStart && !isPauseGame){
        xplayerDisplay.classList.remove('player-active');
        oplayerDisplay.classList.add('player-active');
        cPlayer = 'X';
        player = 'O';
    }
 })