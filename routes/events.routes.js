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

    let updatedImg = ""

    if (req.file) {
        const { path: imageUrl } = req.file
        updatedImg = imageUrl
    } else {
        updatedImg = undefined
    }

    Event
        .create({ eventname, description, date, participants, imageUrl: updatedImg })
        .then(() => res.redirect('/events/create-event'))
        .catch(err => next(err))
})

router.get('/event-list', isLoggedIn, (req, res, next) => {

    Event
        .find()
        .then(events => res.render('events/event-list', { events }))
        .catch(err => next(err))

})

router.get('/edit-event/:event_id', isLoggedIn, (req, res, next) => {

    const { event_id } = req.params

    User
        .findById(event_id)
        .then(user => res.render('events/edit-event', user))
        .catch(err => next(err))
})

// router.post('/edit-event', isLoggedIn, uploaderMiddleware.single('imageUrl'), (req, res, next) => {

//     const { eventname, description, date, participants, event_id } = req.body

//     let updatedImg = ""

//     if (req.file) {
//         const { path: imageUrl } = req.file
//         updatedImg = imageUrl
//     } else {
//         updatedImg = undefined
//     }

//     Event
//         .findByIdAndUpdate(event_id, { eventname, description, date, participants, imageUrl: updatedImg })
//         .then(user => res.redirect('/events/event-list'))
//         .catch(err => next(err))
// })




module.exports = router