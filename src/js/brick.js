const { acos, pow, sqrt } = Math

export default class Brick {
  constructor(left, top, width, height) {
    this.left = left
    this.top = top
    this.width = width
    this.height = height
    this.hits = 0
    this.maxHits = 1
    this.hitScore = 1
    this.cleared = false
    // generalized brick geometry
    this.vertices = [
      { x: this.left,               y: this.top               },
      { x: this.left + this.width,  y: this.top               },
      { x: this.left + this.width,  y: this.top + this.height },
      { x: this.left,               y: this.top + this.height },
      { x: this.left,               y: this.top               }
    ]
    this.dir = [
      { x:  1, y:  0 },
      { x:  0, y:  1 },
      { x: -1, y:  0 },
      { x:  0, y: -1 }
    ]
    this.normals = [
      { x:  0, y: -1 },
      { x:  1, y:  0 },
      { x:  0, y:  1 },
      { x: -1, y:  0 }
    ]
    this.len = [ this.width, this.height, this.width, this.height ]
  }

  show(ctx) {
    if (this.cleared) { return }
    ctx.fillStyle = '#ccc'
    ctx.fillRect(this.left, this.top, this.width, this.height)
  }

  checkBallCollision(ball) {
    if (this.cleared) { return false }

    if (ball.pos.y + ball.r < this.top || 
        ball.pos.y - ball.r > this.top + this.height ||
        ball.pos.x + ball.r < this.left || 
        ball.pos.x - ball.r > this.left + this.width
    ) {
      return false  // no collision
    }

    loop: for (let i = 0; i < this.vertices.length - 1; i++) {
      // check if the ball is travelling towards this edge
      const k = this.normals[i].x * ball.vel.x + this.normals[i].y * ball.vel.y
      if (k > 0) { continue loop }
      const p0 = this.vertices[i]
      // checks if the collision point is inside the line segment i
      const a = this.dir[i].x * (ball.pos.x - p0.x) + this.dir[i].y * (ball.pos.y - p0.y)
      if (a < -0.5 || a > this.len[i + 0.5]) { continue loop }
      // collision point (cx,cy)
      const cx = p0.x + a * this.dir[i].x
      const cy = p0.y + a * this.dir[i].y
      const dx = ball.pos.x - cx
      const dy = ball.pos.y - cy
      // perpendicular distance from the ball's center to the edge p0-p1
      const d = sqrt(pow(dx, 2) + pow(dy, 2))
      if (d + 0.5 < ball.r) {
        // correction of the ball's position with respect to the true collision point
        ball.pos.x = cx + (ball.r + 0.5) * dx / d
        ball.pos.y = cy + (ball.r + 0.5) * dy / d
        // reflect the ball's velocity vector about the edge normal
        const dot = this.normals[i].x * (-ball.vel.x) + this.normals[i].y * (-ball.vel.y)
        ball.vel.x = 2 * dot * this.normals[i].x - (-ball.vel.x)
        ball.vel.y = 2 * dot * this.normals[i].y - (-ball.vel.y)
        this.hits++
        this.cleared = ( this.hits === this.maxHits )
        return true
      } 
    }
    return false
  }
}
