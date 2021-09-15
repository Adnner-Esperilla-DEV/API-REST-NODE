const { response } = require('express');
const { Cotizacion } = require('../models');

//obtener nombre -paginado-total-populate
const obtenerCotizaciones = async(req,res = response) => {
    const {limite = 5 ,desde = 0}=req.query;
    const query = {estado :true};

    const [total,Cotizaciones] = await Promise.all([
        Cotizacion.countDocuments(query),
        Cotizacion.find(query)
            .populate('usuario',['nombre','apellido','telefono','correo'])
            .populate('tipo_vehiculo',['marca','modelo','tipo'])
            .populate('grua',['state','ciudad','precio'])
            .populate('flete',['nombre','precio'])
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        Cotizaciones
    });
}

const obtenerCotizacion = async(req,res = response) => {
    
    const {id} = req.params;
    const cotizacion = await Cotizacion.findById(id)
    .populate('usuario',['nombre','apellido','telefono','correo'])
    .populate('tipo_vehiculo',['marca','modelo','tipo'])
    .populate('grua',['state','ciudad','precio'])
    .populate('flete',['nombre','precio'])
    res.status(200).json(cotizacion);
}

const crearCotizacion = async(req,res = response)=>{

    const {estado,...body}=req.body;
    
    const CotizacionDB = await Cotizacion.findOne({lote: body.lote});

    if(CotizacionDB){
        return res.status(400).json({
            msg : `La cotizacion ${CotizacionDB.lote}, ya existe`
        });
    }
    //Generar data a guardar
    const data = {
        ...body
       // usuario:req.usuario._id
    }

    const cotizacion = new Cotizacion(data);

    //Guardar en DB
    await cotizacion.save();

    res.status(201).json(cotizacion);
}

const actualizarCotizacion = async(req,res = response)=>{

    const {id} = req.params;
    const {estado,...data} = req.body;
    
    const cotizacion = await Cotizacion.findByIdAndUpdate(id,data,{new : true });


    res.status(200).json(cotizacion);
}
const EliminarCotizacion = async(req,res = response)=>{

    const {id} = req.params;    
    const cotizacion = await Cotizacion.findByIdAndUpdate(id,{ estado:false },{new : true });
    

    res.status(200).json(cotizacion);
}
module.exports = {
    crearCotizacion,
    obtenerCotizaciones,
    obtenerCotizacion,
    actualizarCotizacion,
    EliminarCotizacion
}