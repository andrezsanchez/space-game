'use strict';

var pixi = require('pixi')
var _    = require('lodash')
var kd = require('keydrown')
var p2 = require('p2')

var renderer = require('./renderer')
var loop = require('./loop')
var shots = require('./shots')
var ship = require('./player')

var stage = new pixi.Stage(0x000000)

var world = new p2.World({ gravity: [0, 9.82] })

shots.setStage(stage)
stage.addChild(ship.sprite)
world.addBody(ship.pbody)

var bounds = new pixi.Rectangle(0,0,800,500)

loop(function(delta) {
  shots.refresh(delta, bounds)

  kd.tick()
  ship.refresh(delta)
  world.step(delta)
  renderer.render(stage)
})
