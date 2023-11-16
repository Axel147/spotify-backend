const { verifyToken } = require('../helpers/generateToken')

const checkAuth = async(req, res, next) => {
    try {
        //authorization: Bearer 1010101010101001010100 
        const token = req.headers.authorization.split(' ').pop() //123123213
        const tokenData = await verifyToken(token)
        if (token) {
            next()
        } else {
            res.status(409)
            res.send({ error: 'Tu por aqui no pasas!' })
        }

    } catch (e) {
        console.log(e)
        res.status(409)
        res.send({ error: 'Tu por aqui no pasas!' })
    }

}

module.exports = checkAuth