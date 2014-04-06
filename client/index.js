'use strict';

var pixi = require('pixi')
var _    = require('lodash')
var kd = require('keydrown')

var renderer = require('./renderer')
var loop = require('./loop')
var shots = require('./shots')
var ship = require('./player')

var stage = new pixi.Stage(0x000000)

shots.setStage(stage)
stage.addChild(ship.sprite)

var bounds = new pixi.Rectangle(0,0,800,500)

loop(function(delta) {
  shots.refresh(delta, bounds)

  kd.tick()
  ship.refresh(delta)
  renderer.render(stage)
})
