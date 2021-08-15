const Usuario = require('../models/usuario');

const emailExiste = async(correo = '')=>{
    //Verficiar si el correo existe
    const existeEmail=await Usuario.findOne({correo});
    if(existeEmail){
        throw new Error(`El correo: ${correo},ya esta registrado`);
    }
}
const existeUsuarioPorId = async(id)=>{
    //Verficiar si el correo existe
    const existeUsuario=await Usuario.findById(id);
    if(!existeUsuario){
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports={
    emailExiste,
    existeUsuarioPorId
}