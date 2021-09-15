const { response } = require("express");
const { ObjectId} = require('mongoose').Types;
const { Usuario,Flete,Grua,Cotizacion ,Servicio, Tipo_vehiculo,Imagen}= require('../models');
const coleccionesPermitidas = [
    'usuarios',
    'fletes',
    'gruas',
    'cotizaciones',
    'servicios' ,
    'imagenes' 
];  

const buscarUsuarios = async(termino='',res=response) => {

    const esMongoID = ObjectId.isValid(termino);//TRUE

    if(esMongoID){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }
    const regex = new RegExp(termino,'i');

    const usuarios  = await Usuario.find({//count 
        $or : [{nombre:regex },{apellido : regex},{correo : regex },{telefono : regex}],
        $and : [{estado : true}]
    });
     res.json({
        results: usuarios
    });
}
const buscarFletes = async(termino='',res=response) => {

    const esMongoID = ObjectId.isValid(termino);//TRUE

    if(esMongoID){
        const flete = await Flete.findById(termino);
        return res.json({
            results: (flete) ? [flete] : []
        })
    }
    const regex = new RegExp(termino,'i');

    const fletes  = await Flete.find({ nombre:regex ,estado : true});
     res.json({
        results: fletes
    });
}
const buscarGruas = async(termino='',res=response) => {

    const esMongoID = ObjectId.isValid(termino);//TRUE

    if(esMongoID){
        const grua = await Grua.findById(termino);
        return res.json({
            results: (grua) ? [grua] : []
        })
    }
    const regex = new RegExp(termino,'i');

    const gruas  = await Grua.find({//count 
        $or : [{state:regex },{ciudad : regex}],
        $and : [{estado : true}]
    });
     res.json({
        results: gruas
    });
}
const buscarImagenes = async(termino='',res=response) => {

    const esMongoID = ObjectId.isValid(termino);//TRUE

    if(esMongoID){
        const imagen = await Imagen.find({cotizacion:termino})
        .populate('cotizacion',['lote','vin']);
        return res.json({
            results: (imagen) ? [imagen] : []
        })
    }else{
        return res.json({
            results: 'Solo se acepta ID de cotizacion valido'
        });
    }

    const regex = termino;
    const cotizaciones = await Cotizacion.find({ lote: regex,vin: regex})
    const imagenes  = await Imagen.find({
        $or : [{...cotizaciones.map(cotizacion =>({
                cotizacion: cotizacion._id
            }))},
            ],
            $and : [{estado : true}]
        }).populate('cotizacion',['lote','vin']);
        res.json({
            results: imagenes
        });
}

const buscarCortizaciones = async(termino='',res=response) => {

    const esMongoID = ObjectId.isValid(termino);//TRUE

    if(esMongoID){
        const cotizacion = await Cotizacion.findById(termino)
            .populate('usuario',['nombre','apellido','telefono','correo'])
            .populate('tipo_vehiculo',['marca','modelo','tipo'])
            .populate('grua',['state','ciudad','precio'])
            .populate('flete',['nombre','precio'])
        return res.json({
            results: (cotizacion) ? [cotizacion] : []
        })
    }
    const regex = new RegExp(termino,'i');
    const usuarios = await Usuario.find({ nombre: regex,apellido: regex,telefono: regex,correo: regex})
    const tipo_vehiculos = await Tipo_vehiculo.find({ marca: regex, modelo:regex, tipo:regex})
    const gruas = await Grua.find({ state: regex, ciudad:regex})
    const fletes = await Flete.find({ nombre: regex})
    const cotizaciones  = await Cotizacion.find    
    ({//count 
        $or : [{año : regex},{llave : regex},
        {...usuarios.map(usuario =>({
            usuario: usuario._id
        }))},
        {...tipo_vehiculos.map(tipo_vehiculo =>({
            tipo_vehiculo: tipo_vehiculo._id
        }))},
        {...gruas.map(grua =>({
            grua: grua._id
        }))},
        {...fletes.map(flete =>({
            flete: flete._id
        }))}
        ],
        $and : [{estado : true}]
    }).populate('usuario',['nombre','apellido','telefono','correo'])
    .populate('tipo_vehiculo',['marca','modelo','tipo'])
    .populate('grua',['state','ciudad','precio'])
    .populate('flete',['nombre','precio'])
     res.json({
        results: cotizaciones
    });
}

const buscar = ( req,res= response) =>{

    const {coleccion , termino} = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg:`Las colecciones permitidas son : ${coleccionesPermitidas}`
        })
    }

    switch(coleccion){
        case 'usuarios':
            buscarUsuarios(termino,res);
        break; 
        case 'fletes':
            buscarFletes(termino,res);
        break; 
        case 'gruas':
            buscarGruas(termino,res);
        break;
        case 'imagenes':
            buscarImagenes(termino,res);
        break;
        case 'cotizaciones':
            buscarCortizaciones(termino,res);
        break;
        
        case 'servicios':
            buscarServicios(termino,res);
        break;
        default:
            res.status(500).json({
                msg:'Se me olvido hacer esta busqueda'
            })  
    }

}

module.exports = {
    buscar
}