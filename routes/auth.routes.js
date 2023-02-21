const router = require('express').Router()
const bcrypt = require('bcryptjs')
const { isLoggedOut } = require('../middlewares/route-guards')
const User = require('../models/User.model')
const uploaderMiddleware = require('../middlewares/uploader.middleware')

const saltRounds = 10


router.get('/register', isLoggedOut, (req, res) => {
    res.render('auth/signup-form')
})

router.post('/register', uploaderMiddleware.single('imageUrl'), (req, res, next) => {
    const { username, email, userPassword, age, height, weight, injuries, role } = req.body
    let updatedImg = ""

    if (req.file) {
        const { path: imageUrl } = req.file
        updatedImg = imageUrl
    } else {
        updatedImg = undefined
    }

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(userPassword, salt))
        .then(passwordHash => User.create({ email, username, password: passwordHash, age, height, weight, injuries, role, imageUrl: updatedImg }))
        .then(() => res.redirect('/'))
        .catch(err => next(err))
})

router.get('/login', isLoggedOut, (req, res, next) => {
    res.render('auth/login-form')
})

router.post('/login', (req, res, next) => {
    const { email, userPassword } = req.body
    if (email.length === 0 || userPassword.length === 0) {
        res.render('auth/login-form', { errorMessage: 'Por favor, rellena los campos' })
        return
    }
    User
        .findOne({ email })
        .then(user => {
            // console.log(user)
            if (!user) {
                res.render('auth/login-form', { errorMessage: 'Usuario no registrado' })
            }
            else if (!bcrypt.compareSync(userPassword, user.password)) {
                res.render('auth/login-form', { errorMessage: 'Datos incorrectos (es la pwd...)' })
            }
            else {
                console.log(req.session)
                req.session.currentUser = user                // ESTO ES INICIAR SESIÓN
                // console.log('ESTO ES EL OBJETO req.session --->', req.session)
                res.redirect('/')
            }
        })
        .catch(err => next(err))
})

router.get('/logout', (req, res) => {
    req.session.destroy(() => res.redirect('/'))
})
module.exports = router