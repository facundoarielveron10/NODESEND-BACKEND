// ---- IMPORTACIONES ---- //
const ArchivosController = require('../controllers/ArchivosController');
// ----------------------- //

// ---- MIDDLEWARE ---- //
const auth = require('../middleware/AuthMiddleware');
// -------------------- //

// ---- EXPRESS ---- //
const express = require('express');
const router = express.Router();
// ----------------- //

// ---- RUTAS DE ARCHIVOS ---- //
// POST
router.post('/', auth, ArchivosController.subirArchivo);

// GET
router.get(
    '/:archivo',
    ArchivosController.descargar,
    ArchivosController.eliminarArchivo
);
// --------------------------- //

// ---- EXPORTACIONES ---- //
module.exports = router;
// ----------------------- //
