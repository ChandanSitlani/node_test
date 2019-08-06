var express=require('express'),
 bodyParser=require('body-parser'),
mongoose=require('mongoose'),

crypto=require('crypto'),
app=express();


app.set('view engine','ejs');


mongoose.connect("mongodb://localhost:27017/node_test",{useNewUrlParser:true});
var User =require('./models/user.js'); 
var db=mongoose.connection;
db.on('error',function(err){
console.log(err);});
db.once('open',function(){console.log("database connected");});
app.get('/',(req,res)=>{
if(req.user)
res.render('dashboard');
else
res.render('login');
});
app.get('/signup',(req,res)=>{if(req)
res.render('signup');});
app.post('/signup',(req,res)=>{if(req)
User.register({"name":req.body.name,"email":req.body.email,"password":req.body.password});
});
app.listen(8000,function(err){console.log("Serving on port 8000");});
