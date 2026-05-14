import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
},
    (accessToken, refreshToken, profile, done) => {

        const email = profile.emails[0].value;

        if (!email.endsWith("ifpe.edu.br")) {
            return done(null, false);
        }

        return done(null, profile);
    }));

// SERIALIZAÇÃO
passport.serializeUser((user, done) => {
    done(null, {
        id: user.id,
        displayName: user.displayName,
        emails: user.emails,
        photos: user.photos
    });
});

// DESERIALIZAÇÃO
passport.deserializeUser((user, done) => {
    done(null, user);
});

export default passport;