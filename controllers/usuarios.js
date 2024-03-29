const { response, request } = require('express');
const bcryptjs= require('bcryptjs');
const Usuario =require('../models/usuario');



const usuariosGet = async(req=request,res=response)=>{
    const {limite = 5 ,desde = 0}=req.query;
    const query = {estado :true};

    const [total,usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])
    res.json({
        total,
        usuarios
    });
}
const usuariosPost = async(req,res=response)=>{   
    const {nombre,apellido,telefono,correo,password,rol} = req.body;
    const usuario =new Usuario({nombre,apellido,telefono,correo,password,rol});
    
    //Encriptar contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password=bcryptjs.hashSync(password,salt);

    //Guardar en BD
    await usuario.save();
    
    res.json(usuario);
}
const usuariosPut = async(req,res=response)=>{
    const {id} =req.params;
    const {_id,password,google,correo,...resto } = req.body;

    //Todo validar contra base de datos
    if(password){
        //Encriptar contrasena
        const salt = bcryptjs.genSaltSync();
        resto.password=bcryptjs.hashSync(password,salt);
    }
    //ACTUALIZAR en BD
    const usuario = await Usuario.findByIdAndUpdate(id,resto,{new :true });
    res.json(usuario)
}
const usuariosPath = (req,res)=>{
    res.json({
        ok:true,
        msg:'patch API - Controlador'
    })
}
const usuariosDelete = async(req,res)=>{
    const {id}=req.params;
    //Fisicamente lo borramos
    //const usuario = await Usuario.findByIdAndDelete(id);
    const usuario = await Usuario.findByIdAndUpdate(id,{estado:false});
    res.json({usuario});
}

module.exports={
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPath,
    usuariosDelete

}