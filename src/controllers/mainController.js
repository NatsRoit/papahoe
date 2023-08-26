const path = require('path');
const fs = require('fs');
const db = require('../database/models');
const Op = db.Sequelize.Op;
const { validationResult } = require('express-validator');


// let productosJSON =  JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/productos.json')));

const main = {
    index: function(req,res){
        db.Product.findAll({
            include: [ { association: "marca" }, { association: "categoria"}],
        })
        .then(function (productos) {
            if (productos.length > 0) {
                return res.render('main/home',{productos});
            } else {
                next();
            }
        });
    },
    about: function(req,res){
        res.render('main/about');
    },
    devoluciones: function(req,res){
        res.render('main/devoluciones');
    },
    faqs: function(req,res){
        res.render('main/faqs');
    },
    politicaCancelacion: function(req,res){
        res.render('main/politica-cancelacion');
    },
    contactView: function(req,res){
        let sent = false;
        res.render('main/contact', {sent});
    },
    contact: function(req,res){
        const errors = validationResult(req);
        console.log(errors.array());

        if(errors.isEmpty()){
            // fs.appendFileSync(path.join(__dirname, "../../mensajes-contacto/" + req.body.email + "-" + Date.now() + ".txt"), / Dónde y con qué nombre
            // `De: ${req.body.nombre}: \n Mensaje: ${req.body.mensaje}`) / Qué dirá el file.txt

            let msgFile = fs.readFileSync(path.resolve(__dirname, '../database/mensajes-client.json'), {encoding: 'utf-8'}) // Me traigo el file>mensajes.json
            let msgArray = msgFile == ""? [] : JSON.parse(msgFile) // Creo un array con el contenido del file>mensajes.json

            let lastMsg = msgArray != []? msgArray.pop() : ""; // Saco el último mensaje para poder obtener el id del siguiente new msg
            lastMsg != undefined? msgArray.push(lastMsg) : "";
                
            let msgNew = {  // creo el template para un nuevo mensaje
                id: lastMsg == undefined? 1 : lastMsg.id +1,
                email: req.body.email,
                nombre: req.body.nombre,
                mensaje: req.body.mensaje
            };
            msgArray.push(msgNew);  // Agrego el nuevo mensajes al file>mensajes.json
            msgFile = JSON.stringify(msgArray); // Convierto el array con el nuevo mensaje en un JSON 
            fs.writeFileSync(path.resolve(__dirname, '../database/mensajes-client.json'), msgFile);
            return res.redirect("/")

        } else {
            return res.render(('main/contact'), {errors:errors.mapped(), old:req.body});
        }
    },

    tracker: function(req,res){
        res.render('main/tracker');
    },
    volumeCalculator: function(req,res){
        res.render('main/volume-calculator');
    },
};

module.exports = main;