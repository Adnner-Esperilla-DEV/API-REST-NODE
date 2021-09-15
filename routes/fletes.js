const { Router } = require('express');
const { check } = require('express-validator');
const { crearFlete,
    obtenerFletes,
    obtenerFlete, 
    actualizarFlete,
    EliminarFlete} = require('../controllers/fletes');
const { existeFletePorId } = require('../helpers/db-validators');
const { validarJWT,validarCampos,esAdminRole } = require('../middlewares');
const router = Router();

//Obtener todos los tipos de  fletes -Admin
router.get('/',obtenerFletes);

//Obtener un tipos de fletes - Admin
router.get('/:id',[
    check('id','No es un id de Mongo valido').isMongoId(),       
    check('id').custom(existeFletePorId),
    validarCampos,
],obtenerFlete);

//Crear un tipos de fletes - Admin
router.post('/',[
    validarJWT,
    esAdminRole,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos

],crearFlete)

//Actualizar tipos de fletes - Admin
router.put('/:id',[
    validarJWT,
    esAdminRole,
    //check('nombre','El nombre es obligatorio').not().isEmpty(),
    //check('precio','El precio es obligatorio').not().isEmpty(),
    check('id').custom(existeFletePorId),
    validarCampos
],actualizarFlete)
//Delete tipos de fletes - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo valido').isMongoId(), 
    check('id').custom(existeFletePorId),
    validarCampos
],EliminarFlete)
module.exports=router;