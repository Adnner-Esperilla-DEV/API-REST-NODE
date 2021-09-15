const { Schema,model} = require('mongoose');
const CotizacionSchema = Schema({
    fecha:{
        type:Date,
        required:[true,'La fecha es Obligatorio'],
        
    },
    lote:{
        type:Number,
        default:0,
        required:[true,'El lote  es Obligatorio'],
        unique : true
    },
    usuario:{
        type:Schema.Types.ObjectId,
        ref:'Usuario',
        required:[true,'El id del usuario  es Obligatorio'],
        
    },
    tipo_vehiculo:{
        type:Schema.Types.ObjectId,
        ref:'Tipo_vehiculo',
        required:[true,'El id del Tipo de Vehiculo  es Obligatorio'],
        
    },
    año:{
        type:String,
        required:[true,'El año  es Obligatorio'],
        
    },
    vin:{
        type:String,
       //required:[true,'El vin  es Obligatorio'],
       default:null
    },
    llave:{
        type:String,
        //required:[true,'La llave  es Obligatorio'],
        default:null
    },
    millaje:{
        type:String,
        //required:[true,'El millaje  es Obligatorio'],
        default:null
    },
    airbags:{
        type:String,
        //required:[true,'El airbag  es Obligatorio'],
        default:null
    },
    motor:{
        type:String,
        //required:[true,'El motor  es Obligatorio'],
        default:null
    },
    transmision:{
        type:String,
        //required:[true,'La transmision  es Obligatoria'],
        default:null
    },
    precio_web:{
        type:Number,
        default:0
        //required:[true,'El precio Web  es Obligatorio'],
        
    },
    precio_web_total:{
        type:Number,
        default:0
        //required:[true,'El precio web total  es Obligatorio'],
        
    },
    servicio_logistico:{
        type:Number,
        default:0
        //required:[true,'El precio total  es Obligatorio'],
        
    },
    grua:{
        type:Schema.Types.ObjectId,
        ref:'Grua',
        required:[true,'El id de grua es Obligatorio'],
        
    },
    flete:{
        type:Schema.Types.ObjectId,
        ref:'Flete',
        required:[true,'El id de  flete  es Obligatorio'],
        
    },
    precio_total:{
        type:Number,
        default:0
        
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    }
    
});

CotizacionSchema.methods.toJSON = function(){
    const { __v, estado, ...data  } = this.toObject();
    return data;

}
module.exports=model('Cotizacion',CotizacionSchema);