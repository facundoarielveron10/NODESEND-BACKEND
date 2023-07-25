// ---- IMPORTACIONES ---- //
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
    console.log(req.archivo);

    try {
        fs.unlinkSync(__dirname + `/../uploads/${req.archivo}`);
        console.log('Archivo eliminado');
    } catch (error) {
        res.status(404).json({ msg: 'Hubo un error al eliminar el archivo' });
        console.log(error);
    }
};
// -------------------------------------- //
