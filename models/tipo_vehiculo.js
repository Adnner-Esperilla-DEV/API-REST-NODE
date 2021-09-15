const { Schema,model} = require('mongoose');
const TipoVehiculoSchema = Schema({
    marca:{
        type:String,
        required:[true,'La marca es Obligatorio']
    },
    modelo:{
        type:String,
        required:[true,'El modelo es Obligatorio'],
        unique : true
    },
    tipo:{
        type:String,
        required:[true,'El tipo  es Obligatorio'],
        emun:['SEDAN','HATCHBACK','DEPORTIVO','SUV','PICK-UP',
            'VANS','STATION','MOTO','BUSES','MAQUINARIA']
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    }
    
});

module.exports=model('Tipo_vehiculo',TipoVehiculoSchema);