export default class Brick {
  constructor(left, top, width, height) {
    this.left = left
    this.top = top
    this.width = width
    this.height = height
  }

  show(ctx) {
    ctx.fillStyle = '#ccc'
    ctx.fillRect(this.left, this.top, this.width, this.height)
  }
}
