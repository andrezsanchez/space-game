'use strict';

var pixi = require('pixi')

var shotTexture = pixi.Texture.fromImage("img/shot.png")
var shotStage
var shots = []

var shot = new pixi.Sprite(shotTexture)

function Shots() {}

Shots.prototype.setStage = function(stage) {
  shotStage = stage
}

Shots.prototype.newShot = function(x, y, rotation) {
  var shot = new pixi.Sprite(shotTexture)

  shot.position.x = x
  shot.position.y = y

  shot.anchor.x = 0.5
  shot.anchor.y = 0.5

  shot.rotation = rotation

  shotStage.addChild(shot)
  shots.push(shot)
}

Shots.prototype.refresh = function refreshShots(delta, bounds) {
  shots = shots.filter(function(shot) {
    shot.position.x += Math.sin(shot.rotation) * 800 * delta
    shot.position.y -= Math.cos(shot.rotation) * 800 * delta
    if (!bounds.contains(shot.position.x, shot.position.y)) {
      shotStage.removeChild(shot)
      return false
    }
    return true
  })
}

module.exports = new Shots()

