const { Router } = require('express');
const { check } = require('express-validator');
const { crearCotizacion,
    obtenerCotizaciones,
    obtenerCotizacion, 
    actualizarCotizacion,
    EliminarCotizacion} = require('../controllers/cotizaciones');
const { existeCotizacionPorId, existeUsuarioPorId, existeTipoVehiculoPorId, existeGruaPorId, existeFletePorId } = require('../helpers/db-validators');
const { validarJWT,validarCampos,esAdminRole } = require('../middlewares');
const router = Router();

//Obtener todos las  Cotizaciones -Admin
router.get('/',obtenerCotizaciones);

//Obtener un  tipo de Cotizacions - Admin
router.get('/:id',[
    check('id','No es un id de Mongo valido').isMongoId(),       
    check('id').custom(existeCotizacionPorId),
    validarCampos,
],obtenerCotizacion);

//Crear una Cotizacion - Admin
router.post('/',[
    validarJWT,
    esAdminRole,
    check('fecha','La fecha es obligatorio').not().isEmpty(),
    check('lote','La lote es obligatorio').not().isEmpty(),
    check('usuario','El usuario es obligatorio').not().isEmpty(),
    check('usuario','No es un id de Mongo valido').isMongoId(),       
    check('usuario').custom(existeUsuarioPorId),
    check('tipo_vehiculo','La tipo de vehiculo es obligatorio').not().isEmpty(),
    check('tipo_vehiculo','No es un id de Mongo valido').isMongoId(),       
    check('tipo_vehiculo').custom(existeTipoVehiculoPorId),
    check('año','El año es obligatorio').not().isEmpty(),
    check('grua','La grua es obligatorio').not().isEmpty(),
    check('grua','No es un id de Mongo valido').isMongoId(),       
    check('grua').custom(existeGruaPorId), 
    check('flete','El flete es obligatorio').not().isEmpty(), 
    check('flete','No es un id de Mongo valido').isMongoId(),       
    check('flete').custom(existeFletePorId),  
    validarCampos

],crearCotizacion)

//Actualizar  una Cotizacion - Admin
router.put('/:id',[
    validarJWT,
    esAdminRole,
    //check('fecha','La fecha es obligatorio').not().isEmpty(),
    //check('lote','La lote es obligatorio').not().isEmpty(),
    //check('usuario','La usuario es obligatorio').not().isEmpty(),
    //check('tipo_vehiculo','La tipo de vehiculo es obligatorio').not().isEmpty(),
    //check('año','El año es obligatorio').not().isEmpty(),
    //check('grua','La grua es obligatorio').not().isEmpty(),
   //check('flete','El flete es obligatorio').not().isEmpty(), 
    //check('id').custom(existeCotizacionPorId),
    check('id','No es un id de Mongo valido').isMongoId(), 
    check('id').custom(existeCotizacionPorId),
    validarCampos
],actualizarCotizacion)
//Delete  una Cotizacions - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo valido').isMongoId(), 
    check('id').custom(existeCotizacionPorId),
    validarCampos
],EliminarCotizacion)
module.exports=router;