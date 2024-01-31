const jwt = require('jsonwebtoken')

const tokenSign = async (user) => { //Genera Token
    const userInfo = jwt.sign(
        {

            email: user.email
        }, //Payload ! Carga útil
        process.env.JWT_SECRET, 
        {
            expiresIn: "2h",
        }
    );
    console.log(userInfo)
    return userInfo
}

const verifyToken = async (token) => {
    try {
        
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (e) {
        return null
    }
}

const decodeSign = (token) => { // Verificar que el token sea valido y correcto
    return jwt.decode(token, null)
}



module.exports = { tokenSign, decodeSign, verifyToken }