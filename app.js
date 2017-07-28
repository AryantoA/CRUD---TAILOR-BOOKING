/// CRUD for SHOP

var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var mongoose = require('mongoose')
var tailors = require('./routes/tailors')
var consumers = require('./routes/consumers')
// Adding Authentication
const morgan = require('morgan')

const cookieParser = require('cookie-parser')
// End of Authentication 

const port = process.env.PORT || 3000
var db = 'mongodb://localhost/TestingOne';
mongoose.connect(db)

// Adding Authentication
app.use(cookieParser())
//app.use(morgan('combined'))
// End of Authentication

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(express.static('public'))


app.get('/', function (req, res) {
    res.render('consumer/index')
})

app.use('/consumers',consumers)
app.use('/tailors',tailors)

app.listen(port, () => {
    console.log('listening on port 3000')

})