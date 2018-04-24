const express = require('express');
const passport = require('passport');
const router = express.Router();
//
// router.post('/signin', passport.authenticate('signin', {
//     successRedirect : '/',
//     failureRedirect : '/signin' //가입 실패시 redirect할 url주소
// }));
//
router.post('/signin', function (req, res, next) {
    passport.authenticate('signin', function (err, user, info) {
        if (err) {
            return next(err); // will generate a 500 error
        }
        // Generate a JSON response reflecting authentication status
        if (! user) {
            return res.send(401, { success : false, message : info.message });
        }
        // ***********************************************************************
        // "Note that when using a custom callback, it becomes the application's
        // responsibility to establish a session (by calling req.login()) and send
        // a response."
        // Source: http://passportjs.org/docs
        // ***********************************************************************
        req.login(user, function (loginError) {
            if (loginError) {
                return next(loginError);
            }
            return res.send({ success : true, message : 'authentication succeeded', user: user });
        });
    })(req, res, next);
});

// router.post('/signup', passport.authenticate('signup', {
//     successRedirect : '/signin',
//     failureRedirect : '/' //가입 실패시 redirect할 url주소
// }));

// router.post('/signin', passport.authenticate('signin'), function (req, res) {
//     let user = {
//         id: req.user.id,
//         email: req.user.email,
//         name: req.user.name
//     };
//     res.send({
//         success: true,
//         message: 'Success: Sign-in.',
//         user: user
//     });
//     console.log(req);
//     console.log(res);
// });

router.post('/signup', passport.authenticate('signup'), function (req, res) {

    console.log(req);
    console.log(res);
});

router.get('/signout', function (req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/user', function(req, res) {
    console.log(req)
    res.send('Hello get /api/user');
});

router.post('/user', function(req, res) {
    console.log(req)
    res.send('Hello post /api/user');
});



router.get('/r2', function(req, res){
    res.send('Hello /p1/r2');
});

module.exports = router;