export default class Paddle {
  constructor(left, top, width, height) {
    this.left = left
    this.top = top
    this.width = width
    this.height = height
  }

  show(ctx) {
    ctx.fillStyle = '#ff0050'
    ctx.fillRect(this.left, this.top, this.width, this.height)
  } 
}
