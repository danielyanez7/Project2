const express = require('express');
const router = express.Router();
const User = require('../models/User.model')
const { isLoggedIn, checkRole } = require('../middlewares/route-guards')
const uploaderMiddleware = require('../middlewares/uploader.middleware')

// router.get("/user/profile/:user_id", isLoggedIn, (req, res, next) => {
//     res.render("user/profile", { user: req.session.currentUser })
// })

router.get('/profile', isLoggedIn, (req, res, next) => {


    User
        .findById(req.session.currentUser?._id)
        .then(user => res.render('user/profile', {
            user,
            isOwner: req.session.currentUser?._id === user._id,
            isTrainer: req.session.currentUser?.role === "TRAINER",
            isClient: req.session.currentUser?.role === "CLIENT"
        }))
        .catch(err => next(err))

})

router.get('/edit-profile/:user_id', isLoggedIn, (req, res, next) => {


    User
        .findById(req.session.currentUser?._id)
        .then(user => res.render('user/edit-profile', user))
        .catch(err => next(err))
})

// router.post('/student-edit', isLoggedIn, (req, res, next) => {

//     const { username, email, profileImg, description, user_id } = req.body
//     // console.log(req.body) recuerda colocar en la vista la propiedad de id type hidden
//     User
//         .findByIdAndUpdate(user_id, { username, email, profileImg, description })
//         .then(user => res.redirect(`/students/${user_id}`))
//         .catch(err => next(err))
// })

// router.post('/delete/:user_id', isLoggedIn, checkRole('PM'), (req, res, next) => {

//     // console.log(req.params)
//     const { user_id } = req.params

//     User
//         .findByIdAndDelete(user_id)
//         .then(() => res.redirect('/students'))
//         .catch(err => next(err))
// })



module.exports = router