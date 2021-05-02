const LocalStrategy= require('passport-local').Strategy
const bcrypt = require('bcrypt');
const User = require('./models/User');

function initialize(passport, getUserByEmail, getUserByID   ){
    const authenticateUser = async (email, password, done)=>{
        const user = getUserByEmail(email)
        if(user ==null){
            return done(null, false, {message: 'NO User'})
        }
        try {
            // 수정하려고 짜본 코드 
            
            const userp = User.find( {"email": email}, {"password": password} )
            if(userp != null){
                return done(null, userp)
            }
            else {
                return done(null, false, {message: 'Not password'})
            }
            /*
            const compared = await bcrypt.compare(password, user.password);
            if (compared){ 
                return done(null, user)
            }
            else {
                return done(null, false, {message: 'Not password'})
            }
            */
            
        } catch(e){
            return done(e) 
        }
    }
    //핵심부분
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))

    //시리얼라이즈 부분
    /*
    passport.serializeUser((user, done) => done(null, user.name))
    passport.deserializeUser((name, done) => {
        return done(null, getUserByID(name)) 
    })
    */
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function(id, done) {
        return done(null, getUserByID(id));
    });
    /*
    passport.serializeUser(function(user, done) {
        done(null, user);
    });  
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
    */
}

module.exports = initialize 