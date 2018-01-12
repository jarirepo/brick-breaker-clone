import GameUpdater from './game-updater';
import Brick from './brick'
import Paddle from './paddle'
import Ball from './ball';

const { cos, PI, random, sin } = Math

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
ctx.globalAlpha = 0.8

const images = new Map()
document.getElementById('heart')
.addEventListener('load', e => images.set('heart', e.target))

const gap = 2
const cols = 5
const rows = 3
const paddleHeight = 25
const paddleWidth = 160
const paddleSpeed = 300
const timeStep = 20
const ballRadius = 15
const ballSpeed = 300

// initial game board; rectangular grid of bricks
const bricks = new Array()
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let w = 100 - gap
    let h = 50 - gap
    let x = (canvas.width - cols * w) / 2 + j * (w + gap) + gap / 2
    let y = 150 + i * (h + gap) + gap / 2
    bricks.push(new Brick(x, y, w, h))
  }
}

const gameUpdater = new GameUpdater(timeStep, update)
const paddle = new Paddle((canvas.width - paddleWidth) / 2, canvas.height - 2 * paddleHeight, paddleWidth, paddleHeight)
const ball = new Ball(ballRadius)

const GameState = {
  IDLE: 0,
  STARTED: 1,
  PAUSED: 2,
  GAMEOVER: 3
}

let player = {
  lives: 3
}

let state = GameState.IDLE

ball.reset(paddle)

document.addEventListener('keydown', e => {
  switch (e.keyCode) {
    case 37:  // left arrow
      if (state === GameState.IDLE || state === GameState.STARTED) {
        if (paddle.left > 0) {
          paddle.speed = -paddleSpeed
        }  
      }
      break
    case 39:  // right arrow
      if (state === GameState.IDLE || state === GameState.STARTED) {
        if (paddle.left + paddle.width < canvas.width) {
          paddle.speed = paddleSpeed
        }
      }
      break
  }
})

document.addEventListener('keyup', e => {
  switch (e.keyCode) {
    case 13:  // ENTER - start game
      if (state === GameState.IDLE) {
        state = GameState.STARTED
        ball.release(ballSpeed)
      } else if (state === GameState.STARTED && !ball.released) {
        ball.release(ballSpeed)
      }
      break
    case 37:  // left arrow - move paddle to the left
    case 39:  // right arrow - move paddle to the right
      if (state === GameState.IDLE || state === GameState.STARTED) {
        paddle.speed = 0
      }
      break
  }
})


function draw(time = 0) {

  gameUpdater.update(time)

  ctx.fillStyle = '#000'
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  for (let b of bricks) {
    b.show(ctx)
  }
  paddle.show(ctx)
  ball.show(ctx)

  /*
  ctx.font = '24pt Trebuchet MS'
  ctx.textAlign = 'left'
  ctx.textBaseLine = 'bottom'  
  ctx.fillStyle = 'red'
  ctx.fillText(`Lives: ${player.lives}`, 10, 30)
  */
  if (images.has('heart')) {
    for (let i = 0; i < player.lives; i++) {
      ctx.drawImage(images.get('heart'), 0, 0, 256, 256, 10 + i * 32, 10, 24, 24)
    }  
  }

  if (state === GameState.GAMEOVER) {
    gameOverText()
  }
  requestAnimationFrame(draw)
}
draw()


function update() {
  paddle.update(timeStep / 1000)
  paddle.checkBorders(canvas)

  if (!ball.released) {
    // attach the ball to the paddle
    ball.reset(paddle)

  }else if (state === GameState.STARTED && ball.released) {
    ball.update(timeStep / 1000)    
    ball.checkBorders(canvas)
    ball.checkPaddleCollision(paddle)

    if (!ball.alive) {
      ball.reset(paddle)
      player.lives--
      if (player.lives === 0) {
        state = GameState.GAMEOVER
        console.log('Game Over!')
      }
    }
  }
}

function gameOverText() {
  ctx.font = '32pt Trebuchet MS'
  ctx.textAlign = 'center'
  ctx.textBaseLine = 'middle'
  const w = ctx.measureText('Game Over!')
  ctx.fillStyle = 'red'
  ctx.fillText('Game Over!', canvas.width / 2, 2 / 3 * canvas.height)
}
