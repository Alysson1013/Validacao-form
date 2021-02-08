var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var session = require('express-session')
var flash = require('express-flash')
var cookieParser = require("cookie-parser")


app.use(flash());
 
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(cookieParser("sadsadsadsadsad"))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000}
}))

app.get("/", (req, res)=>{
    res.render("index.ejs")
})

app.post("/form", (req, res)=>{
    var {email, nome, pontos} = req.body
    let err = []

    if (email == undefined || email == "") err.push("Email inválido")
    if (nome == undefined || nome == "") err.push("Nome inconclusivo")
    if (pontos == undefined || pontos == "")err.push("Pontos inválidos")

    if (err.length == 0) res.send("Sucesso")
    else res.redirect("/")
 
})

app.listen(8080, ()=>{
    console.log("Servidor rodando!")
})