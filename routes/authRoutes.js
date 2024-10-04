
const keys = require('../config/keys')

const passport = require('passport');
module.exports = app => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    })
    );

    app.get('/auth/google/callback', 
        passport.authenticate('google'),
        (req, res) => {
            const clientUrl = keys.clientURL;
            res.redirect(clientUrl);
        }   
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    }
    );

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};