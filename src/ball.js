const { PI } = Math
const TWO_PI = 2 * PI

export default class Ball {
  constructor(x, y, r) {
    this.x = x
    this.y = y
    this.r = r
  }

  show(ctx) {
    ctx.beginPath()
    ctx.fillStyle = '#ffff00'
    ctx.arc(this.x, this.y, this.r, 0, TWO_PI)
    ctx.fill()
  }
}
