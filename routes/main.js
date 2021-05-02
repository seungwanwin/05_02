var express = require('express');
var app = express();
var router = express.Router();
var path = require('path');
const bcrypt = require('bcrypt');

router.get('/',(req,res)=>{
    res.send('main page');
});


module.exports = router;