const express=require('express'),
bodyParser=require('body-parser'),
mongoose=require('mongoose'),
crypto=require('crypto'),
app=express();

const userRoutes = require('./routes/user');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.set('view engine','ejs');


app.use(userRoutes);

mongoose.connect('mongodb+srv://sarthak3661:BTQkfbCCqOG7Y5oU@cluster0-kow5n.mongodb.net/AppTeam?retryWrites=true&w=majority').then(() => {
	app.listen(3000);
	console.log('Connected');
}).catch(err => {
	console.log(err);
})
