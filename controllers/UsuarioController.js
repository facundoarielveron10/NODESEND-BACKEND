// ---- IMPORTACIONES ---- //
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
// ----------------------- //

// ---- CONTROLADOR DE USUARIOS ---- //
exports.nuevoUsuario = async (req, res) => {
    const { nombre, email, password } = req.body;

    // MOSTRAR ERRORES DE EXPRESS VALIDATOR
    const errores = validationResult(req);

    try {
        // VALIDAR QUE ESTEN TODOS LOS DATOS PRESENTES
        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() });
        }

        // VALIDAR QUE EL USUARIO NO EXISTA
        let usuario = await Usuario.findOne({ email });

        if (usuario) {
            return res
                .status(400)
                .json({ msg: 'El usuario ya esta registrado' });
        }

        // CREAR UN NUEVO USUARIO
        usuario = new Usuario(req.body);

        // HASHEAR EL PASSWORD
        const salt = await bcrypt.genSalt(10);
        usuario.password = await bcrypt.hash(password, salt);

        await usuario.save();
    } catch (error) {
        console.log(error);
    }

    res.json({ msg: 'Usuario Creado Correctamente' });
};
// --------------------------------- //
