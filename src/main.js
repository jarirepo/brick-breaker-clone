import Brick from './brick'
import Paddle from './paddle'

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

let bricks = []
const gap = 2
const cols = 5
const rows = 3
const paddleHeight = 35
const paddleWidth = 140
//const paddleStep = 500
let accumulator = 0
let paddleSpeed = 0
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


document.addEventListener('keydown', e => {
 // e.preventDefault()
  switch (e.keyCode) {
    case 37: 
      if (paddle.left > 0) {
        paddleSpeed = -6        
      }
      break
    case 39: 
      if (paddle.left + paddle.width < canvas.width) {
        paddleSpeed = 6     
      }
      break
  }
})

document.addEventListener('keyup', e => {
  //e.preventDefault()
  switch (e.keyCode) {
    case 37: 
      paddleSpeed = 0
      break
    case 39: 
      paddleSpeed = 0
      break
  }
})


let lastTime

function draw(time = 0) {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (let b of bricks) {
    b.show(ctx)
  }

  if (paddleSpeed !== 0 && accumulator > 0) {
    accumulator--
    paddle.left += paddleSpeed
  }

  if (lastTime) {
    let dt = time - lastTime
    accumulator += dt
    while (accumulator >= timeStep) {
      accumulator -= timeStep
      paddle.left += paddleSpeed * (timeStep / 1000)
      if (paddle.left < 0) {
        paddle.left = 0
        paddleSpeed = 0
      } else if (paddle.left + paddle.width > canvas.width - 1) {
        paddle.left = canvas.width - paddleWidth
        paddleSpeed = 0
      }  
    }  
  }
  lastTime = time

  paddle.show(ctx)
  
  requestAnimationFrame(draw)
}
draw()