/*global document */
'use strict';

var renderer = pixi.autoDetectRenderer(800,500)

// attach the renderer view to the DOM
var rootNode = document.getElementById('container')
rootNode.appendChild(renderer.view)

module.exports = renderer
