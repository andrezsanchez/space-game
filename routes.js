'use strict';

function routes(app) {
  app.get('/', function(req, res) {
    res.render('index.jade')
  })
}
module.exports = routes
