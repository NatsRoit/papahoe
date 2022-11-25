const path = require('path');
const multer = require("multer")
const multerDiskStorage = multer.diskStorage({
    destination: function(req, file, cb) {       // request, archivo y callback que almacena archivo en destino
     cb(null, path.join(__dirname,"../../public/images/usuarios"));    // Ruta donde almacenamos el archivo
    },
    filename: function(req, file, cb) {          // request, archivo y callback que almacena archivo en destino
     let nombreArchivo = 'user-' + Date.now() + path.extname(file.originalname)  // milisegundos y extensión de archivo original
     cb(null, nombreArchivo);         
    }
});

const upload = multer({ storage: multerDiskStorage });

module.exports = upload;



  