'use strict';

var express = require('express')
var join = require('path').join
var PORT = process.env.port || 80

var routes = require('./routes')

function makeApp() {
  var app = express()
  app.use(express.logger())
  app.set('views', join(__dirname, 'views'))
  app.set('view engine', 'jade')
  app.use(express.static('public'))

  routes(app)

  return app
}

var app = makeApp()
app.listen(PORT, function(err) {
  if (err) throw err
  console.log('listening on port ' + PORT)
})

module.exports = makeApp
