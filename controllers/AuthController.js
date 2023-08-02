// ---- IMPORTACIONES ---- //
const Usuario = require('../models/UsuarioModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });
const { validationResult } = require('express-validator');
// ----------------------- //

// ---- CONTROLADOR DE AUTENTICACION ---- //
exports.autenticarUsuario = async (req, res, next) => {
    const { email, password } = req.body;

    // MOSTRAR ERRORES DE EXPRESS VALIDATOR
    const errores = validationResult(req);

    try {
        // REVISAR SI HAY ERRORES
        if (!errores.isEmpty()) {
            return res.status(400).json({ errores: errores.array() });
        }

        // BUSCAR EL USUARIO
        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            res.status(401).json({ msg: 'El Usuario No Existe' });
            return next();
        }

        // VERIFICAR EL PASSWORD Y AUTENTICAR EL USUARIO
        if (!bcrypt.compareSync(password, usuario?.password)) {
            res.status(401).json({ msg: 'La Contraseña Es Incorrecta' });
            return next();
        }

        // CREAR JSON WEB TOKEN
        const token = jwt.sign(
            {
                id: usuario?._id,
                nombre: usuario?.nombre,
                email: usuario?.email,
            },
            process.env.SECRET_JWT,
            {
                expiresIn: '7d',
            }
        );

        // RETORNAMOS EL TOKEN
        res.json({ token });
    } catch (error) {
        res.status(401).json({ msg: 'Algo Salio Mal En La Autenticacion' });
        console.log(error);
    }
};

exports.usuarioAutenticado = (req, res) => {
    // RETORNAMOS EL USUARIO AUTENTICADO
    return res.json({ usuario: req?.usuario });
};
// -------------------------------------- //
