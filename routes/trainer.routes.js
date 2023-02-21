const router = require('express').Router()
const User = require('../models/User.model')

const { isLoggedIn, checkRole } = require('../middlewares/route-guards')



//esta es la lista de clientes del entrenador
//                    :user_id
//                         |
//                         ↓   ↓----- islogged y el checkrole
router.get('/create-routine', (req, res, next) => {
    res.send('no ariesgo')
})


// router.post('/create-routine', (req, res, next) => {
// res.send('esta mierda funciona')
// })


//esta es la lista de clientes del entrenador
//       :trainer_id
//           |
//           ↓  ↓----- islogged y el checkrole
router.get('/:trainer_id', isLoggedIn, checkRole('TRAINER'), (req, res, next) => {
    const { trainer_id } = req.params

    User
        .findById(trainer_id)
        .then(({ clients }) => res.render('user/clients-list', { clients }))
        .catch(err => next(err))
})









router.get('/edit-routine/:routine_id')


module.exports = router