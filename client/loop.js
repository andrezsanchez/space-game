var currentTime
var lastTime
var delta

var fn

function startLoop(cb) {
  fn = cb
  global.requestAnimationFrame(loop)

  currentTime = new Date().getTime()
  lastTime = currentTime
}
function loop() {
  currentTime = new Date().getTime()
  delta = (currentTime - lastTime) / 1000

  global.requestAnimationFrame(loop)

  fn(delta)

  lastTime = currentTime
}

module.exports = startLoop
