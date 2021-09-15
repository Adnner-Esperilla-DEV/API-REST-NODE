const { response } = require('express');
const { Tipo_vehiculo } = require('../models');

//obtener tipo -paginado-total-populate
const obtenerTipoVehiculos = async(req,res = response) => {
    const {limite = 5 ,desde = 0}=req.query;
    const query = {estado :true};

    const [total,tipo_vehiculos] = await Promise.all([
        Tipo_vehiculo.countDocuments(query),
        Tipo_vehiculo.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        tipo_vehiculos
    });
}

const obtenerTipoVehiculo = async(req,res = response) => {
    
    const {id} = req.params;
    const tipo_vehiculo = await Tipo_vehiculo.findById(id);
    res.status(200).json(tipo_vehiculo);
}

const crearTipoVehiculo = async(req,res = response)=>{

    const marca = req.body.marca.toUpperCase();
    const modelo = req.body.modelo.toUpperCase();
    const tipo = req.body.tipo.toUpperCase();
    
    const TipoVehiculoDB = await Tipo_vehiculo.findOne({modelo});

    if(TipoVehiculoDB){
        return res.status(400).json({
            msg : `El modelo ${TipoVehiculoDB.modelo}, ya existe`
        });
    }
    //Generar data a guardar
    const data = {
        marca,
        modelo,
        tipo
    }

    const tipo_vehiculo = new Tipo_vehiculo(data);

    //Guardar en DB
    await tipo_vehiculo.save();

    res.status(201).json(tipo_vehiculo);
}

const actualizarTipoVehiculo = async(req,res = response)=>{

    const {id} = req.params;
    const {estado,...data} = req.body;
     data.marca = req.body.marca.toUpperCase();
     data.modelo = req.body.modelo.toUpperCase();
     data.tipo = req.body.tipo.toUpperCase();
    
    const tipo_vehiculo = await Tipo_vehiculo.findByIdAndUpdate(id,data,{new : true });


    res.status(200).json(tipo_vehiculo);
}
const EliminarTipoVehiculo = async(req,res = response)=>{

    const {id} = req.params;    
    const tipo_vehiculo = await Tipo_vehiculo.findByIdAndUpdate(id,{ estado:false },{new : true });
    

    res.status(200).json(tipo_vehiculo);
}
module.exports = {
    crearTipoVehiculo,
    obtenerTipoVehiculos,
    obtenerTipoVehiculo,
    actualizarTipoVehiculo,
    EliminarTipoVehiculo
}