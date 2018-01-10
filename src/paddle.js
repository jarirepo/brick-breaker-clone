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
    ctx.fillStyle = '#ff0050'
    ctx.fillRect(this.left, this.top, this.width, this.height)
  } 
}
