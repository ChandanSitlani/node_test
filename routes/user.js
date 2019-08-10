const express = require('express');
const path = require('path'),
mongoose = require('mongoose');

const User = require('../models/user');

const router = express.Router();



router.post('/signup', (req, res, next) => {
   User.findOne({email:req.body.Email}).then(result => {
        if(result){
            res.render('signup.ejs');
        }else{
            User.create({email:req.body.Email, password:req.body.password, name:req.body.Name});
            res.render('login.ejs');
        }
    }).catch(err => {
        console.log(err);
    })
});

router.post('/login', (req, res, next) => {
    User.findOne({email:req.body.Email, password:req.body.password}).then(result => {
        if(result){
            res.send('<h1>Hi, Welcome to this page, you successfully logged in</h1>');
        }else{
            res.redirect('/login');
        }
    }).catch(err => {
        console.log(err);
    })
});

router.get('/signup', (req,res, next) => {
    res.render('signup');
});

router.get('/login', (req,res,next) => {
    res.render('login.ejs');
})

module.exports =  router;