
const fs = require("fs");
const path = require("path");

let archivoUsers =  fs.readFileSync(path.resolve(__dirname,'../database/usuarios.json'), {encoding: 'utf-8'});
let users;
  if (archivoUsers == "") {
    users = [];
  } else {
    users = JSON.parse(archivoUsers);
  };

let adminLog = (function(req, res, next) {
    res.locals.usuario = false;
    if(req.session.usuario){
        res.locals.usuario = req.session.usuario;
        if (req.session.usuario.role ==  'admin'){
        console.log('MIDDLE adminLog' + req.session)
// Si es admin, CREO UNA SESSION 
         next();}
    }   else if (req.session.role != "admin") {
        console.log('MIDDLE adminLog NO ADMIN' + req.session)
        next();
    }
});

module.exports = adminLog;

