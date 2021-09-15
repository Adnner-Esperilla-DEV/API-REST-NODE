const { Router } = require('express');
const { check } = require('express-validator');
const { crearGrua,
    obtenerGruas,
    obtenerGrua, 
    actualizarGrua,
    EliminarGrua} = require('../controllers/gruas');
const { existeGruaPorId } = require('../helpers/db-validators');
const { validarJWT,validarCampos,esAdminRole } = require('../middlewares');

const router = Router();

//Obtener todos las gruas -publico
router.get('/',obtenerGruas);

//Obtener un grua  - publico
router.get('/:id',[
    check('id','No es un id de Mongo valido').isMongoId(),       
    check('id').custom(existeGruaPorId),
    validarCampos,
],obtenerGrua);

//Crear un grua  - privado
router.post('/',[
    validarJWT,
    esAdminRole,
    check('state','La state es obligatorio').not().isEmpty(),
    check('ciudad','El ciudad es obligatorio').not().isEmpty(),
    validarCampos

],crearGrua)

//Actualizar grua  - privado
router.put('/:id',[
    validarJWT,
    esAdminRole,
    //check('state','La state es obligatorio').not().isEmpty(),
    //check('ciudad','El ciudad es obligatorio').not().isEmpty(),
    //check('precio','El precio es obligatorio').not().isEmpty(),
    check('id').custom(existeGruaPorId),
    validarCampos
],actualizarGrua)

//Delete grua  - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo valido').isMongoId(), 
    check('id').custom(existeGruaPorId),
    validarCampos
],EliminarGrua)
module.exports=router;