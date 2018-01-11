const { PI } = Math

export default class Paddle {
  constructor(left, top, width, height) {
    this.left = left
    this.top = top
    this.width = width
    this.height = height
    this.speed = 0
  }

  update(dt) {
    this.left += this.speed * dt    
  }

  checkBorders(canvas) {
    if (this.left < 0) {
      this.left = 0
      this.speed = 0
    } else if (this.left + this.width > canvas.width - 1) {
      this.left = canvas.width - this.width
      this.speed = 0
    }  
  }

  show(ctx) {
    // ctx.fillStyle = '#ff0050'
    const grad = ctx.createLinearGradient(
      this.left, this.top,
      this.left, this.top + this.height - 1
    )

    grad.addColorStop(0, '#111')
    grad.addColorStop(0.5, '#ff0050')
    grad.addColorStop(1, '#111')

    const r = this.height / 2

    ctx.beginPath()
    ctx.fillStyle = grad
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 1
    ctx.rect(this.left + r, this.top, this.width - 2 * r, this.height)
    ctx.arc(this.left + r, this.top + r, r, PI / 2, 3 * PI / 2, false)
    ctx.arc(this.left + this.width - r, this.top + r, r, -PI / 2, PI / 2, false)
    ctx.fill()
    ctx.stroke()
  } 
}
