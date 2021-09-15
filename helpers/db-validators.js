const {Usuario,Tipo_vehiculo,Grua,Flete,Cotizacion, Servicio, Imagen} = require('../models');

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
        throw new Error(`El id: ${id} no existe`);
    }
}
const existeTipoVehiculoPorId = async(id)=>{
    //Verficiar si el correo existe
    const existeTipoVehiculo=await Tipo_vehiculo.findById(id);
    if(!existeTipoVehiculo){
        throw new Error(`El id: ${id} no existe`);
    }
}
const existeGruaPorId = async(id)=>{
    //Verficiar si el correo existe
    const existeGrua=await Grua.findById(id);
    if(!existeGrua){
        throw new Error(`El id: ${id} no existe`);
    }
}
const existeFletePorId = async(id)=>{
    //Verficiar si el correo existe
    const existeFlete=await Flete.findById(id);
    if(!existeFlete){
        throw new Error(`El id: ${id} no existe`);
    }
}
const existeCotizacionPorId = async(id)=>{
    //Verficiar si el correo existe
    const existeCotizacion=await Cotizacion.findById(id);
    if(!existeCotizacion){
        throw new Error(`El id: ${id} no existe`);
    }
}
const existeServicioPorId = async(id)=>{
    //Verficiar si el correo existe
    const existeServicio=await Servicio.findById(id);
    if(!existeServicio){
        throw new Error(`El id: ${id} no existe`);
    }
}
const existeImagenPorId = async(id)=>{
    //Verficiar si el correo existe
    const existeImagen=await Imagen.findById(id);
    if(!existeImagen){
        throw new Error(`El id: ${id} no existe`);
    }
}

module.exports={
    emailExiste,
    existeUsuarioPorId,
    existeTipoVehiculoPorId,
    existeGruaPorId,
    existeFletePorId,
    existeCotizacionPorId,
    existeServicioPorId,
    existeImagenPorId
}