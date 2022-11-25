const path = require('path');
const { body } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../database/models');
const Op = db.Sequelize.Op;


module.exports.validar = (method) => {
    switch(method){
        case 'login': {
          return [
            body('email')
            .notEmpty().withMessage('El campo Email no puede estar vacío') // el campo email no puede estar vacío
            .isEmail().withMessage('Parece que ese email no es válido')// debe ser un email válido
            .custom( async (value) => {        // debe esxistir en la base de datos
                await db.User.findOne({ where: {email: value }}).then(user => {
                      if (!user)
                      throw new Error('¿Estás seguro de haber usado ese email para registrarte?');
                });
            }),
          
            //Aquí valido si la contraseña colocada es la misma a la que tenemos hasheada
            body('password')
            .notEmpty().withMessage('El campo Contraseña no puede estar vacío')// obligatoria
            .custom( async (value, {req,next}) => {    //debe coincidir con la que está en la base
                await db.User.findOne({ where: {email: req.body.email }}).then(user => {
                  if(user){
                      if (!bcrypt.compareSync(value, user.password)) 
                      throw new Error('Contraseña inválida. Hacé memoria!')
                  }
                });
            })
          ]
        }

        case 'register': {
            return [
                body('nombre')
                .notEmpty().withMessage('El campo Nombre no puede estar vacío')
                .isLength({min: 2}).withMessage('Debe tener al menos 2 caracteres'),
                body('apellido')
                .notEmpty().withMessage('El campo Apellido no puede estar vacío')
                .isLength({min: 2}).withMessage('Debe tener al menos 2 caracteres'),
                
                body('usuario')
                .notEmpty().withMessage('El campo Usuario no puede estar vacío')
                .isLength({min: 2}).withMessage('Debe tener al menos 2 caracteres')
                .custom( async (value, {req}) => {  ///Nombre de usuario no puede estar repetido en la base de datos
                  await db.User.findOne({ where: {user_name: req.body.usuario }}).then(user => {
                        if (user)
                        throw new Error('Ese nombre ya ha sido registrado. Probá con otro!');
                  });
                }),

                body('email')
                .notEmpty().withMessage('El campo Email no puede estar vacío') // el campo email no puede estar vacío
                .isEmail().withMessage('Parece que ese email no es válido')// debe ser un email válido
                .custom( async (value, {req}) => {    //no puede repetirse con los email ya registrados en la base de datos
                  await db.User.findOne({ where: {email: req.body.email }}).then(user => {
                        if (user)
                        throw new Error('Ese email ya ha sido registrado. Probá con otro!');
                  });
                }),

                body('password')
                .notEmpty().withMessage('El campo Contraseña no puede estar vacío') // obligatoria
                .isLength({min:8}).withMessage('La contraseña debe tener al menos 8 caracteres'), //mínimo 8 caracteres           
                
                
                body('confirm_password')
                .notEmpty().withMessage('Por favor, confirmá tu contraseña')        
                //Aquí valido si las contraseñas son iguales o no
                //El ( value ) viene a ser el valor que viaje en el name del del input del campo 
                //El valor { req } corresponde a lo que viene desde el formulario
                .custom((value, {req}) =>{
                    if(req.body.password == value ){
                        return true    // Si yo retorno un true  no se muestra el error     
                    }else{
                        return false   // Si retorno un false si se muestra el error
                    }    
                }).withMessage('Oops! Parece que las contraseñas no coinciden'),

                body('avatar').custom((value, {req}) => { // la imágen es opcional, pero si se carga tiene que ser jpg, jpeg, png ó gif
                  return validateImage(req,false)
                })
            ]
        }

        case 'edit': {
          return [
              body('nombre')
              .notEmpty().withMessage('El campo Nombre no puede estar vacío')
              .isLength({min: 2}).withMessage('Debe tener al menos 2 caracteres'),
              body('apellido')
              .notEmpty().withMessage('El campo Apellido no puede estar vacío')
              .isLength({min: 2}).withMessage('Debe tener al menos 2 caracteres'),
              
              body('usuario')
              .notEmpty().withMessage('El campo Usuario no puede estar vacío')
              .isLength({min: 2}).withMessage('Debe tener al menos 2 caracteres'),
             /* .custom( async (value, {req}) => {  ///Nombre de usuario no puede estar repetido en la base de datos
                await db.User.findOne({ where: {user_name: req.body.usuario }}).then(user => {
                      if (user)
                      throw new Error('Ese nombre ya ha sido registrado. Probá con otro!');
                });
              }),*/

              body('email')
              .notEmpty().withMessage('El campo Email no puede estar vacío') // el campo email no puede estar vacío
              .isEmail().withMessage('Parece que ese email no es válido'),// debe ser un email válido
              /*.custom( async (value, {req}) => {    //no puede repetirse con los email ya registrados en la base de datos
                await db.User.findOne({ where: {email: req.body.email }}).then(user => {
                      if (user)
                      throw new Error('Ese email ya ha sido registrado. Probá con otro!');
                });
              }),*/

            /* body('password')
              .notEmpty().withMessage('El campo Contraseña no puede estar vacío') // obligatoria
              .isLength({min:8}).withMessage('La contraseña debe tener al menos 8 caracteres'), //mínimo 8 caracteres        */   
              
              
             /* body('confirm_password')
              .notEmpty().withMessage('Por favor, confirmá tu contraseña')        
              //Aquí valido si las contraseñas son iguales o no
              //El ( value ) viene a ser el valor que viaje en el name del del input del campo 
              //El valor { req } corresponde a lo que viene desde el formulario
              .custom((value, {req}) =>{
                  if(req.body.password == value ){
                      return true    // Si yo retorno un true  no se muestra el error     
                  }else{
                      return false   // Si retorno un false si se muestra el error
                  }    
              }).withMessage('Oops! Parece que las contraseñas no coinciden'),*/

              body('avatar').custom((value, {req}) => { // la imágen es opcional, pero si se carga tiene que ser jpg, jpeg, png ó gif
                return validateImage(req,false)
              })
          ]
      }

        case 'create': {
            return [
              body('name')
              .notEmpty().withMessage('El campo nombre no puede estar vacío')
              .isLength({min:5}).withMessage('El nombre del producto debe tener al menos 5 caracteres'), 

              body('category_id')
              .notEmpty().withMessage('Agregá una categoría'),

            /*  body('subcategory_id')
              .notEmpty().withMessage('Agregá una subcategoría'),*/

              body('brand_id')
              .notEmpty().withMessage('Agregá una marca'),

              body('price')
              .notEmpty().withMessage('Ingresá el precio del producto'),

              body('stock')
              .notEmpty().withMessage('Ingresá la cantidad de unidades disponibles'),

              body('description')
              .notEmpty().withMessage('Una breve descripción ayuda a mejorar las ventas!')
              .isLength({max:1500}).withMessage('Menos es más! La descripción no puede superar los 1500 caracteres'), 
              
              body('features')
              .notEmpty().withMessage('No olvides detallar las características')
              .isLength({max:500}).withMessage('Menos es más! EL texto no puede superar los 500 caracteres'), 

              body('image1').custom((value, {req}) =>{ // la imágen es obligatoria y si se carga tiene que ser jpg, jpeg, png ó gif
                return validateImage(req,true)
              }),
              body('image2').custom((value, {req}) =>{ // la imágen es opcional, pero si se carga tiene que ser jpg, jpeg, png ó gif
                return validateImage(req,false)
              }),
              body('image3').custom((value, {req}) =>{ // la imágen es opcional, pero si se carga tiene que ser jpg, jpeg, png ó gif
                return validateImage(req,false)
              }),
              body('image4').custom((value, {req}) =>{ // la imágen es opcional, pero si se carga tiene que ser jpg, jpeg, png ó gif
                return validateImage(req,false)
              }),
              body('image5').custom((value, {req}) =>{ // la imágen es opcional, pero si se carga tiene que ser jpg, jpeg, png ó gif
                return validateImage(req,false)
              })
            ]
        }
    }
}


function validateImage(req, isRequired) {

  let file = req.file;
  let acceptedExtensions = [".jpg", ".jpeg", ".png", ".gif", ".svg", ".tiff", ".webp",]
  
  if (!file){
        if(isRequired) throw new Error("Tenés que adjuntar una imagen")
    req.file = { 
      filename : 'default-admin.jpg'
    }
      
  }
  else{
      let fileExtension = path.extname(file.originalname);
      if (!acceptedExtensions.includes(fileExtension)){
          throw new Error("Extensión de imagen no válida")
      }
  }
  
  return true;
}
