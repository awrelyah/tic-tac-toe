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
    tile.textContent = currentIcon;
    currentIcon === playerOne.icon ? (activePlayer.textContent = playerTwo.icon) : (activePlayer.textContent = playerOne.icon);
    //check for draw
    tileIndex = tile.getAttribute('data-value');
    addToArray(tileIndex);
    checkWin(gameboard);
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

            //cant click on tiles after someone won
            tiles.forEach((tile) => {
                tile.removeEventListener('click', handleClick);
            })
    }

} }


//restart the game
function restart(){
    gameboard = [];
    currentIcon = playerOne.icon;
    activePlayer.textContent = 'X';
    tiles.forEach((tile)=> {
        tile.textContent = '';
    })
}
