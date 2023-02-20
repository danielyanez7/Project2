const router = require('express').Router()
const User = require('../models/User.model')

const { isLoggedIn, checkRole } = require('../middlewares/route-guards')



//esta es la lista de clientes del entrenador
//       :trainer_id
//           |
//           ↓  ↓----- islogged y el checkrole
router.get('/', (req, res, next) => {
    res.send('hola')
})


//esta es la lista de clientes del entrenador
//                    :user_id
//                         |
//                         ↓   ↓----- islogged y el checkrole
router.get('/create-routine', (req, res, next) => {
    res.send('no ariesgo')
})



// router.post('/create-routine', (req, res, next) => {

// })





router.get('/edit-routine/:routine_id')


module.exports = router