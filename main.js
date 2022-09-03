let tiles = Array.from(document.querySelectorAll('.tile'));
let activePlayer = document.querySelector('.player-name');


tiles.forEach((tile) => {
    tile.addEventListener('click', (e) =>{
        let targetTile = e.target;
        playRound(targetTile);
        
    }, {once: true});
})

const playerFactory = (name, icon, score) => {
    return {name, icon, score};
} 

let playerOne = playerFactory('one','X', 0);
let playerTwo = playerFactory('two', 'O', 0);

let gameArray = [[], []];
let currentIcon = playerOne.icon;

const winningConditions = [
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
    //check for win 
    //check for draw
    tileIndex = tile.getAttribute('data-value');
    addToArray(tileIndex);
    changePlayer();
   //console.log(gameArray);
}

function changePlayer(){
    currentIcon === playerOne.icon ? (currentIcon = playerTwo.icon) : (currentIcon = playerOne.icon);

}

function addToArray(){
    if(currentIcon === playerOne.icon){
        gameArray[0].push(tileIndex);
    } else {
        gameArray[1].push(tileIndex);
    }

    //console.log(gameArray);
}




/*
current player on player one -> 
player one (x) vajutab tile peale 
tile peale ilmub x ->
x läheb arraysse selle tile indexiga mille peal ta on (player x on arrays veel oma array?)
player 2 kord ehk current player vahetub (iga kord kui klikk on tehtud)
tema vajutab tile tuleb 0
läheb arraysse see index, kus tile peal ta on
player x kord

*/
