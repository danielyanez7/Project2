const router = require('express').Router()
const User = require('../models/User.model')
const Routine = require('../models/Routine.model')

const { isLoggedIn, checkRole } = require('../middlewares/route-guards')


//vista de crear rutina
router.get('/create-routine/:user_id', isLoggedIn, checkRole('TRAINER'), (req, res, next) => res.render('user/create-routine'))


//crea la rutina en la colecion
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


//esta es la lista de clientes del entrenador
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


    // const promises = [
    //     User.findByIdAndUpdate(currentUser, { $addToSet: { clients: user_id } }, { new: true }),
    //     User.findByIdAndUpdate(currentUser, { $pull: { applications: user_id } }, { new: true })
    // ]

    // Promise
    //     .all(promises)
    //     .then(() => res.redirect(`/clients/${currentUser}`))
    //     .catch(err => next(err))





    User
        .findByIdAndUpdate(currentUser, { $addToSet: { clients: user_id }, $pull: { applications: user_id } }, { new: true })
        .then(() => res.redirect(`/clients/${currentUser}`))
        .catch(err => next(err))
})

module.exports = router