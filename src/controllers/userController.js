const path = require("path");
const fs = require("fs");
const db = require("../database/models");
const Op = db.Sequelize.Op;

const bcrypt = require("bcryptjs");

//Requiero a la función que trae los errores desde la ruta, de llegar a existir
const { validationResult } = require("express-validator");


const userController = {
  profile: function (req, res, next) {
    let user = db.User.findByPk(req.params.id)
    let prodAll = db.Product.findAll();
  Promise.all([user, prodAll])
  .then(([activeUser, prodAll]) => {
        // console.log("---------ACTIVE USER IDDDD: " + activeUser.id)
        // console.log("---------res.locals.usuario: " + res.locals.usuario)
        // if (activeUser.id === res.locals.usuario.id ) {
          res.render(path.resolve(__dirname, "../views/user/profile"), { user: activeUser, productos: prodAll });
      //   }  else {
      //     next();
      // }
      })
      .catch((error) => res.send(error));
  },

  loginView: function (req, res) {
    res.render(path.resolve(__dirname, "../views/user/login"));
  },

  login: (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      db.User.findOne({ where: { email: req.body.email } }).then(
        (usuarioLogueado) => {
          delete usuarioLogueado.dataValues.password;
          req.session.usuario = usuarioLogueado.dataValues;
          console.log(req.session.usuario)
          if (req.body.keepSession) {
            res.cookie("keepSession", usuarioLogueado.email, {
              maxAge: 1000 * 60 * 60 * 24,
            });
          }
          return res.redirect("/");
        }
      );
    } else {
      //Devolver a la vista los errores
      return res.render(path.resolve(__dirname, "../views/user/login"), { errors: errors.mapped(), old: req.body, });
    }
  },

  registerView: function (req, res) {
    res.render(path.resolve(__dirname, "../views/user/register"));
  },

  register: function (req, res) {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      let nuevoUsuario = {
        first_name: req.body.nombre,
        last_name: req.body.apellido,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        user_name: req.body.usuario,
        address: req.body.direccion,
        floor_apt: req.body.departamento,
        city: req.body.localidad,
        zip_code: req.body.codigoPostal,
        province: req.body.province,
        country: req.body.country,
        phone_number: req.body.telefono,
        avatar: req.file ? req.file.filename : "default-admin.jpg",
        active: 1,
        role_id: 2,
      };

      db.User.create(nuevoUsuario)
        .then(db.User.findOne({ order: [["id", "DESC"]] }))
        .then((user) => {
          req.session.usuario = user;
          res.locals.usuario = user;
          res.redirect("/user/profile/" + user.id);
        }) 
        .catch((error) => res.send(error));
    } else {
      return res.render(path.resolve(__dirname, "../views/user/register"), { errors: errors.mapped(), old: req.body, });
    }
  },


  
  editView: function (req, res) {
    db.User.findByPk(req.params.id).then((showUser) => {
      res.render(path.resolve(__dirname, "../views/user/edit"), { user: showUser});
    });
  },

  edit: (req,res) => {
    let user = {
      first_name: req.body.nombre,
      last_name: req.body.apellido,
      email: req.body.email,
      //password: bcrypt.hashSync(req.body.password, 10),
      user_name: req.body.usuario,      
      address: req.body.direccion, 
      floor_apt: req.body.departamento,    
      city: req.body.ciudad, 
      zip_code: req.body.codigoPostal,
      province: req.body.province, 
      country: req.body.country,
      phone_number: req.body.telefono,
      avatar: req.file ? req.file.filename : req.body.oldImagen
    }

    req.body.avatar = user.avatar

    if(req.session.usuario){
      let userlogged = req.session.usuario ;
      //console.log('req.params.id' + req.params.id);
      if(userlogged.id == req.params.id){ 
        res.locals.usuario.user_name = user.user_name;
      }}


   
    db.User.update(user, {where:{id: req.params.id}})
    .then(user => {
      console.log("ATENCIONNNNNNNNNNN! Acá va mi usuario editado" + JSON.stringify(user))
      res.redirect('/user/profile/' + req.params.id);
    })

  },

  logout: (req, res) => {
    req.session.destroy();
    res.cookie("email", null, { maxAge: -1 });
    res.redirect("/");
  },
};

module.exports = userController;
