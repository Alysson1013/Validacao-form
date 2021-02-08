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
    let errors = req.flash("Errors")
    let email = req.flash("Email")
    

    errors = errors.length == 0 ? undefined : errors
    email = (email == undefined || email.length == 0 ? "" : email)

    res.render("index.ejs", {errors: errors, email: email})
})

app.post("/form", (req, res)=>{
    var {email, nome, pontos} = req.body
    let err = []

    if (email == undefined || email == "") err.push("Email inválido")
    if (nome == undefined || nome == "") err.push("Nome inconclusivo")
    if (pontos == undefined || pontos == "")err.push("Pontos inválidos")

    if (err.length == 0) res.send("Sucesso")
    else {
        req.flash("Pontos", pontos)
        req.flash("Nome", nome)
        req.flash("Email", email)
        req.flash("Errors", err)
        res.redirect("/")
    }
 
})

app.listen(8080, ()=>{
    console.log("Servidor rodando!")
})