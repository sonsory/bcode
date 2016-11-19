var router    = require('express').Router();


router.get( '/', function( req, res ){

  res.render( 'bcodeMain', {body_template: 'body/index'} )

})


router.get( '/gravity', function( req, res ){

  res.render( 'gravity', {body_template: 'body/index'} )

})

router.get( '/test2', function( req, res ){

  res.render( 'test2', {body_template: 'body/index'} )

})



router.get( '/test3', function( req, res ){

  res.render( 'test3', {body_template: 'body/index'} )

})

router.get( '/bcode', function( req, res ){

  res.render( 'bcode', {body_template: 'body/index'} )

})

module.exports = router
