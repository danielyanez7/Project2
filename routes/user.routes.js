const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const { isLoggedIn, checkRole } = require('../middlewares/route-guards')


router.get('/students', isLoggedIn, (req, res, next) => {

    User
        .find()
        .then(users => res.render('/', { users }))
        .catch(err => next(err))

})

router.get('/perfil/:user_id', isLoggedIn, (req, res, next) => {

    console.log(req.params)
    const { user_id } = req.params

        // User
        //     .findById(user_id)
        //     .then(user => res.render('user/student-profile', {
        //         user,
        //         isOwner: req.session.currentUser?._id === user_id,
        //         isPM: req.session.currentUser?.role === "PM",
        //     }))
        .catch(err => next(err))

})




module.exports = router