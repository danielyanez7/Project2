const router = require('express').Router()
const User = require('../models/User.model')
const Routine = require('../models/Routine.model')
const ApiServices = require('../services/exercises.service')
const exerciseapi = new ApiServices()

const { isLoggedIn, checkRole } = require('../middlewares/route-guards')

router.get('/name-clientroutine/:user_id', isLoggedIn, checkRole('TRAINER'), (req, res, next) => {

    const { user_id } = req.params
    res.render('user/name-clientroutine', { user_id })
})


router.post('/name-clientroutine/:user_id', isLoggedIn, checkRole('TRAINER'), (req, res, next) => {

    const { user_id } = req.params
    const { routinename } = req.body

    Routine
        .create({ routinename, owner: user_id })
        .then(() => res.redirect(`/clients/create-routine/${user_id}`))
        .catch(err => next(err))
})


router.get('/create-routine/:user_id', isLoggedIn, checkRole('TRAINER'), (req, res, next) => {

    const { user_id } = req.params

    const promises = [
        User.findById(user_id),
        exerciseapi.getAllExercises()
    ]

    Promise
        .all(promises)
        .then(result => {
            const user = result[0]
            const apiRawResult = result[1]
            const exercises = apiRawResult.data.results

            const infoExercises = exercises.map(elem => {
                return { exerciseName: elem.name, exerciseUuid: elem.uuid }
            })


            res.render('user/create-routine', { user, infoExercises })


        })
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