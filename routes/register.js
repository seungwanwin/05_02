var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// 이미 있는 계정 확인은 아직 안함

router.get('/',(req,res)=>{ // /같지만 실제 주소는 login/로 시작
    res.send('register page');
});

router.post('/', async (req,res)=>{
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user =new User({ 
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.json(savedUser);
    } catch(err){
        res.json( {message: err });
    }
});
module.exports = router;