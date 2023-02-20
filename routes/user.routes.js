const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const { isLoggedIn, checkRole } = require('../middlewares/route-guards')


// router.get("/user/profile/:user_id", isLoggedIn, (req, res, next) => {
//     res.render("user/profile", { user: req.session.currentUser })
// })

router.get('/profile', isLoggedIn, (req, res, next) => {

    User
        .findById(req.session.currentUser?._id)
        .then(user => res.render('user/profile', {
            user,
            isOwner: req.session.currentUser?._id === user._id,
        }))
        .catch(err => next(err))

})




module.exports = router