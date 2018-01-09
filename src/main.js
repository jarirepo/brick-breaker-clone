import Brick from './brick'

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

const b = new Brick(200, 100, 100, 50)

function draw(time = 0) {
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  b.show(ctx)
  requestAnimationFrame(draw)
}
draw()