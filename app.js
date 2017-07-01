/// CRUD for SHOP

var express = require("express")
var app = express()
var bodyParser = require("body-parser")

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',function(req,res){
    res.render('index')
})

//app.use('/shop',shops)

app.listen(3000,()=> {
    console.log('listening on port 3000')
})