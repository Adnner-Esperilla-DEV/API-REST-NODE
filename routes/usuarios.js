const { Router } = require('express');
const { check } = require('express-validator');

//const {validarCampos} = require('../middlewares/validar-campos');
//const { validarJWT } = require('../middlewares/validar-jwt');
//const { esAdminRole } = require('../middlewares/validar-roles');
const {
        validarCampos,
        validarJWT,esAdminRole
} = require('../middlewares');
const { emailExiste,existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet, 
        usuariosPost,
        usuariosPut,
        usuariosPath,
        usuariosDelete } = require('../controllers/usuarios');




const router = Router();

router.get('/',usuariosGet);

router.post('/',[
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('correo','El correo no es valido').isEmail(),
        check('correo').custom(emailExiste),
        check('password','El password debe ser mas de 6 letras').isLength({min:6}),
        check('rol','No es un rol valido').isIn(['ADMIN_ROLE','CLIENTE_ROLE']),
        validarCampos

],usuariosPost);

router.put('/:id',[
        check('id','No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol','No es un rol valido').isIn(['ADMIN_ROLE','CLIENTE_ROLE']),
        validarCampos
],usuariosPut);

router.patch('/',usuariosPath);

router.delete('/:id',[
        validarJWT,
        esAdminRole,
        check('id','No es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
],usuariosDelete);


module.exports=router;