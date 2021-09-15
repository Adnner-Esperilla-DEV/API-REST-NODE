const { Router } = require('express');
const { check } = require('express-validator');
const { crearImagen,
    obtenerImagenes,
    obtenerImagen, 
    actualizarImagen,
    EliminarImagen} = require('../controllers/imagenes');
const { existeImagenPorId } = require('../helpers/db-validators');
const { validarJWT,validarCampos,esAdminRole } = require('../middlewares');

const router = Router();

//Obtener todos las Imagenes -publico
router.get('/',obtenerImagenes);

//Obtener un Imagen  - publico
router.get('/:id',[
    check('id','No es un id de Mongo valido').isMongoId(),       
    check('id').custom(existeImagenPorId),
    validarCampos,
],obtenerImagen);

//Crear un Imagen  - privado
router.post('/',[
    validarJWT,
    esAdminRole,
    check('tipo','El tipo es obligatorio').not().isEmpty(),
    check('ruta','La ruta es obligatorio').not().isEmpty(),
    validarCampos

],crearImagen)

//Actualizar Imagen  - privado
router.put('/:id',[
    validarJWT,
    esAdminRole,
    //check('tipo','La tipo es obligatorio').not().isEmpty(),
    //check('ruta','El ruta es obligatorio').not().isEmpty(),
    //check('precio','El precio es obligatorio').not().isEmpty(),
    check('id').custom(existeImagenPorId),
    validarCampos
],actualizarImagen)

//Delete Imagen  - Admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id de Mongo valido').isMongoId(), 
    check('id').custom(existeImagenPorId),
    validarCampos
],EliminarImagen)
module.exports=router;