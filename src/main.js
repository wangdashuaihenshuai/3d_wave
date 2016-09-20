
var Scene = require('./scene.js')

var canvasId = 'canvas'
var scene = new Scene(canvasId)
scene.clear()

window.requestAnimationFrame(function () {
  scene.run()
})
