
/**
 * caculate the distance of two point
 * @param  {Object} p1 {x: 1, y:1, z:1}
 * @param  {Object} p2 {x: 0, y:0, z:0}
 * @return {Number} result 1
 */
function caculate3Distance (p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2), Math.pow(p1.y - p2.y, 2), Math.pow(p1.z - p2.z, 2))
}

/**
 * caculate the distance of two point
 * @param  {Object} p1 {x: 1, y:1}
 * @param  {Object} p2 {x: 0, y:0}
 * @return {Number} result 1
 */
function caculate2Distance (p1, p2) {
  return Math.sqrt(Math.pow(p1.x - p2.x, 2), Math.pow(p1.y - p2.y, 2))
}

function rotatePosition (_p, ratateP, angele) {
  var p = {}
  p.x = _p.x - ratateP.x
  p.y = _p.y - ratateP.y
  p.z = _p.z - ratateP.z
  var sinX = Math.sin(angele.x)
  var cosX = Math.cos(angele.x)

  var sinY = Math.sin(angele.y)
  var cosY = Math.cos(angele.y)

  var sinZ = 0
  var cosZ = 1

  var newP = {
    x: p.x,
    y: p.y,
    z: p.z
  }

  newP.x = newP.x * cosZ - newP.y * sinZ
  newP.y = newP.y * cosZ + newP.x * sinZ

  newP.y = newP.y * cosX - newP.z * sinX
  newP.z = newP.z * cosX - newP.y * sinX

  newP.x = newP.x * cosY - newP.z * sinY
  newP.z = newP.z * cosY + newP.x * sinY
  newP.x = newP.x + ratateP.x
  newP.y = newP.y + ratateP.y
  newP.z = newP.z + ratateP.z
  return newP
}

/**
 * 投影到 xy 平面.
 * @param  {Object} d {x: 1, y:2, z:0} 三维向量坐标
 * @return {Number} b {x:1, y: 2, z: 0}
 */
function caculateProjectionXY (d, e) {
  var b = {}
  b.x = e.x - e.z * (d.x - e.x) / (d.z - e.z)
  b.y = e.y - e.z * (d.y - e.y) / (d.z - e.z)
  b.z = 0
  return b
}

var utils = {
  'caculate3Distance': caculate3Distance,
  'caculate2Distance': caculate2Distance,
  'caculateProjectionXY': caculateProjectionXY,
  'rotatePosition': rotatePosition
}

module.exports = exports = utils
