const { Schema,model} = require('mongoose');
const GruaSchema = Schema({
    state:{
        type:String,
        required:[true,'La Estado es Obligatorio'],
        unique:true
    },
    ciudad:{
        type:String,
        required:[true,'La ciudad es Obligatorio']
    },
    precio:{
        type:Number,
        default:0
    },
    estado:{
        type:Boolean,
        default:true,
        required:true
    }
    
});

module.exports=model('Grua',GruaSchema);