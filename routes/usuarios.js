// ---- IMPORTACIONES ---- //
const UsuarioController = require('../controllers/UsuarioController');
// ----------------------- //

// ---- EXPRESS ---- //
const express = require('express');
const router = express.Router();
// ----------------- //

// ---- RUTAS DE USUARIOS ---- //
// POST
router.post('/', UsuarioController.nuevoUsuario);
// --------------------------- //

// ---- EXPORTACIONES ---- //
module.exports = router;
// ----------------------- //
