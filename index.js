// ---- ARCHIVO PRINCIPAL ---- //

// ---- EXPRESS ---- //
const express = require('express');
const app = express();
// ----------------- //

// ---- CONECTAR DB ---- //
const conectarDB = require('./config/database');
conectarDB();
// --------------------- //

// ---- HABILITAR URLS (CORS) ---- //
const cors = require('cors');
const opcionesCors = {
    origin: process.env.FRONTEND_URL,
};
app.use(cors(opcionesCors));
// ------------------------------- //

// ---- PUERTO APP ---- //
const port = process.env.PORT || 4000;
// -------------------- //

// ---- HABILITAR JSON ---- //
app.use(express.json());
// ------------------------ //

// ---- HABILITAR CARPETA PUBLICA ---- //
app.use(express.static('uploads'));
// ----------------------------------- //

// ---- RUTAS APP ---- //
app.use('/api/usuarios', require('./routes/UsuariosRoutes'));
app.use('/api/auth', require('./routes/AuthRoutes'));
app.use('/api/enlaces', require('./routes/EnlacesRoutes'));
app.use('/api/archivos', require('./routes/ArchivosRoutes'));
// ------------------- //

// ---- INICIAR LA APP ---- //
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});
// ------------------------ //

// --------------------------- //
