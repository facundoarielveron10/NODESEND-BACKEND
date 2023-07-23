// ---- MONGOOSE ---- //
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// ------------------ //

// ---- MODELO DE USUARIOS ---- //
const usuarioSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
});
// ---------------------------- //

// ---- EXPORTACIONES ---- //
module.exports = mongoose.model('Usuarios', usuarioSchema);
// ----------------------- //
