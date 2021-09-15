const { response } = require('express');
const { Flete } = require('../models');

//obtener nombre -paginado-total-populate
const obtenerFletes = async(req,res = response) => {
    const {limite = 5 ,desde = 0}=req.query;
    const query = {estado :true};

    const [total,fletes] = await Promise.all([
        Flete.countDocuments(query),
        Flete.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        fletes
    });
}

const obtenerFlete = async(req,res = response) => {
    
    const {id} = req.params;
    const flete = await Flete.findById(id);
    res.status(200).json(flete);
}

const crearFlete = async(req,res = response)=>{

    const nombre = req.body.nombre.toUpperCase();
    const precio = req.body.precio;
    
    const FleteDB = await Flete.findOne({nombre});

    if(FleteDB){
        return res.status(400).json({
            msg : `La flete ${FleteDB.nombre}, ya existe`
        });
    }
    //Generar data a guardar
    const data = {
        nombre,
        precio
    }

    const flete = new Flete(data);

    //Guardar en DB
    await flete.save();

    res.status(201).json(flete);
}

const actualizarFlete = async(req,res = response)=>{

    const {id} = req.params;
    const {estado,...data} = req.body;
     data.nombre = req.body.nombre.toUpperCase();
     data.precio = req.body.precio;
    
    const flete = await Flete.findByIdAndUpdate(id,data,{new : true });


    res.status(200).json(flete);
}
const EliminarFlete = async(req,res = response)=>{

    const {id} = req.params;    
    const flete = await Flete.findByIdAndUpdate(id,{ estado:false },{new : true });
    

    res.status(200).json(flete);
}
module.exports = {
    crearFlete,
    obtenerFletes,
    obtenerFlete,
    actualizarFlete,
    EliminarFlete
}