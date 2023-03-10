const router = require('express').Router()
const User = require('../models/User.model')
const Routine = require('../models/Routine.model')
const ApiServices = require('../services/exercises.service')
const exerciseapi = new ApiServices()

const { isLoggedIn, checkRole } = require('../middlewares/route-guards')

router.get('/name-clientroutine/:user_id', isLoggedIn, checkRole('TRAINER', 'ADMIN'), (req, res, next) => {

    const { user_id } = req.params
    res.render('user/name-clientroutine', { user_id })
})


router.post('/name-clientroutine/:user_id', isLoggedIn, checkRole('TRAINER', 'ADMIN'), (req, res, next) => {

    const { user_id } = req.params
    const { routinename } = req.body

    Routine
        .create({ routinename, owner: user_id })
        .then(routine => res.redirect(`/clients/create-routine/${user_id}/${routine._id}`))
        .catch(err => next(err))
})


router.get('/create-routine/:user_id/:routine_id', isLoggedIn, checkRole('TRAINER', 'ADMIN'), (req, res, next) => {

    const { user_id, routine_id } = req.params

    const promises = [
        User.findById(user_id),
        Routine.findById(routine_id),
        exerciseapi.getAllExercises()
    ]

    Promise
        .all(promises)
        .then(result => {

            const user = result[0]
            const routine = result[1]
            const apiRawResult = result[2]
            const exercises = apiRawResult.data.results

            const workdays = user.workdays.map(workdayname => {
                return {
                    name: workdayname,
                    dailyRoutine: routine.weekplan.filter(rou => rou.day === workdayname)
                }
            })

            const infoExercises = exercises.map(elem => {
                return { exerciseName: elem.name, exerciseUuid: elem.uuid }
            })

            res.render('user/create-routine', { workdays, infoExercises, routine })
        })
        .catch(err => next(err))
})


router.post('/submit-exercise/:routine_id/:day', isLoggedIn, checkRole('TRAINER', 'ADMIN'), (req, res, next) => {

    const { exercise, reps } = req.body
    const { routine_id, day } = req.params

    Routine
        .findById(routine_id)
        .then(routine => {
            const existingDay = routine.weekplan.find(d => d.day === day)
            if (existingDay) {
                const allExercise = reps + ' x ' + exercise
                existingDay.exercises.push(allExercise)
            } else {
                routine.weekplan.push({ day, exercises: [exercise] })
            }
            return Routine.findByIdAndUpdate(routine_id, routine)
        })
        .then(() => {
            const referer = req.headers.referer || '/'
            res.redirect(referer)
        })
        .catch(err => next(err))
})


router.get('/:trainer_id', isLoggedIn, checkRole('TRAINER', 'ADMIN'), (req, res, next) => {

    const { trainer_id } = req.params

    User
        .findById(trainer_id)
        .populate('clients')
        .then(({ clients }) => res.render('user/clients-list', { clients }))
        .catch(err => next(err))
})


router.post('/accept-client/:user_id', isLoggedIn, checkRole('TRAINER', 'ADMIN'), (req, res, next) => {

    const { user_id } = req.params
    const currentUser = req.session.currentUser?._id

    User
        .findByIdAndUpdate(currentUser, { $addToSet: { clients: user_id }, $pull: { applications: user_id } })
        .then(() => res.redirect(`/clients/${currentUser}`))
        .catch(err => next(err))
})






module.exports = router