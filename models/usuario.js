const { Schema,model} = require('mongoose');
const UsuarioSchema = Schema({
    nombre:{
        type:String,
        required:[true,'El nombre es Obligatorio']
    },
    apellido:{
        type:String,
        //required:[true,'El apellido es Obligatorio']
    },
    telefono:{
        type:String,
        //required:[true,'El telefono es Obligatorio']
    },
    correo:{
        type:String,
        required:[true,'El correo es Obligatorio'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'El password es Obligatorio'],
    },
    google:{
        type:Boolean,
        default:false
    },
    rol:{
        type: String,
        required:true,
        emun:['ADMIN_ROLE','CLIENTE_ROLE']
    },
    img: {
        type: String,
    },
    estado:{
        type:Boolean,
        default:true
    },
});
UsuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario  } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports=model('Usuario',UsuarioSchema);