var passport = require('passport');


module.exports = (app) => {
    //route handler for google auth
    app.get('/auth/google', 
    //first parameter: find strategy associated with it
    //second parameter: permissions to user account
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get('/auth/google/callback', 

        passport.authenticate('google')

    );

};
