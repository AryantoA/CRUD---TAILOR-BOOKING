/// CRUD for SHOP

var express = require("express")
var app = express()
var bodyParser = require("body-parser")
var mongoose = require('mongoose')
var Tailor = require('./models/Tailor')

var db='mongodb://localhost/example';
mongoose.connect(db)

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public/css'))


app.get('/',function(req,res){
    res.render('index')
})

app.get('/tailors', function(req, res) {
  console.log('getting all tailors');
    
  Tailor.find({})
    .exec(function(err, tailors) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(tailors);
        res.render('TailorsList', {tailors} )
      }
    });
});
//app.use('/shop',shops)

app.listen(3000,()=> {
    console.log('listening on port 3000')
    
})