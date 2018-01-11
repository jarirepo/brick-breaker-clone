const { cos, PI, random, sin } = Math
const TWO_PI = 2 * PI

export default class Ball {
  constructor(x, y, r, paddle) {
    this.pos = {x: x, y: y}
    this.vel = {x: 0, y: 0}
    this.r = r
    this.released = false
    this.paddle = paddle
    this.speed = 0
  }
    
  update(dt) {
    if (!this.released) { return }
    this.pos.x += this.vel.x * dt    
    this.pos.y += this.vel.y * dt    
  }

  release(speed) {
    const theta = -PI / 4 + random() * PI / 2 - PI / 2
    this.vel.x = speed * cos(theta)
    this.vel.y = speed * sin(theta)
    this.speed = speed
    this.released = true
    console.log('Ball released at speed ', speed)
  }

  setSpeed(speed) {
    if (this.speed > 0) {
      this.vel.x *= speed / this.speed
      this.vel.y *= speed / this.speed
      this.speed = speed  
    }
  }

  reset() {
    // centers the ball on the paddle and resets the speed
    this.pos.x = this.paddle.left + this.paddle.width / 2
    this.pos.y = this.paddle.top - this.r
    this.vel.x = 0
    this.vel.y = 0
    this.speed = 0
  }

  show(ctx) {
    ctx.beginPath()
    // ctx.fillStyle = '#ffff00'
    const grad = ctx.createRadialGradient(
      this.pos.x, this.pos.y - this.r / 4, 0,
      this.pos.x, this.pos.y - this.r, 2 * this.r
    )
    grad.addColorStop(0, '#cccc00')
    grad.addColorStop(1, '#000')
    ctx.fillStyle = grad
    ctx.arc(this.pos.x, this.pos.y, this.r, 0, TWO_PI)
    ctx.fill()
  }

  checkBorders(canvas) {
    if (this.vel.x < 0 && this.pos.x - this.r <= 0) {
      this.vel.x *= -1
    } else if (this.vel.x > 0 && this.pos.x + this.r >= canvas.width - 1) {
      this.vel.x *= -1
    } else if (this.vel.y < 0 && this.pos.y - this.r <= 0) {
      this.vel.y *= -1  
    } else if (this.vel.y > 0 && this.pos.y + this.r >= canvas.height - 1) {
      this.vel.y *= -1  
    }
  }
}
