const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')
const spanLives = document.querySelector('#lives');
let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;
const playerPosition = {
   x: undefined,
   y: undefined,
 };
 const giftPosition = {
   x: undefined,
   y: undefined,
 };
 let bombPositions = [];
 
let posAnt = {
   x: undefined,
   y: undefined,
}

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);
window.addEventListener('keydown', moveByKeys )
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
 console.log({canvasSize, elementsSize});  
    
 game.font = elementsSize + 'px Verdana';
 game.textAlign = 'end';

 const map = maps[level];
 if (!map) {
   gameWin();
   return;
 }
 const mapRows = map.trim().split('\n');
 const mapRowCols = mapRows.map(row => row.trim().split(''));
 showLives();
 console.log({map, mapRows, mapRowCols});

 bombPositions = [];
 game.clearRect(0,0,canvasSize, canvasSize);
 
mapRowCols.forEach((row, rowI) => {
   row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      if (col == 'O'){
        if (!playerPosition.x && !playerPosition.y){
         playerPosition.x = posX;
         playerPosition.y = posY;
        }
      } else if (col == 'I') {
         giftPosition.x = posX;
         giftPosition.y = posY;
      } else if (col == 'X') {
          bombPositions.push ({
            x: posX,
            y: posY, 
         });
      }
      game.fillText(emoji, posX, posY);
   });
   
   game.fillText(emojis['BOMB_COLLISION'], posAnt.x, posAnt.y);
});

movePlayer();
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
   const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
   const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3); 
   const giftCollicion = giftCollisionX && giftCollisionY;
   if (giftCollicion) {
    posAnt.x = undefined;
    posAnt.y = undefined;
    levelWin()
   }
  const bombCollision = bombPositions.find(bomb => {
   const bombCollisionX = bomb.x.toFixed(3) == playerPosition.x.toFixed(3);
   const bombCollisionY = bomb.y.toFixed(3) == playerPosition.y.toFixed(3);
   return bombCollisionX && bombCollisionY;
  });
  if (bombCollision) {
     posAnt.y = bombCollision.y.toFixed(3);
     posAnt.x = bombCollision.x.toFixed(3);
     console.log(posAnt);
     levelLose();
  }

   game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);

 }
 
 function levelWin() {
    level ++;
    startGame();  
    console.log('Nivel superado!!!');
 }
 function levelLose (){
   lives--;

  console.log(lives);
  
  if (lives <= 0) {
    level = 0;
    lives = 3;
    posAnt.x = undefined;
    posAnt.y = undefined;
  }
  
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
 }
 
function gameWin() {
   console.log('¡Terminaste el juego!');
 }
 function showLives () {
   const heartsArray = Array(lives).fill(emojis['HEART']);
   console.log(heartsArray);

   spanLives.innerText = heartsArray.join('');
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