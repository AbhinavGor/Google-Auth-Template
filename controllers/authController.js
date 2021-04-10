require('dotenv').config();

const router = require('express').Router();
const passport = require('passport');

router.get('/google',
    passport.authenticate('google', { scope: ["profile", "email"] })
);

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
        res.redirect('/auth/authSuccess');
    }
);

router.get('/authDone', (req, res) => {
    res.send(req.user);
});

module.exports = router;