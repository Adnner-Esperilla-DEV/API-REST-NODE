const { response } = require("express")
const usuario = require("../models/usuario")



const esAdminRole = (req,res=response,next) =>{

    if(!req.usuario){
        return res.status(500).json({
            msg : 'Se quiere verificar el role sin validar el tokem primero'
        });
    }

    const {rol,nombre} = req.usuario;

    if(rol !=='ADMIN_ROLE'){
        return res.status(401).json({
            msg : ` ${nombre} no es un admin - No puede hacer esto`
        });
    }
    next();
}
module.exports = {
    esAdminRole
}