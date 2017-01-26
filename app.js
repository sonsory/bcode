var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var session = require('express-session');
var flash = require('connect-flash');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var methodOverride = require('method-override');

var low = require('lowdb');
const db = low('db.json')

//var battle = require('./middleware/battle')

//var mongodb = require('mongodb');


//database init
//require('./models').init( process.env.MONGO_DB )


//view engine
app.set("view engine", 'ejs')
//app.set("view engine", 'jade')

//middleware
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser())
app.use(methodOverride("_method"))
app.use(flash())
app.use(session({secret:'MySecret',resave: false, saveUninitialized: true}))

//passport
var passport = require( './config/passport' )
app.use(passport.initialize())
app.use(passport.session())

//routes
require("./routes")( app, passport );

//test
app.get( '/test', function( req, res ){
  res.send('Perpect!!')
})

db.defaults({ list: [] })
  .value()

// POST /posts
app.post('/create', (req, res) => {

  var list = { id: Date.now(), link: req.body.link, explain: req.body.explain, bcode: req.body.bcode }
  console.log(list)
  var post = db.get('list')
  .push(list)
  .value()

  res.send(post)
})

app.get('/list', (req, res) => {

  var post = db.get('list')
  .value()
console.log(post)
  res.send(post)
})

app.get('/find', (req, res) => {
console.log(req.query)
  var post = db.get('list')
  .find({ bcode: req.query.bcode })
  .value()
console.log(post)
  res.send(post)
})

var port = process.env.PORT || 3003
http.listen(port, function(){
  console.log("Server On!")


})

/*var fs = require('fs');
var options = {
  key: fs.readFileSync('./file.pem'),
  cert: fs.readFileSync('./file.crt')
};
var https = require('https').Server(options,app);
https.listen(3004, function(){
  console.log("Server On!")
})*/