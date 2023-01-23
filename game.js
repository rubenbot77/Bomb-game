const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time')
const spanRecord = document.querySelector('#record-player')
const alertGame = document.querySelector('#alert-container');
const alertLose = document.querySelector('#alert-container-lose')
const background = document.querySelector('#back') 
const resetButton = document.querySelector('.game-reset')
const resetButtonLose = document.querySelector('.game-reset2')
const recordStatus = document.querySelector('#record-messages')
let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeInterval;
let timePlayer;
let timeStar;

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
resetButton.addEventListener('click', reload)
resetButtonLose.addEventListener('click', reload)


function reload() {
 location.reload()
}

function setCanvasSize(){
    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.7;
     } else {
        canvasSize = window.innerHeight * 0.7;
     }
     canvasSize = Number(canvasSize.toFixed(0));
     canvas.setAttribute('width', canvasSize);
     canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;
    playerPosition.y = undefined;
    playerPosition.x = undefined;

     startGame();
     console.log(canvasSize, playerPosition.x, playerPosition.y);
}

function startGame() {

 
 console.log({canvasSize, elementsSize});  
 canvasSize = Number(canvasSize.toFixed(0));
 elementsSize = Number(elementsSize.toFixed(0));

    
 game.font = elementsSize + 'px Verdana';
 game.textAlign = 'end';

 const map = maps[level];
 if (!map) {
   gameWin();
   return;
 }
 if (!timeStar) {
    timeStar = Date.now();
    timeInterval = setInterval(showTime, 100);
    showRecord();
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
   console.log(canvasSize, playerPosition.x, playerPosition.y);
   
   const giftCollisionX = playerPosition.x.toFixed(0) == giftPosition.x.toFixed(0);
   const giftCollisionY = playerPosition.y.toFixed(0) == giftPosition.y.toFixed(0); 
   const giftCollicion = giftCollisionX && giftCollisionY;
   if (giftCollicion) {
    posAnt.x = undefined;
    posAnt.y = undefined;
    levelWin()
   }
  const bombCollision = bombPositions.find(bomb => {
   const bombCollisionX = bomb.x.toFixed(0) == playerPosition.x.toFixed(0);
   const bombCollisionY = bomb.y.toFixed(0) == playerPosition.y.toFixed(0);
   return bombCollisionX && bombCollisionY;
  });
  if (bombCollision) {
     posAnt.y = bombCollision.y.toFixed(0);
     posAnt.x = bombCollision.x.toFixed(0);
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
   clearInterval(timeInterval);
    alertLose.classList.remove('inactive')
    background.classList.remove('inactive')
  }
  
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
 }
 
function gameWin() {
   console.log('¡Terminaste el juego!');
   clearInterval(timeInterval);
   
  const recordTime = localStorage.getItem('record');
  const playerTime = Date.now() - timeStar;
  background.classList.remove('inactive')
  alertGame.classList.remove('inactive')
  recordStatus.classList.remove('inactive')
   
   if (recordTime) {
      if (recordTime >= playerTime) {
        localStorage.setItem('record', playerTime);
        recordStatus.innerHTML = 'SUPERASTE EL RECORD ✅';
      } else {
        recordStatus.innerHTML = 'lo siento, no superaste el record 🚫';
      }
    } else {
      localStorage.setItem('record', playerTime);
      recordStatus.innerHTML = 'Primera vez? Muy bien, pero ahora trata de superar tu tiempo';
    }
    console.log({recordTime, playerTime});
 }
 function showLives () {
   const heartsArray = Array(lives).fill(emojis['HEART']);
   console.log(heartsArray);

   spanLives.innerText = heartsArray.join('');
 }
 function showTime (){
   spanTime.innerHTML = Date.now() - timeStar; 
 }
 function showRecord() {
   spanRecord.innerHTML = localStorage.getItem('record');
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