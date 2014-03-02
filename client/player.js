'use strict';

var pixi = require('pixi')
var kd = require('keydrown')
var shots = require('./shots')

var texture = pixi.Texture.fromImage("img/fighter.png")
var ship = new pixi.Sprite(texture)

ship.lastShot = new Date().getTime()
ship.anchor.x = 0.5
ship.anchor.y = 0.5
ship.position.x = 200
ship.position.y = 150
ship.acceleration = {
  x: 0,
  y: 0
}

ship.refresh = function(delta) {
  ship.handleInput(delta)
  ship.position.x += ship.acceleration.x * delta
  ship.position.y += ship.acceleration.y * delta
}

ship.handleInput = function(delta) {
  var dirX = kd.L.isDown() - kd.J.isDown()
  var dirY = kd.I.isDown() - kd.K.isDown()

  ship.rotation += dirX * Math.PI * delta
  ship.acceleration.x += dirY * Math.sin(ship.rotation) * delta * 40
  ship.acceleration.y -= dirY * Math.cos(ship.rotation) * delta * 40
  if (kd.SPACE.isDown()) {
    shoot()
  }
}

function shoot() {
  if (new Date().getTime() - ship.lastShot > 120) {
    shots.newShot(ship.position.x, ship.position.y, ship.rotation)
    ship.lastShot = new Date().getTime()
  }
}

module.exports = ship
