const middlewareWrapper = require('cors');
const User = require('../models/userModel')

const dbControllers = {
    //gets all users
    getAllUsers (req, res, next) {
        User.find({},
        (err, users) => {
            if (err) {
                return next({
                    log: 'dbControllers.getAllUsers ERROR',
                    message: { err: 'dbControllers.getAllUsers Error' },
                    status: 400
                });
            }
            res.locals.users = users;
            return next()
        })
    },

    //gets one user
    getUser (req, res, next) {
        User.findOne({
            googleId: req.params.googleId
        }, (err, user) => {
            if (err) {
                return next({
                    log: 'dbControllers.getUser ERROR',
                    message: { err: 'dbControllers.getUser ERROR'},
                    status: 400
                });
            }
            res.locals.user = user
            return next()
        });
    },
    //create one user based on google auth
    async createUser (req, res, next) {
        console.log(req.body)
        try {
            const dbRes = await User.create({
                googleId: req.body.googleId
            })
            next();
        }catch (error) {
            return next({
                log: 'dbControllers.createUser ERROR',
                message: { err: error},
                status: 400
            });
        }
    }
}




module.exports = dbControllers;