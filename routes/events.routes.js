const express = require('express');
const router = express.Router();
const Event = require('../models/Event.model')
const { isLoggedIn, checkRole } = require('../middlewares/route-guards')
const uploaderMiddleware = require('../middlewares/uploader.middleware')


router.get('/create-event', isLoggedIn, (req, res, next) => {
    res.render('events/create-event')
})

router.post('/create-event', isLoggedIn, uploaderMiddleware.single('imageUrl'), (req, res, next) => {

    const { eventname, description, date, participants } = req.body

    const imageUrl = req.file?.path

    Event
        .create({ eventname, description, date, participants, imageUrl })
        .then(() => res.redirect('/events/event-list'))
        .catch(err => next(err))
})

router.get('/event-list', isLoggedIn, (req, res, next) => {

    Event
        .find()
        .select({ eventname: 1, imageUrl: 1, description: 1, date: 1, participants: 1 })
        .sort({ eventname: 1 })
        .then(events => res.render('events/event-list', {
            events,
            isTrainer: req.session.currentUser?.role === "TRAINER",
            isAdmin: req.session.currentUser?.role === "ADMIN"
        }))
        .catch(err => next(err))

})

router.get('/edit-event/:event_id', isLoggedIn, (req, res, next) => {

    const { event_id } = req.params

    Event
        .findById(event_id)
        .then(event => res.render('events/edit-event', { event }))
        .catch(err => next(err))
})

router.post('/edit-event/:event_id', isLoggedIn, uploaderMiddleware.single('imageUrl'), (req, res, next) => {

    const { eventname, description, date, participants } = req.body
    const { event_id } = req.params

    const imageUrl = req.file?.path

    Event
        .findByIdAndUpdate(event_id, { eventname, description, date, participants, imageUrl })
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})

router.post('/delete/:event_id', isLoggedIn, (req, res, next) => {

    const { event_id } = req.params

    Event
        .findByIdAndDelete(event_id)
        .then(() => res.redirect('/events/event-list'))
        .catch(err => next(err))
})




module.exports = router