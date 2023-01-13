const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')
let canvasSize;
let elementsSize;

let playerPosition = {
   x: undefined,
   y: undefined,
};

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);
document.addEventListener('keydown', moveByKeys )
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);  
btnRight.addEventListener('click', moveRight);  
btnDown.addEventListener('click', moveDown);



function setCanvasSize(){
    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
     } else {
        canvasSize = window.innerHeight * 0.8;
     }
    
     canvas.setAttribute('width', canvasSize);
     canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;

     startGame();
}

function startGame() { 
 game.font = elementsSize + 'px Verdana';
 game.textAlign = 'end';

 const map = maps[0];
 const mapRows = map.trim().split('\n');
 const mapRowCol = mapRows.map(row => row.trim().split(''));


 game.clearRect(0,0, canvasSize, canvasSize)
 
mapRowCol.forEach((row, rowI) => {
   row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      if (col == 'O'){
        if (!playerPosition.x && !playerPosition.y){
         playerPosition.x = posX;
         playerPosition.y = posY;
        }
      }
      game.fillText(emoji, posX, posY);
   });
    movePlayer();
   
});
   
//  for (let row = 1; row <= 10; row++){
//    for (let col = 1; col <= 10; col++){
//     game.fillText(emojis[mapRowCol[row - 1][col - 1]], elementsSize * col, elementsSize * row)
//    }
//  }

//   game.fillRect(0,0,100,100);  
//   game.clearRect(50,50,50,50);
//   game.font = '25px Verdana';
//   game.fillStyle = 'purple';
//   game.textAlign = 'left';
//   game.fillText ('Platzi', 100, 100);
}
function movePlayer() {
   game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
 }

function moveByKeys(event){
   if (event.keyCode == 38){
      moveUp();
   } else if (event.keyCode == 37){
      moveLeft();
   } else if (event.keyCode == 39){
      moveRight();
   }else if (event.keyCode == 40){
      moveDown();
   } else {
      console.log('Wrong key');
   }
}
function moveUp(){
   if ((playerPosition.y - elementsSize) < elementsSize){
      console.log('OUT');
   } else {
      playerPosition.y -= elementsSize;
      startGame();
   }
} 
function moveLeft() {
   if ((playerPosition.x - elementsSize) < elementsSize){
      console.log('OUT');
   } else {
      playerPosition.x -= elementsSize;
      startGame()
   }
   }

function moveRight(){
  if ((playerPosition.x + elementsSize) > canvasSize){
   console.log('OUT')
  } else {
   playerPosition.x += elementsSize;
   startGame();
  }
  
}
function moveDown(){
   if ((playerPosition.y + elementsSize) > canvasSize){
      console.log('OUT');
   } else {
      playerPosition.y += elementsSize;
      startGame();
   }
}