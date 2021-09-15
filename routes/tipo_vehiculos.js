const { Router } = require('express');
const { check } = require('express-validator');
const { crearTipoVehiculo,
    obtenerTipoVehiculos,
    obtenerTipoVehiculo, 
    actualizarTipoVehiculo,
    EliminarTipoVehiculo} = require('../controllers/tipo_vehiculos');
const { existeTipoVehiculoPorId } = require('../helpers/db-validators');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares');

const router = Router();

//Obtener todos los tipos de vehiculos -publico
router.get('/',obtenerTipoVehiculos);

//Obtener un tipos de vehiculos - publico
router.get('/:id',[
    check('id','No es un id de Mongo valido').isMongoId(),       
    check('id').custom(existeTipoVehiculoPorId),
    validarCampos,
],obtenerTipoVehiculo);

//Crear un tipos de vehiculos - privado
router.post('/',[
    validarJWT,
    esAdminRole,
    check('marca','La marca es obligatorio').not().isEmpty(),
    check('modelo','El modelo es obligatorio').not().isEmpty(),
    check('tipo','El ipo es obligatorio').not().isEmpty(),
    validarCampos

],crearTipoVehiculo)

//Actualizar tipos de vehiculos - privado
router.put('/:id',[
    validarJWT,
    esAdminRole,
    check('marca','La marca es obligatorio').not().isEmpty(),
    check('modelo','El modelo es obligatorio').not().isEmpty(),
    check('tipo','El ipo es obligatorio').not().isEmpty(),
    check('id').custom(existeTipoVehiculoPorId),
    validarCampos
],actualizarTipoVehiculo)

//Delete tipos de vehiculos - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo valido').isMongoId(), 
    check('id').custom(existeTipoVehiculoPorId),
    validarCampos
],EliminarTipoVehiculo)
module.exports=router;