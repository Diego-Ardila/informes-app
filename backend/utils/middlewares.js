const jwt = require('jsonwebtoken')

//Middleware de autenticacion del usuario validando que el token suministrado en los headers sea valido y este vigente
module.exports = {
    auth: async (req,res,next) => {
        try{
            const [ Bearer, token ] = req.headers.authorization.split(" ")
            if(!token) throw new Error("no esta autorizado para ingresar")
    
            const { id } = jwt.verify(token, process.env.SECRET_KEY)
            req.userId = id
            next()
        }catch(err){
            res.status(401).json({message: err.message})
        }
    }
}