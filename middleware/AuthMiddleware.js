// ---- IMPORTACIONES ---- //
const jwt = require('jsonwebtoken');
require('dotenv').config({ path: '.env' });
// ----------------------- //

// ---- MIDDLEWARE DE AUTENTICACION ---- //
module.exports = (req, res, next) => {
    // VERIFICAMOS QUE EXISTA EL JWT
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        res.status(401).json({ msg: 'Token No Valido' });
        return next();
    }

    // OBTENER EL TOKEN
    const token = authHeader.split(' ')[1];

    // COMPROBAR EL JWT SEA VALIDO
    try {
        // VERIFICAMOS EL JWT
        const usuario = jwt.verify(token, process.env.SECRET_JWT);
        // SE LO PASAMOS AL CONTROLADOR
        req.usuario = usuario;
    } catch (error) {
        res.status(401).json({ msg: 'Token No Valido' });
        console.log(error);
    }

    return next();
};
// ------------------------------------- //
