const { PI } = Math
const TWO_PI = 2 * PI

export default class Ball {
  constructor(x, y, r) {
    this.pos = {x: x, y: y}
    this.vel = {x: 0, y: 0}
    this.r = r
  }
    
  update(dt) {
    this.pos.x += this.vel.x * dt    
    this.pos.y += this.vel.y * dt    
  }

  show(ctx) {
    ctx.beginPath()
    ctx.fillStyle = '#ffff00'
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, TWO_PI)
    ctx.fill()
  }

  checkBorders(canvas) {
    if (this.pos.x - this.r <= 0) {
      this.vel.x *= -1
    } else if (this.pos.x + this.r >= canvas.width - 1) {
      console.log('right outside')
      this.vel.x *= -1
    } else if (this.pos.y - this.r <= 0) {
      this.vel.y *= -1  
    } else if (this.vel.y > 0 && this.pos.y + this.r >= canvas.height - 1) {
      console.log('bottom outside')
      this.vel.y *= -1  
    }
  }
}

