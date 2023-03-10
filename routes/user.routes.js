const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const Routine = require('../models/Routine.model')
const { isLoggedIn } = require('../middlewares/route-guards')
const uploaderMiddleware = require('../middlewares/uploader.middleware')

saltRounds = 10

// const ApiService = require('../services/exercises.service')
// const ExercisesApi = new ApiService()

router.get('/profile', isLoggedIn, (req, res, next) => {

    User
        .findById(req.session.currentUser?._id)
        .populate('applications')
        .then(user => res.render('user/profile', {
            user,
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

    const { username, email, userPassword, age, height, weight, injuries, current_Id } = req.body

    const imageUrl = req.file?.path

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(userPassword, salt))
        .then(passwordHash => User.findByIdAndUpdate(current_Id, { username, age, height, weight, injuries, imageUrl, password: passwordHash, email }))
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})

router.get('/trainer-list', isLoggedIn, (req, res, next) => {

    User
        .find({ role: 'TRAINER' })
        .select({ username: 1, imageUrl: 1, description: 1 })
        .sort({ eventname: 1 })
        .then(trainers => res.render('user/trainer-list', {
            trainers,
            isClient: req.session.currentUser?.role === "CLIENT"
        }))
        .catch(err => next(err))
})

router.post('/delete/:current_Id', isLoggedIn, (req, res, next) => {

    const { current_Id } = req.params

    User
        .findByIdAndDelete(current_Id)
        .then(() => req.session.destroy(() => res.redirect('/')))
        .catch(err => next(err))
})

router.get('/routine-list/:user_Id', isLoggedIn, (req, res, next) => {

    const { user_Id } = req.params

    Routine
        .find({ owner: user_Id })
        .then(routines => res.render('user/routine-list', { routines }))
        .catch(err => next(err))
})

router.get('/routine-details/:routine_id', isLoggedIn, (req, res, next) => {

    const { routine_id } = req.params

    Routine
        .findById(routine_id)
        .then(routine => res.render('user/routine-details', routine))
        .catch(err => next(err))
})

router.get('/request-personaltraining/:trainer_id', (req, res, next) => {
    const { trainer_id } = req.params
    res.render('user/request-personaltraining', { trainer_id })
})

router.post('/request-personaltraining/:trainer_id', (req, res, next) => {

    const { trainer_id } = req.params
    const client_id = req.session.currentUser?._id
    const selectedDays = {
        days: [req.body.monday, req.body.tuesday, req.body.wednesday,
        req.body.thursday, req.body.friday, req.body.saturday, req.body.sunday]
    }
    const workdays = selectedDays.days.filter(elem => elem !== undefined)

    const promises = [
        User.findByIdAndUpdate(trainer_id, { $addToSet: { applications: client_id } }),
        User.findByIdAndUpdate(client_id, { $addToSet: { workdays } })
    ]

    Promise
        .all(promises)
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})

module.exports = router