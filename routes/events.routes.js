const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const { isLoggedIn, checkRole } = require('../middlewares/route-guards')
const uploaderMiddleware = require('../middlewares/uploader.middleware')


router.get('/event-list', isLoggedIn, (req, res, next) => {

    // User
    //     .findById(req.session.currentUser?._id)
    //     .then(user => res.render('user/event-list', {
    //         user,
    //         isOwner: req.session.currentUser?._id === user._id,
    //     }))
    //     .catch(err => next(err))
})


module.exports = router