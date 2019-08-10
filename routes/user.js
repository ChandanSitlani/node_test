const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const router = express.Router();



router.post('/signup', (req, res, next) => {
   User.findOne({email:req.body.Email}).then(result => {
        if(result){
            res.render('signup.ejs');
        }else{
            bcrypt.hash(req.body.password, 10).then((result) => {
                User.create({email:req.body.Email, password:result, name:req.body.Name});
                res.render('login.ejs');
            }).catch(err => {
                console.log(err);
            })
           
        }
    }).catch(err => {
        console.log(err);
    })
});

router.post('/login', (req, res, next) => {
        User.findOne({email:req.body.Email}).then(response => {
            bcrypt.compare(req.body.password, response.password).then(result => {
                if(result){
                         res.send('<h1>Hi, Welcome to this page, you successfully logged in</h1>');
                }
                else{
                    res.render('login');
                }
            }).catch(err => {
                console.log(err);
            })
            }).catch(err => {
            console.log(err);
        })
       
    
});

router.get('/signup', (req,res, next) => {
    res.render('signup');
});

router.get('/login', (req,res,next) => {
    res.render('login');
})

module.exports =  router;