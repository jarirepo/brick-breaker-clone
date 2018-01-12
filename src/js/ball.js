const { abs, cos, PI, pow, random, sign, sin, sqrt } = Math
const TWO_PI = 2 * PI

export default class Ball {
  constructor(r) {
    this.pos = {x: 0, y: 0}
    this.vel = {x: 0, y: 0}
    this.r = r
    this.released = false
    this.speed = 0
    this.alive = false
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
    this.alive = true
    console.log('Ball released at speed ', speed)
  }

  setSpeed(speed) {
    if (this.speed > 0) {
      this.vel.x *= speed / this.speed
      this.vel.y *= speed / this.speed
      this.speed = speed  
    }
  }

  reset(paddle) {
    // centers the ball on the paddle and resets the speed
    this.pos.x = paddle.left + paddle.width / 2
    this.pos.y = paddle.top - this.r
    this.vel.x = 0
    this.vel.y = 0
    this.speed = 0
    this.released = false
    this.alive = false
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
      this.alive = false
    }
  }

  checkPaddleCollision(paddle) {
    if (this.pos.y + this.r < paddle.top ||
        this.pos.x + this.r < paddle.left ||
        this.pos.x - this.r > paddle.left + paddle.width ||
        this.pos.y - this.r > paddle.top + paddle.height
    ) {
      // no collision
      return

    } else if (this.vel.y > 0 && this.pos.y + this.r > paddle.top) {

      if (this.pos.x > paddle.left + paddle.height / 2 &&
          this.pos.x < paddle.left + paddle.width - paddle.height / 2) {

        // collision with paddle top side
        // map -1 < u < 1 to bounce-off angle
        const dx = this.pos.x - ( paddle.left + paddle.width / 2 )
        const u = dx / (paddle.width / 2)
        const theta = u * PI / 4 - PI / 2
        this.vel.x = this.speed * cos(theta)
        this.vel.y = this.speed * sin(theta)

      } else {

        if (this.pos.x < paddle.left + paddle.height / 2) {
          // check collision with the LEFT paddle arc
          const dx = this.pos.x - ( paddle.left + paddle.height / 2)
          const dy = this.pos.y - ( paddle.top + paddle.height / 2)
          const a = sqrt(pow(dx, 2) + pow(dy, 2))  
          if (a < this.r + paddle.height / 2) {
            const cx = paddle.left + paddle.height / 2 + paddle.height / 2 * dx / a
            const cy = paddle.top + paddle.height / 2 + paddle.height / 2 * dy / a
            this.pos.x = cx
            this.pos.y = cy
            this.vel.x = this.speed * dx / a       
            this.vel.y = this.speed * dy / a      
            console.log('collision with LEFT arc')
            return
          }
        } else if (this.pos.x > paddle.left + paddle.width - paddle.height / 2) {
          // check collision with the RIGHT paddle arc
          const dx = this.pos.x - ( paddle.left + paddle.width - paddle.height / 2)
          const dy = this.pos.y - ( paddle.top + paddle.height / 2)
          const a = sqrt(pow(dx, 2) + pow(dy, 2))  
          if (a < this.r + paddle.height / 2) {
            const cx = paddle.left + paddle.width - paddle.height / 2 + paddle.height / 2 * dx / a
            const cy = paddle.top + paddle.height / 2 + paddle.height / 2 * dy / a
            this.pos.x = cx
            this.pos.y = cy
            this.vel.x = this.speed * dx / a       
            this.vel.y = this.speed * dy / a       
            console.log('collision with RIGHT arc')
            return
          }
        }

        // no side collision; assume ball hit the bottom
        this.alive = false
      }
    }
  }
}
