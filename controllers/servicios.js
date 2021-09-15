const { response } = require('express');
const { Servicio } = require('../models');

const obtenerServicios = async(req,res = response) => {
    const {limite = 5 ,desde = 0}=req.query;
    const query = {estado :true};

    const [total,Servicios] = await Promise.all([
        Servicio.countDocuments(query),
        Servicio.find(query)
        .populate({path:'cotizacion',populate:{path:'usuario',select:'nombre apellido telefono correo'}})
        .populate({path:'cotizacion',populate:{path:'tipo_vehiculo',select:'marca modelo tipo'}})
        .populate({path:'cotizacion',populate:{path:'grua',select:'state ciudad precio'}})
        .populate({path:'cotizacion',populate:{path:'flete',select: 'nombre precio'}})
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        Servicios
    });
}

const obtenerServicio = async(req,res = response) => {
    
    const {id} = req.params;
    const servicio = await Servicio.findById(id)
    .populate({path:'cotizacion',populate:{path:'usuario',select:'nombre apellido telefono correo'}})
    .populate({path:'cotizacion',populate:{path:'tipo_vehiculo',select:'marca modelo tipo'}})
    .populate({path:'cotizacion',populate:{path:'grua',select:'state ciudad precio'}})
    .populate({path:'cotizacion',populate:{path:'flete',select: 'nombre precio'}})
    res.status(200).json(servicio);
}

const crearServicio = async(req,res = response)=>{

    const {estado,...body}=req.body;
    
    const ServicioDB = await Servicio.findOne({cotizacion: body.cotizacion});

    if(ServicioDB){
        return res.status(400).json({
            msg : `El Servicio ${ServicioDB.cotizacion}, ya existe`
        });
    }
    //Generar data a guardar
    const data = {
        ...body
       // usuario:req.usuario._id
    }

    const servicio = new Servicio(data);

    //Guardar en DB
    await servicio.save();

    res.status(201).json(servicio);
}

const actualizarServicio = async(req,res = response)=>{

    const {id} = req.params;
    const {estado,...data} = req.body;
    
    const servicio = await Servicio.findByIdAndUpdate(id,data,{new : true });


    res.status(200).json(servicio);
}
const EliminarServicio = async(req,res = response)=>{

    const {id} = req.params;    
    const servicio = await Servicio.findByIdAndUpdate(id,{ estado:false },{new : true });
    

    res.status(200).json(servicio);
}
module.exports = {
    crearServicio,
    obtenerServicios,
    obtenerServicio,
    actualizarServicio,
    EliminarServicio
}