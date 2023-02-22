const router = require('express').Router()
const User = require('../models/User.model')
const Routine = require('../models/Routine.model')

const { isLoggedIn, checkRole } = require('../middlewares/route-guards')


router.get('/create-routine/:user_id', isLoggedIn, checkRole('TRAINER'), (req, res, next) => {
    res.render('user/create-routine')
})


router.post('/create-routine', isLoggedIn, checkRole('TRAINER'), (req, res, next) => {

    const { routinename, exercisename, description, repetitions, category, equipment, user_id, time } = req.body

    const exercises = {
        exercisename,
        description,
        category,
        equipment,
        repetitions
    }

    User
        .findById(user_id)
        .then(owner => Routine.create({ routinename, exercises, time, owner }))
        .catch(err => next(err))
})


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