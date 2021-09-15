const { response } = require('express');
const { Grua } = require('../models');

//obtener tipo -paginado-total-populate
const obtenerGruas = async(req,res = response) => {
    const {limite = 5 ,desde = 0}=req.query;
    const query = {estado :true};

    const [total,gruas] = await Promise.all([
        Grua.countDocuments(query),
        Grua.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        gruas
    });
}

const obtenerGrua = async(req,res = response) => {
    
    const {id} = req.params;
    const Grua = await Grua.findById(id);
    res.status(200).json(Grua);
}

const crearGrua = async(req,res = response)=>{

    const state = req.body.state.toUpperCase();
    const ciudad = req.body.ciudad.toUpperCase();
    const precio = req.body.precio;
    
    const GruaDB = await Grua.findOne({ciudad});

    if(GruaDB){
        return res.status(400).json({
            msg : `La grua ${GruaDB.ciudad}, ya existe`
        });
    }
    //Generar data a guardar
    const data = {
        state,
        ciudad,
        precio
    }

    const grua = new Grua(data);

    //Guardar en DB
    await grua.save();

    res.status(201).json(grua);
}

const actualizarGrua = async(req,res = response)=>{

    const {id} = req.params;
    const {estado,...data} = req.body;
     data.state = req.body.state.toUpperCase();
     data.ciudad = req.body.ciudad.toUpperCase();
     data.precio = req.body.precio;
    
    const grua = await Grua.findByIdAndUpdate(id,data,{new : true });


    res.status(200).json(grua);
}
const EliminarGrua = async(req,res = response)=>{

    const {id} = req.params;    
    const grua = await Grua.findByIdAndUpdate(id,{ estado:false },{new : true });
    

    res.status(200).json(grua);
}
module.exports = {
    crearGrua,
    obtenerGruas,
    obtenerGrua,
    actualizarGrua,
    EliminarGrua
}