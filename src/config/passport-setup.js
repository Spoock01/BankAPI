import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
import keys from './keys';
import getUserByCpf from '../controllers/transactions.controller';



passport.use(
    new GoogleStrategy({
        callbackURL: '/user/auth/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
   
    }, (accessToken, refreshToken, profile, done) => {

        console.log("Access Token: " + accessToken);
    })
)