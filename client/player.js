'use strict';

var pixi = require('pixi')
var p2 = require('p2')
var kd = require('keydrown')
var shots = require('./shots')

var texture = pixi.Texture.fromImage("img/fighter.png")
var ship = {}
ship.sprite = new pixi.Sprite(texture)

ship.lastShot = new Date().getTime()
ship.sprite.anchor.x = 0.5
ship.sprite.anchor.y = 0.5
ship.sprite.position.x = 200
ship.sprite.position.y = 150

var rect = require('p2/src/shapes/Rectangle')
var box = new rect(1,1)
var scale = 20
ship.pbody = new p2.Body({
  mass: 1,
  position:[ship.sprite.position.x / scale, ship.sprite.position.y / scale]
})
ship.pbody.addShape(box)

ship.acceleration = {
  x: 0,
  y: 0
}

ship.refresh = function(delta) {
  //ship.handleInput(delta)
  //ship.sprite.position.x += ship.acceleration.x * delta
  //ship.sprite.position.y += ship.acceleration.y * delta
  ship.sprite.position.x = ship.pbody.position[0] * scale
  ship.sprite.position.y = ship.pbody.position[1] * scale
  ship.sprite.rotation = ship.pbody.angle

  ship.pbody.angularVelocity = Math.max(-10, ship.pbody.angularVelocity)
  ship.pbody.angularVelocity = Math.min(10, ship.pbody.angularVelocity)
}

ship.handleInput = function(delta) {
  var left = kd.A.isDown() || kd.LEFT.isDown() || kd.J.isDown()
  var right = kd.D.isDown() || kd.RIGHT.isDown() || kd.L.isDown()
  var up = kd.W.isDown() || kd.UP.isDown() || kd.I.isDown()
  var down = kd.S.isDown() || kd.DOWN.isDown() || kd.K.isDown()

  var dirX = right - left
  var dirY = up - down

  ship.acceleration.x += dirY * Math.sin(ship.sprite.rotation) * delta * 40
  ship.acceleration.y -= dirY * Math.cos(ship.sprite.rotation) * delta * 40

  ship.pbody.force[0] = dirY * Math.sin(ship.pbody.angle) * 5
  ship.pbody.force[1] = dirY * -Math.cos(ship.pbody.angle) * 5

  ship.pbody.angularForce = dirX * .5

  if (kd.SPACE.isDown()) {
    shoot()
  }
}

function shoot() {
  if (new Date().getTime() - ship.lastShot > 120) {
    shots.newShot(ship.sprite.position.x, ship.sprite.position.y, ship.sprite.rotation)
    ship.lastShot = new Date().getTime()
  }
}

module.exports = ship
