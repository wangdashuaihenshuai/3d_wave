var Hexagon = require('./hexagon.js')
var _ = require('lodash')

module.exports = exports = Scene

function Scene (canvasId, canvasWidth, canvasHeight) {
  this.id = canvasId
  this.canvas = document.getElementById(this.id)
  this.canvasWidth = this.canvas.width
  this.canvasHeight = this.canvas.height
  this.ctx = this.canvas.getContext('2d')
  this.t = 0
  this.background = '#26263d'

  var matrixLen = 200
  var matrixNum = 40
  var len = matrixLen * matrixNum
  var y = -this.canvasHeight

  this.watchPosition = {x: this.canvasWidth / 2, y: this.canvasHeight, z: -3000}
  this.rotateAngel = {x: -0.27750735106709845, y: -3.3870295796514958, z: 0}
  this.rotateP = {x: this.canvasWidth * 0.8, y: this.canvasHeight / 2, z: len / 2}

  var positionsInfo = []
  _.each(_.range(matrixNum), numX => {
    var x = numX * matrixLen / 2
    _.each(_.range(matrixNum), numZ => {
      var z = numZ * matrixLen
      positionsInfo.push({position: {x: x, y: y, z: z}, numInfo: {x: numX, z: numZ, num: matrixNum, height: this.canvasHeight}})
    })
  })
  var self = this
  document.onmousemove = function (e) {
    e = e || window.event
    var px = e.screenX - self.canvasWidth / 2
    var py = self.canvasHeight / 2 + e.screenY
    console.log(px, py)
    self.rotateAngel.y = (px * 0.9 / self.canvasWidth) * Math.PI
    self.rotateAngel.x = -(py * 0.8 / self.canvasWidth) * Math.PI
    console.log(self.rotateAngel)
  }
  this.hexagons = _.map(positionsInfo, positionInfo => {
    return new Hexagon({
      ctx: this.ctx,
      position: positionInfo.position,
      numInfo: positionInfo.numInfo
    })
  })
}

Scene.prototype.caculate = function () {
  this.t = this.t + 1
  if (this.t === 10000000) {
    this.t = 0
  }
  _.each(this.hexagons, hexagon => {
    hexagon.setDrawOption({watchPosition: this.watchPosition, rotateP: this.rotateP, rotateAngel: this.rotateAngel})
    hexagon.caculate(this.t)
  })
}

Scene.prototype.draw = function () {
  _.each(this.hexagons, hexagon => {
    hexagon.draw()
  })
}

Scene.prototype.clear = function () {
  this.ctx.fillStyle = this.background
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
}

Scene.prototype.run = function () {
  var self = this
  self.caculate()
  self.clear()
  self.draw()
  window.requestAnimationFrame(function () {
    self.run()
  })
}
