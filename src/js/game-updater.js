export default class GameUpdater {
  constructor(timeStep, updateFcn) {
    this.accumulator = 0
    this.timeStep = timeStep
    this.lastTime = 0
    this.updateFcn = updateFcn
  }

  update(time) {
    if (this.lastTime) {
      let dt = time - this.lastTime
      this.accumulator += dt
      while (this.accumulator >= this.timeStep) {
        this.accumulator -= this.timeStep
        this.updateFcn()
      }  
    }
    this.lastTime = time
  }
}
