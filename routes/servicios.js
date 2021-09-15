const { Router } = require('express');
const { check } = require('express-validator');
const { crearServicio,
    obtenerServicios,
    obtenerServicio, 
    actualizarServicio,
    EliminarServicio} = require('../controllers/servicios');
const { existeServicioPorId, existeCotizacionPorId } = require('../helpers/db-validators');
const { validarJWT,validarCampos,esAdminRole } = require('../middlewares');
const router = Router();

//Obtener todos las  Servicios -Admin
router.get('/',obtenerServicios);

//Obtener un  tipo de Servicios - Admin
router.get('/:id',[
    check('id','No es un id de Mongo valido').isMongoId(),       
    check('id').custom(existeServicioPorId),
    validarCampos,
],obtenerServicio);

//Crear una Servicio - Admin
router.post('/',[
    validarJWT,
    esAdminRole,
    check('cotizacion','No es un id de Mongo valido').isMongoId(),       
    check('cotizacion').custom(existeCotizacionPorId),
    check('fecha_compra','La fecha de compra  es obligatorio').not().isEmpty(),
    check('seguimiento','La grua es obligatorio').not().isEmpty(), 
    validarCampos

],crearServicio)

//Actualizar  una Servicio - Admin
router.put('/:id',[
    validarJWT,
    esAdminRole,check('id','No es un id de Mongo valido').isMongoId(), 
    check('id').custom(existeServicioPorId),
    validarCampos
],actualizarServicio)
//Delete  una Servicios - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo valido').isMongoId(), 
    check('id').custom(existeServicioPorId),
    validarCampos
],EliminarServicio)

module.exports=router;