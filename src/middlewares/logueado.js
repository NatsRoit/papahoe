const fs = require("fs");
const path = require("path");

let logueado = (function(req, res, next) {
    if (req.session.usuario){
        next();
    } else {
    // if user is not logged-in redirect back to login page //
        res.redirect('/user/login');
    }
});

module.exports = logueado;

