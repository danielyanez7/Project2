const isLoggedIn = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    }
    else {
        res.render('auth/login-form', { errorMessage: 'Inicia sesión para continuar' })
    }
}


const isLoggedOut = (req, res, next) => {
    if (!req.session.currentUser) {
        next()
    }
    else {
        // res.send('hola')
        res.redirect('/user/profile')
    }
}

const checkRole = (...roles) => (req, res, next) => {
    if (roles.includes(req.session.currentUser.role)) {
        next()
    }
    else {
        res.render('auth/login-form', { errorMessage: 'No tienes los permisos necesarios' })
    }
}


module.exports = { isLoggedIn, isLoggedOut, checkRole }