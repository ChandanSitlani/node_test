var express=require('express'),
 bodyParser=require('body-parser'),
mongoose=require('mongoose'),

crypto=require('crypto'),
app=express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));

app.set('view engine','ejs');


mongoose.connect("mongodb://localhost:27017/node_test",{useNewUrlParser:true});
var User =require('./models/user'); 
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
app.get('/signup',function(req,res){
res.render('signup');});


app.post('/signup',function(req,res){
	console.log(req);
User.create(new User({name:req.body.name,email:req.body.email,"password":req.body.password}),(err,user)=>{res.render('registered');});
});
app.listen(8000,function(err){console.log("Serving on port 8000");});
