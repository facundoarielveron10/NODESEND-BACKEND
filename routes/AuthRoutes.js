// ---- IMPORTACIONES ---- //
const AuthController = require('../controllers/AuthController');
const { check } = require('express-validator');
// ----------------------- //

// ---- MIDDLEWARE ---- //
const auth = require('../middleware/AuthMiddleware');
// -------------------- //

// ---- EXPRESS ---- //
const express = require('express');
const router = express.Router();
// ----------------- //

// ---- RUTAS DE AUTENTICACION ---- //
// POST
router.post(
    '/',
    [
        check('email', 'Agrega un Email valido').isEmail(),
        check('password', 'El Pasword es obligatorio').not().isEmpty(),
    ],
    AuthController.autenticarUsuario
);

// GET
router.get('/', auth, AuthController.usuarioAutenticado);
// -------------------------------- //

// ---- EXPORTACIONES ---- //
module.exports = router;
// ----------------------- //
