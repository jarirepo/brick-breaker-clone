import Brick from './brick'
import Paddle from './paddle'
import GameUpdater from './game-updater';

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

let bricks = []
const gap = 2
const cols = 5
const rows = 3
const paddleHeight = 35
const paddleWidth = 140
const timeStep = 10 

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    let w = 100 - gap
    let h = 50 - gap
    let x = (canvas.width - cols * w) / 2 + j * (w + gap) + gap / 2
    let y = 150 + i * (h + gap) + gap / 2
    bricks.push(new Brick(x, y, w, h))
  }
}

const paddle = new Paddle((canvas.width - paddleWidth) / 2, canvas.height - 2 * paddleHeight, paddleWidth, paddleHeight)

const gameUpdater = new GameUpdater(timeStep, update)


document.addEventListener('keydown', e => {
  switch (e.keyCode) {
    case 37: 
      if (paddle.left > 0) {
        paddle.speed = -250       
      }
      break
    case 39: 
      if (paddle.left + paddle.width < canvas.width) {
        paddle.speed = 250
      }
      break
  }
})

document.addEventListener('keyup', e => {
  switch (e.keyCode) {
    case 37: 
      paddle.speed = 0
      break
    case 39: 
      paddle.speed = 0
      break
  }
})

function draw(time = 0) {

  gameUpdater.update(time)

  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  for (let b of bricks) {
    b.show(ctx)
  }
  paddle.show(ctx)
  requestAnimationFrame(draw)
}
draw()

function update() {
  paddle.update(timeStep / 1000)
  paddle.checkBorders(canvas)
}

