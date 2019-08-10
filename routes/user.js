const express = require('express');
const path = require('path'),
mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const User = require('../models/user');

const router = express.Router();



router.post('/signup', (req, res, next) => {
   User.findOne({email:req.body.Email}).then(result => {
        if(result){
            res.render('signup');
        }else{
            bcrypt.hash(req.body.password, 10).then((result) => {
                User.create({email:req.body.Email, password:result, name:req.body.Name});
                res.render('login');
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
				
                         res.render('dashboard');;
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
	if(!req.user)
    res.render('signup.ejs');
	else
	res.render('dashboard');
});

router.get('/login', (req,res,next) => {
    res.render('login');
})

module.exports =  router;