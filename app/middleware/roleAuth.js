
const { verifyToken } = require('../helpers/generateToken')
const userModel = require('../models/users')

const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop() //231231321
        const tokenData = await verifyToken(token)
        const userData = await userModel.findById(tokenData._id) //696966

        //['user'].includes('user')
        if ([].concat(roles).includes(userData.role)) {
            next()
        } else {
            res.status(409)
            res.send({ error: 'No tienes permisos' })
        }

    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({ error: 'Tu por aqui no pasas!' })
    }

}

module.exports = checkRoleAuth