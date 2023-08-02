// ---- IMPORTACIONES ---- //
const EnlacesController = require('../controllers/EnlacesController');
const { check } = require('express-validator');
// ----------------------- //

// ---- MIDDLEWARE ---- //
const auth = require('../middleware/AuthMiddleware');
// -------------------- //

// ---- EXPRESS ---- //
const express = require('express');
const router = express.Router();
// ----------------- //

// ---- RUTAS DE ENLACES ---- //
// POST
router.post(
    '/',
    [
        check('nombre', 'Sube un archivo').not().isEmpty(),
        check('nombre_original', 'Sube un archivo').not().isEmpty(),
    ],
    auth,
    EnlacesController.nuevoEnlace
);

router.post(
    '/:url',
    EnlacesController.verificarPassword,
    EnlacesController.obtenerEnlace
);

// GET
router.get('/', EnlacesController.todosEnlaces);

router.get(
    '/:url',
    EnlacesController.tienePassword,
    EnlacesController.obtenerEnlace
);
// -------------------------------- //

// ---- EXPORTACIONES ---- //
module.exports = router;
// ----------------------- //
