const { Schema,model} = require('mongoose');
const FleteSchema = Schema({
    nombre:{
        type:String,
        required:[true,'La nombre es Obligatorio'],
        unique : true
    },
    precio:{
        type:Number,
        default:0,
        required:[true,'El precio  es Obligatorio']
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    }
    
});

module.exports=model('Flete',FleteSchema);