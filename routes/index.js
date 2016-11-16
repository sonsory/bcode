function initRoutes( app, passport ){
  app.get( '/', function( req, res ){

    res.redirect('/bcode')
    //res.send("Successsful!!")
  } )



app.use('/bcode', require('./bcode'))
console.log("app.use('/bcode')")
}

module.exports = initRoutes
