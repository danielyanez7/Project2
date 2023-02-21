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

router.get('/edit-profile/:current_Id', isLoggedIn, (req, res, next) => {

    const { current_Id } = req.params

    User
        .findById(current_Id)
        .then(user => res.render('user/edit-profile', user))
        .catch(err => next(err))
})

router.post('/edit-profile', isLoggedIn, (req, res, next) => {

    const { username, age, height, weight, injuries, imageUrl, current_Id } = req.body
    // console.log(req.body) recuerda colocar en la vista la propiedad de id type hidden
    User
        .findByIdAndUpdate(current_Id, { username, age, height, weight, injuries, imageUrl })
        .then(user => res.redirect('/'))
        .catch(err => next(err))
})

// router.post('/delete/:user_id', isLoggedIn, checkRole('PM'), (req, res, next) => {

//     // console.log(req.params)
//     const { user_id } = req.params

//     User
//         .findByIdAndDelete(user_id)
//         .then(() => res.redirect('/students'))
//         .catch(err => next(err))
// })



module.exports = router