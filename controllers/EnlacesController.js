// ---- IMPORTACIONES ---- //
const Enlaces = require('../models/EnlacesModel');
const shortid = require('shortid');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
// ----------------------- //

// ---- CONTROLADOR DE ENLACES ---- //
exports.nuevoEnlace = async (req, res, next) => {
	// MOSTRAR ERRORES DE EXPRESS VALIDATOR
	const errores = validationResult(req);

	try {
		// REVISAR SI HAY ERRORES
		if (!errores.isEmpty()) {
			return res.status(400).json({ errores: errores.array() });
		}

		// CREANDO EL OBJETO DEL ENLACE
		const { nombre_original } = req.body;
		const enlace = new Enlaces();
		enlace.url = shortid.generate();
		enlace.nombre = shortid.generate();
		enlace.nombre_original = nombre_original;

		// VERIFICAR SI EL USUARIO TIENE UNA CUENTA
		if (req.usuario) {
			const { password, descargas } = req.body;
			// ASIGNAR AL ENLACE EL NUMERO DE DESCARGAS
			if (descargas) {
				enlace.descargas = descargas;
			}
			// ASIGNAR EL PASSWORD
			if (password) {
				const salt = await bcrypt.genSalt(10);
				enlace.password = await bcrypt.hash(password, salt);
			}
			// ASIGNAR EL AUTOR
			enlace.autor = req.usuario.id;
		}

		// ALMACENAR EN LA BD
		await enlace.save();
		return res.json({ msg: `${enlace.url}` });
	} catch (error) {
		res.status(404).json({ msg: 'Hubo Un Error Al Generar El Enlace' });
		console.log(error);
	}
};
// -------------------------------- //
