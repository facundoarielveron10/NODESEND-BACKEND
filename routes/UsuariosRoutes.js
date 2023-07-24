// ---- IMPORTACIONES ---- //
const UsuarioController = require('../controllers/UsuarioController');
const { check } = require('express-validator');
// ----------------------- //

// ---- EXPRESS ---- //
const express = require('express');
const router = express.Router();
// ----------------- //

// ---- RUTAS DE USUARIOS ---- //
// POST
router.post(
    '/',
    [
        check('nombre', 'El Nombre es Obligatorio').not().isEmpty(),
        check('email', 'Agrega un Email valido').isEmail(),
        check(
            'password',
            'El Password debe ser de al menos 6 caracteres'
        ).isLength({ min: 6 }),
    ],
    UsuarioController.nuevoUsuario
);
// --------------------------- //

// ---- EXPORTACIONES ---- //
module.exports = router;
// ----------------------- //
