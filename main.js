let tiles = Array.from(document.querySelectorAll('.tile'));
let activePlayer = document.querySelector('.player-name');
let restartBtn = document.getElementById('restart');

restartBtn.addEventListener('click', restart);

tiles.forEach((tile) => {
    tile.addEventListener('click', handleClick);
});

function handleClick(e){
    let targetTile = e.target;
    if(e.target.textContent === ''){
        playRound(targetTile)
    }
}

const playerFactory = (name, icon, score) => {
    return {name, icon, score};
} 

let playerOne = playerFactory('one','X', 0);
let playerTwo = playerFactory('two', 'O', 0);

let gameboard = [];
let currentIcon = playerOne.icon;
let winner = '';
let moves = 0;

const winningCombs = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];


function playRound(tile){
    moves++;
    tile.textContent = currentIcon;
    currentIcon === playerOne.icon ? (activePlayer.textContent = playerTwo.icon) : (activePlayer.textContent = playerOne.icon);
    tileIndex = tile.getAttribute('data-value');
    addToArray(tileIndex);
    checkWin(gameboard);
    checkDraw();
    changePlayer();
}

function changePlayer(){
    currentIcon === playerOne.icon ? (currentIcon = playerTwo.icon) : (currentIcon = playerOne.icon);

}

function addToArray(){
    gameboard[tileIndex] = currentIcon;
}

function checkWin(gameboard){
    //logic from jsfiddle, loops through winningcombs array
    for(let i=0; i < winningCombs.length; i++){
        const [a, b, c] = winningCombs[i]; // new array with the same values as each winning combo

        //check if the winningcomb[i] array items are all same (either x or o)
        if (gameboard[a] && gameboard[a] === gameboard[b] && gameboard[a] === gameboard[c]) {
            alert(`Player ${gameboard[a]} won! Click restart to play again.`);

            gameboard[a] === 'X' ? (winner = playerOne) : (winner = playerTwo);
        
            //cant click on tiles after someone won
            tiles.forEach((tile) => {
                tile.removeEventListener('click', handleClick);
            })
    }

} }

function checkDraw(){
    if (moves === 9){
        alert("It's a tie! Click restart to play again.")
    }
}


//restart the game
function restart(){
    gameboard = [];
    currentIcon = playerOne.icon;
    activePlayer.textContent = 'X';
    tiles.forEach((tile)=> {
        tile.textContent = '';
    })

    tiles.forEach((tile) => {
        tile.addEventListener('click', handleClick);
    })

}
