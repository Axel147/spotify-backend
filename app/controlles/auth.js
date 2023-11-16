const { httpError } = require('../helpers/handleError')
const { encrypt, compare } = require('../helpers/handleBcrypt')
const { tokenSign } = require('../helpers/generateToken')
const userModel = require('../models/users')

//TODO: Login!
const loginCtrl = async(req, res) => {
    try {

        const mockUser = {
            name: 'Axel',
            email: 'test@test.com',
            password: '12345678',
            avatar: 'https://w7.pngwing.com/pngs/605/384/png-transparent-dark-souls-iii-chibi-dark-souls-artorias-of-the-abyss-dark-souls-fictional-character-tail-souls.png'
        }

        const { email, password } = req.body


        if (mockUser.email !== 'test@test.com') {
            res.status(404)
            res.send({ error: 'User not found' })
        }

        const checkPassword = (mockUser.password === password)

        //TODO JWT 👉
        const tokenSession = await tokenSign(mockUser) //2d2d2d2d2d2d2

        if (checkPassword) { //Contraseña es correcta!
            res.send({
                data: mockUser,
                tokenSession
            })
            return
        }

        if (!checkPassword) {
            res.status(409)
            res.send({
                error: 'Invalid password'
            })
            return
        }

    } catch (e) {
        httpError(res, e)
    }
}

//Registramos usuario!
const registerCtrl = async(req, res) => {
    try {
        // Datos que envias desde el front (postman)
        const { email, password, name } = req.body

        const passwordHash = await encrypt(password) // (12345678)<--- Encriptando!!
        const registerUser = await userModel.create({
            email,
            name,
            password: passwordHash
        })

        res.send({ data: registerUser })

    } catch (e) {
        httpError(res, e)
    }
}



module.exports = { loginCtrl, registerCtrl }