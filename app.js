/// CRUD for SHOP

var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var mongoose = require('mongoose')
var tailors = require('./routes/tailors')
var consumers = require('./routes/consumers')

var db = 'mongodb://localhost/example';
mongoose.connect(db)

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.static('public/css'))


app.get('/', function (req, res) {
    res.render('index')
})

app.use('/consumers',consumers)
app.use('/tailors',tailors)

app.listen(3000, () => {
    console.log('listening on port 3000')

})