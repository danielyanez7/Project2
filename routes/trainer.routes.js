const router = require('express').Router()
const User = require('../models/User.model')
const Routine = require('../models/Routine.model')
const ApiServices = require('../services/exercises.service')
const exerciseapi = new ApiServices()

const { isLoggedIn, checkRole } = require('../middlewares/route-guards')


router.get('/create-routine/:user_id', isLoggedIn, checkRole('TRAINER'), (req, res, next) => {

    const { user_id } = req.params

    exerciseapi
        .getAllExercises()
        .then(({ data }) => {
            const exercises = data.results.map(elem => {
                return { exerciseName: elem.name, exerciseUuid: elem.uuid }
            })
            res.render('user/create-routine', { exercises, user_id })
        })
        .catch(err => next(err))
})


// router.post('/create-routine', isLoggedIn, checkRole('TRAINER'), (req, res, next) => {

// })


router.get('/:trainer_id', isLoggedIn, checkRole('TRAINER'), (req, res, next) => {

    const { trainer_id } = req.params

    User
        .findById(trainer_id)
        .populate('clients')
        .then(({ clients }) => res.render('user/clients-list', { clients }))
        .catch(err => next(err))
})


router.post('/accept-client/:user_id', isLoggedIn, checkRole('TRAINER'), (req, res, next) => {

    const { user_id } = req.params
    const currentUser = req.session.currentUser?._id

    User
        .findByIdAndUpdate(currentUser, { $addToSet: { clients: user_id }, $pull: { applications: user_id } })
        .then(() => res.redirect(`/clients/${currentUser}`))
        .catch(err => next(err))
})


module.exports = router