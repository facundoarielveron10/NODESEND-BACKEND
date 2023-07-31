// ---- IMPORTACIONES ---- //
const Enlaces = require('../models/EnlacesModel');
const multer = require('multer');
const shortid = require('shortid');
const fs = require('fs');
// ----------------------- //

// ---- CONTROLADOR DE ARCHIVOS --------- //
exports.subirArchivo = (req, res, next) => {
    // CONFIGURAR MULTER PARA LA SUBIDA DE ARCHIVOS
    const configuracionMulter = {
        limits: {
            fileSize: req.usuario ? 1024 * 1024 * 10 : 1024 * 1024,
        },
        storage: (fileStorage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname + '/../uploads');
            },
            filename: (req, file, cb) => {
                const extension = file.originalname.substring(
                    file.originalname.lastIndexOf('.'),
                    file.originalname.length
                );
                cb(null, `${shortid.generate()}${extension}`);
            },
        })),
    };
    const upload = multer(configuracionMulter).single('archivo');

    // SUBIR EL ARCHIVO
    upload(req, res, async (error) => {
        if (error) {
            res.status(404).json({
                msg: 'Hubo un error al subir el archivo, revisa el tamaño del archivo',
            });
            console.log(error);
            return next();
        }

        res.json({ archivo: req.file.filename });
    });
};

exports.eliminarArchivo = (req, res) => {
    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`);
    } catch (error) {
        res.status(404).json({ msg: 'Hubo un error al eliminar el archivo' });
        console.log(error);
    }
};

exports.descargar = async (req, res, next) => {
    const { archivo } = req.params;
    // Obtener el enlace del archivo
    const enlace = await Enlaces.findOne({ nombre: archivo });
    // Buscamos el archivo a descargar
    const ubicacionArchivo = __dirname + '/../uploads/' + archivo;
    // Le permitimos descargar el archivo
    res.download(ubicacionArchivo);
    // Eliminar el archivo si es necesario
    const { descargas, nombre } = enlace;

    if (descargas === 1) {
        // ELIMINAR EL ARCHIVO
        req.archivo = nombre;
        // ELIMINAR LA ENTRADA DE LA BASE DE DATOS
        await Enlaces.findOneAndRemove(enlace.id);
        next();
    } else {
        enlace.descargas--;
        await enlace.save();
    }
};
// -------------------------------------- //
