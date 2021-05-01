const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

/*  
var main= require('./router/main');
//const mongoClient = require('mongodb').MongoClient
//const url = process.env.MONGO_DB

app.use('/main', main);
*/

/*
app.use('/posts ', () => {
    console.log('Middleware running');
}); 
*/

// app.use(express.json())
app.use( bodyParser.json() );

mongoose.connect('proceess.env.DB_CONNECTION',{ useNewUrlParser: true }, ()=>
    console.log('connected')
);

const postRoute  = require('./routes/posts')
app.use('/posts', postRoute);
 

app.get('/',(req,res)=>{
    res.send('we are at start');
});



/*
app.use(session({
    secret :'asdjha!@#@#$dd',
    resave:false,
    saveUninitialized:true
    })) 

app.get('/',(req,res)=>{
    res.redirect('/user/welcome');
})


mongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    
    if (err) {
        console.log("Error while connecting mongo client")
    } else {
        console.log(url + "connected");
        const myDB = db.db('userDB')
        const collection = myDB.collection('userTable')

        app.post('/signup', (req, res) => {
            console.log(req.body)
            const newUser = {
                id: req.body.id,
                name: req.body.name,
                email: req.body.email,
                password: req.body.pw
            }

            const query = { email: newUser.email }

            collection.findOne(query, (err, result) => {

                if (result == null) {
                    collection.insertOne(newUser, (err, result) => {
                        res.status(200).send()
                    })
                } else {
                    res.status(400).send()
                }

            })

        })

        app.post('/login', (req, res) => {

            const query = {
                email: req.body.email, 
                password: req.body.pw
            }

            collection.findOne(query, (err, result) => {

                if (result != null) {

                    const objToSend = {
                        name: result.name,
                        email: result.email
                    }

                    res.status(200).send(JSON.stringify(objToSend))

                } else {
                    res.status(404).send()
                }

            })

        })




        //


    }

})
*/
app.listen(3000, () => {
    console.log("Listening on port 3000…")
})





//const cookieParser = require('cookie-parser');
//const session = require('express-session'); //var session = require('express-session');
//const dotenv = require('dotenv').config()