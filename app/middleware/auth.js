const { verifyToken } = require('../helpers/generateToken')

const checkAuth = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop()
        const tokenData = await verifyToken(token)
        if (token) {
            next()
        } else {
            res.status(409)
            res.send({ error: 'Acceso restringido a datos' })
        }

    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({ error: 'Error al acceso a datos' })
    }

}

module.exports = checkAuth