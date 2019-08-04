var express=require('express'),
 bodyParser=require('body-parser'),
mongoose=require('mongoose'),
app=express();

app.listen(8000,function(err){console.log("Serving on port 8000");});
