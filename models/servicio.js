const { Schema,model} = require('mongoose');
const ServicioSchema = Schema({
    cotizacion:{
        type:Schema.Types.ObjectId,
        ref:'Cotizacion',
        required:[true,'El id de  cotizacion es Obligatorio'],
        unique : true
    },
    fecha_compra:{
        type:Date,
        required:[true,'La fecha de compra es Obligatoria'],
    },
    fecha_pago:{
        type:Date,
        default:null     
    },
    multa:{
        type:Number,
        default:0
        
    },
    total_flete:{
        type:Number,
        default:0
        
    },
    numero_contenedor:{
        type:String,
        default:null      
    },
    fecha_llegada:{
        type:Date,
        default:null 
    },
    apuntes:{
        type:String,
        default:null    
    },
    seguimiento:{
        type:String,
        required:[true,'El seguimiento es Obligatorio'],
        emun:['COMPRADO','PAGADO','RECODIGO','EMBARCADO','LLEGO']
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    }
    
});

ServicioSchema.methods.toJSON = function(){
    const { __v, estado, ...data  } = this.toObject();
    return data;

}
module.exports=model('Servicio',ServicioSchema);