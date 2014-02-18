'use strict';

var pixi = require('pixi')
var loop = require('./loop')
var kd = require('keydrown')

var stage = new pixi.Stage(0x000000)
var renderer = pixi.autoDetectRenderer(800,500)

// attach the renderer view to the DOM
var rootNode = document.getElementById('container')
rootNode.appendChild(renderer.view)

var texture = pixi.Texture.fromImage("img/fighter.png");
var ship = new pixi.Sprite(texture);

var shotTexture = pixi.Texture.fromImage("img/shot.png");
var shots = []

ship.anchor.x = 0.5;
ship.anchor.y = 0.5;
ship.position.x = 200;
ship.position.y = 150;

stage.addChild(ship);

var bounds = new pixi.Rectangle(0,0,800,500)
loop(function(delta) {
  kd.SPACE.press(function() {
    var shot = new pixi.Sprite(shotTexture);
    shot.position.x = ship.position.x
    shot.position.y = ship.position.y
    shot.rotation = ship.rotation
    stage.addChild(shot)
    shots.push(shot)
  })
  shots = shots.filter(function(shot) {
    shot.position.x += Math.sin(shot.rotation) * 800 * delta
    shot.position.y -= Math.cos(shot.rotation) * 800 * delta
    if (!bounds.contains(shot.position.x, shot.position.y)) {
      stage.removeChild(shot)
      return false
    }
    return true
  })
  kd.tick()
  var dirX = kd.L.isDown() - kd.J.isDown()
  var dirY = kd.I.isDown() - kd.K.isDown()

  ship.rotation += dirX * Math.PI * delta
  ship.position.x += Math.sin(ship.rotation) * dirY * 200 * delta
  ship.position.y -= Math.cos(ship.rotation) * dirY * 200 * delta
  renderer.render(stage)
})
