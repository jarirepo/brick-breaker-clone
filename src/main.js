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


function draw(time = 0) {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  for (let b of bricks) {
    b.show(ctx)
  }

  paddle.show(ctx)
  
  requestAnimationFrame(draw)
}
draw()