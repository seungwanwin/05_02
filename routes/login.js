var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport')

router.get('/',(req,res)=>{
    res.send('login page');
});

router.post('/', passport.authenticate('local',{
    successRedirect: '../',
    failureRedirect: '/',
    falseflash: true
}));

module.exports = router;