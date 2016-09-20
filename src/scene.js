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

  this.watchPosition = {x: -this.canvasWidth / 4, y: this.canvasHeight, z: -6000}
  this.rotateAngel = {x: -0.26965336943312396, y: -3.6830265124819066, z: 0}
  this.rotateP = {x: len / 4, y: y / 2, z: len / 2}

  this.isDown = false
  document.onmousedown = (e) => {
    this.oldDownPosition = {x: e.clientX, y: e.clientY}
    this.isDown = true
  }

  document.onmouseup = (e) => {
    this.isDown = false
  }

  document.onmousemove = (e) => {
    if (this.isDown) {
      var addX = e.clientX - this.oldDownPosition.x
      var addY = this.oldDownPosition.y - e.clientY
      this.oldDownPosition = {x: e.clientX, y: e.clientY}
      this.rotateAngel.y = this.rotateAngel.y + (addX * 0.9 / this.canvasWidth) * Math.PI
      this.rotateAngel.x = this.rotateAngel.x + (addY * 0.8 / this.canvasWidth) * Math.PI
      console.log(this.rotateAngel)
    }
  }

  var positionsInfo = []
  _.each(_.range(matrixNum), numX => {
    var x = numX * matrixLen / 2
    _.each(_.range(matrixNum), numZ => {
      var z = numZ * matrixLen
      positionsInfo.push({position: {x: x, y: y, z: z}, numInfo: {x: numX, z: numZ, num: matrixNum, height: this.canvasHeight}})
    })
  })

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
  this.caculate()
  this.clear()
  this.draw()
  window.requestAnimationFrame(() => {
    this.run()
  })
}
