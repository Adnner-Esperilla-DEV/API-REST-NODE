const { response } = require('express');
const { Imagen } = require('../models');

//obtener tipo -paginado-total-populate
const obtenerImagenes = async(req,res = response) => {
    const {limite = 5 ,desde = 0}=req.query;
    const query = {estado :true};

    const [total,Imagenes] = await Promise.all([
        Imagen.countDocuments(query),
        Imagen.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        Imagenes
    });
}

const obtenerImagen = async(req,res = response) => {
    
    const {id} = req.params;
    const Imagen = await Imagen.findById(id);
    res.status(200).json(Imagen);
}

const crearImagen = async(req,res = response)=>{

    const {estado,...body}=req.body;
    const cotizacion = req.body.cotizacion;
    const tipo = req.body.tipo;
    const ImagenPrincipalDB = await Imagen.findOne({cotizacion,tipo});   
    if(ImagenPrincipalDB && ImagenPrincipalDB.tipo=='PRINCIPAL'){     
            return res.status(400).json({
                msg : `La Cotizacion :${ImagenPrincipalDB.cotizacion}, ya tiene una imagen tipo PRINCIPAL`
            });                     
    }
    //Generar data a guardar
    const data = {
        ...body
       // usuario:req.usuario._id
    }

    const imagen = new Imagen(data);

    //Guardar en DB
    await imagen.save();

    res.status(201).json(imagen);
}

const actualizarImagen = async(req,res = response)=>{

    const {id} = req.params;
    const {estado,...data} = req.body;
    
    const imagen = await Imagen.findByIdAndUpdate(id,data,{new : true });


    res.status(200).json(imagen);
}
const EliminarImagen = async(req,res = response)=>{

    const {id} = req.params;    
    const Imagen = await Imagen.findByIdAndUpdate(id,{ estado:false },{new : true });
    

    res.status(200).json(Imagen);
}
module.exports = {
    crearImagen,
    obtenerImagenes,
    obtenerImagen,
    actualizarImagen,
    EliminarImagen
}