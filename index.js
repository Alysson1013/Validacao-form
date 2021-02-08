var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var session = require('express-session')
var flash = require('express-flash')
app.use(flash());
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.get("/", (req, res)=>{
    console.log("Rodando")
    res.send("Rodando")
})

app.listen(8080, ()=>{
    console.log("Servidor rodando!")
})