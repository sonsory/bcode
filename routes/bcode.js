var router    = require('express').Router();


router.get( '/', function( req, res ){

  res.render( 'bcodeMain', {body_template: 'body/index'} )

})


router.get( '/gravity', function( req, res ){

  res.render( 'gravity', {body_template: 'body/index'} )

})


module.exports = router
