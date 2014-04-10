'use strict';

var pixi = require('pixi')
var p2 = require('p2')
var kd = require('keydrown')
var shots = require('./shots')

var texture = pixi.Texture.fromImage("img/fighter.png")
var rect = require('p2/src/shapes/Rectangle')

var scale = 20

var Ship = function () {
  this.sprite = new pixi.Sprite(texture)

  this.lastShot = new Date().getTime()
  this.sprite.anchor.x = 0.5
  this.sprite.anchor.y = 0.5
  this.sprite.position.x = 200
  this.sprite.position.y = 150

  this.pbody = new p2.Body({
    mass: 1,
    position:[this.sprite.position.x / scale, this.sprite.position.y / scale]
  })

  var box = new rect(1,1)
  this.pbody.addShape(box)
}

Ship.prototype.refresh = function(delta) {
  this.handleInput(delta)
  this.sprite.position.x = this.pbody.position[0] * scale
  this.sprite.position.y = this.pbody.position[1] * scale
  this.sprite.rotation = this.pbody.angle

  this.pbody.angularVelocity = Math.max(-10, this.pbody.angularVelocity)
  this.pbody.angularVelocity = Math.min(10, this.pbody.angularVelocity)
}

Ship.prototype.handleInput = function(delta) {
  var left = kd.A.isDown() || kd.LEFT.isDown() || kd.J.isDown()
  var right = kd.D.isDown() || kd.RIGHT.isDown() || kd.L.isDown()
  var up = kd.W.isDown() || kd.UP.isDown() || kd.I.isDown()
  var down = kd.S.isDown() || kd.DOWN.isDown() || kd.K.isDown()

  var dirX = right - left
  var dirY = up - down

  this.pbody.force[0] = dirY * Math.sin(this.pbody.angle) * 5
  this.pbody.force[1] = dirY * -Math.cos(this.pbody.angle) * 5

  this.pbody.angularForce = dirX * 0.5

  if (kd.SPACE.isDown()) {
    this.shoot()
  }
}

Ship.prototype.shoot = function() {
  if (new Date().getTime() - this.lastShot > 120) {
    shots.newShot(this.sprite.position.x, this.sprite.position.y, this.sprite.rotation)
    this.lastShot = new Date().getTime()
  }
}

module.exports = Ship
