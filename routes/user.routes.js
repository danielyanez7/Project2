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

router.post('/edit-profile', isLoggedIn, uploaderMiddleware.single('imageUrl'), (req, res, next) => {

    const { username, age, height, weight, injuries, current_Id } = req.body

    let updatedImg = ""

    if (req.file) {
        const { path: imageUrl } = req.file
        updatedImg = imageUrl
    } else {
        updatedImg = undefined
    }

    User
        .findByIdAndUpdate(current_Id, { username, age, height, weight, injuries, imageUrl: updatedImg })
        .then(user => res.redirect('/user/profile'))
        .catch(err => next(err))
})

router.get('/trainer-list', isLoggedIn, (req, res, next) => {

    User
        .find({ role: 'TRAINER' })
        .then(trainers => res.render('user/trainer-list', { trainers }))
        .catch(err => next(err))


})

router.post('/delete/:current_Id', isLoggedIn, (req, res, next) => {

    const { current_Id } = req.params

    User
        .findByIdAndDelete(current_Id)
        .then(() => req.session.destroy(() => res.redirect('/')))
        .catch(err => next(err))
})



module.exports = router