// ---- ARCHIVO PRINCIPAL ---- //

// ---- EXPRESS ---- //
const express = require('express');
const conectarDB = require('./config/database');

const app = express();
// ----------------- //

// ---- CONECTAR DB ---- //
conectarDB();
// --------------------- //

console.log('Comenzando Node Send');

// ---- PUERTO APP ---- //
const port = process.env.PORT || 4000;
// -------------------- //

// ---- HABILITAR JSON ---- //
app.use(express.json());
// ------------------------ //

// ---- RUTAS APP ---- //
app.use('/api/usuarios', require('./routes/usuarios'));
// ------------------- //

// ---- INICIAR LA APP ---- //
app.listen(port, '0.0.0.0', () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});
// ------------------------ //

// --------------------------- //
