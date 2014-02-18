var currentTime
var lastTime
var delta

var fn

function startLoop(cb) {
  // save the callback function to call
  fn = cb

  global.requestAnimationFrame(loop)

  // initialize times so that we don't get NaN
  currentTime = new Date().getTime()
  lastTime = currentTime
}
function loop() {
  currentTime = new Date().getTime()
  delta = (currentTime - lastTime) / 1000

  global.requestAnimationFrame(loop)

  // invoke the function given by the initial call
  fn(delta)

  lastTime = currentTime
}

module.exports = startLoop
