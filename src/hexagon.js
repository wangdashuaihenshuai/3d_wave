var utils = require('./utils.js')

module.exports = exports = Hexagon

function Hexagon (option) {
  this.ctx = option.ctx
  this.color = '#7cd64d'
  this.defaultSize = 0.4
  this.size = this.defaultSize
  this.rawPosition = option.position
  this.rawY = this.rawPosition.y
  this.numInfo = option.numInfo
}

Hexagon.prototype.setDrawOption = function (option) {
  this.cameraAngle = option.state
  this.watchPosition = option.watchPosition
  this.rotateP = option.rotateP
  this.rotateAngel = option.rotateAngel
  this.diaphaneity = option.diaphaneity
}

Hexagon.prototype.caculateY = function (t) {
  var A = this.rawY / 12
  var K = 0.3
  var W = 0.04
  var K1 = 0.3
  var W1 = 0.02
  var x = this.numInfo.x
  var y = this.numInfo.z
  var addY = Math.sin(K * x - W * t) + Math.sin(K1 * y - W1 * t + 10)
  this.size = this.defaultSize * (2 + addY)
  this.rawPosition.y = addY * A
}

Hexagon.prototype.caculatePosition = function () {
  var _position = utils.caculateProjectionXY(this.position, this.watchPosition)
  this.x = _position.x
  this.y = _position.y
}

Hexagon.prototype.rotatePosition = function () {
  this.position = utils.rotatePosition(this.rawPosition, this.rotateP, this.rotateAngel)
}

Hexagon.prototype.caculate = function (t) {
  this.caculateY(t)
  this.rotatePosition()
  this.caculatePosition()
}

Hexagon.prototype.draw = function () {
  this.ctx.fillStyle = this.color
  this.ctx.beginPath()
  this.ctx.moveTo(this.x, this.y)
  this.ctx.lineTo(1.73 * this.size + this.x, 1 * this.size + this.y)
  this.ctx.lineTo(1.73 * this.size + this.x, 3 * this.size + this.y)
  this.ctx.lineTo(this.x, 4 * this.size + this.y)
  this.ctx.lineTo(-1.73 * this.size + this.x, 3 * this.size + this.y)
  this.ctx.lineTo(-1.73 * this.size + this.x, 1 * this.size + this.y)
  this.ctx.fill()
}
