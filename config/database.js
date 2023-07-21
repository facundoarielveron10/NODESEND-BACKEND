// ---- BASE DE DATOS ---- //

// ---- MONGOOSE ---- //
const mongoose = require('mongoose');
// ------------------ //

// ---- DOTENV ---- //
require('dotenv').config({ path: '.env' });
// ---------------- //

// ---- FUNCIONES ---- //
const conectarDB = async () => {
	try {
		// CONECTARNOS A LA BASE DE DATOS
		await mongoose.connect(`${process.env.DB_URL}`, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('DB Conectada');
	} catch (error) {
		// MOSTRAMOS LA ALERTA EN CASO
		// DE QUE NO HAYA PODIDO CONECTAR A LA BASE DE DATOS
		console.log('Hubo un error');
		console.log(error);
		process.exit(1);
	}
};
// ------------------- //

// ----------------------- //

// ---- EXPORTACIONES ---- //
module.exports = conectarDB;
// ----------------------- //
