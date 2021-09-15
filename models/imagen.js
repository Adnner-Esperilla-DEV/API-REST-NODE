const { Schema,model} = require('mongoose');
const ImagenSchema = Schema({
    cotizacion:{
        type:Schema.Types.ObjectId,
        ref:'Cotizacion',
        required:[true,'El id de  cotizacion es Obligatorio']
    },
    tipo:{
        type:String,
        required:[true,'El tipo  es Obligatorio'],
        default:'SECUNDARIA',
        emun:['PRINCIPAL','SECUNDARIA']
    },
    ruta:{
        type:String,
        required:[true,'La ruta  es Obligatorio']
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    }
    
});
ImagenSchema.methods.toJSON = function(){
    const { __v, estado, ...data  } = this.toObject();
    return data;

}

module.exports=model('Imagen',ImagenSchema);