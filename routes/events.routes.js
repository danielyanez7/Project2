const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const { isLoggedIn, checkRole } = require('../middlewares/route-guards')
const uploaderMiddleware = require('../middlewares/uploader.middleware')


router.get('/create-event', isLoggedIn, (req, res, next) => {

    User
        .findById(req.session.currentUser?._id)
        .then(event => res.render('user/create-event', {
            event,
            isTrainer: req.session.currentUser?.role === "TRAINER",
            isAdmin: req.session.currentUser?.role === "ADMIN",
        }))
        .catch(err => next(err))
})






module.exports = router