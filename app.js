if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const bcrypt = require('bcrypt');
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
require("dotenv").config();

const User = require('./models/User');

app.use( bodyParser.json());
app.use(express.urlencoded({extended: false })); //post에서 입력값이 res를 통해서 전달되도록 함 필수인지 모름
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true,useUnifiedTopology: true } , ()=>
    console.log('connected to db')
);

 
app.get('/',(req,res)=>{
    res.send('we are at start');
});

// 라우터
const mainRoute  = require('./routes/main');
app.use('/main', mainRoute);

var registerRoute= require('./routes/register');
app.use('/register', registerRoute);

const postRoute  = require('./routes/posts');
app.use('/posts', postRoute);

const loginRoute  = require('./routes/login');
app.use('/login', loginRoute);


//passport
const initializePassport = require('./passport-config')
initializePassport(passport, 
    email => User.find( {"email": email} ),
    id => User.find({"id": id})
)


/*
function checkAutenticated(req, res, next){
    if(req.isAutenticated()){
        return next()
    }
    res.redirect('/login')
}
function checkNotAutenticated(req, res, next){
    if(req.isAutenticated()){
        res.redirect('/')
    }
    next()
}
*/



app.listen(3000, () => {
    console.log("Listening on port 3000…")
})