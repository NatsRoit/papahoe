const { restart } = require('nodemon');
const db = require('../database/models');
const sequelize = db.sequelize;
const bcrypt = require("bcryptjs");


const usersApiController = {
    'list': (req, res) => {
        db.User.findAll({
            include:
            [
                { association: "role" },
            ], 
        })
            .then(users => {
                let response = {
                    info: {
                        status: 200,
                        total: users.length,
                        url: 'api/users/list'
                    },
                    data: users,
                }
                res.json(response)
            })
            .catch(e => {
                let response = {
                    status: 404,
                    url: 'api/users/list',
                    error: e
                }
                res.json(response)
            })
    },


    'detail': (req, res) => {
        db.User.findByPk(req.params.id, {
            include:
            [
                { association: "role" },
            ], 
        })
            .then(user => {
                if (user){
                let response = {
                    info: {
                        status: 200,
                        url: 'api/users/detail/' + req.params.id
                    },
                    data: user,
                }
                res.json(response)
            } else {
                let response = {
                    meta:
                    {
                        status: 400,
                        url: 'api/products/detail/' + req.params.id,
                        error: "Lo sentimos! El usuario que estás buscando no existe en nuestra base de datos",
                    },
                }
                res.json(response)
            }
            })
            .catch(e => {
                let response = {
                    status: 404,
                    url: 'api/users/list',
                    error: e
                }
                res.json(response)
            })
        },


    'create': async (req, res) => {
        const hash = await bcrypt.hash(req.body.password, 10);
        db.User.create({
            first_name: req.body.nombre,
            last_name: req.body.apellido,
            email: req.body.email,
            password: hash,
            user_name: req.body.usuario,
            address: req.body.direccion,
            floor_apt: req.body.departamento? req.body.departamento: "",
            city: req.body.localidad,
            zip_code: req.body.codigoPostal,
            province: req.body.province,
            country: req.body.country,
            phone_number: req.body.telefono,
            avatar: req.file ? req.file.filename : 'default-admin.jpg',
            active: 1,
            role_id: 2,
        })
            .then(confirmacion => {
                let response;
                if(confirmacion){
                    response = {
                        info: {
                            status: 201,
                            mensaje: "Usuario creado con éxito!",
                            url: 'api/users/create'
                        },
                        data: confirmacion
                    }
                    res.json(response)
                } else {
                    response = {
                    info: {
                        status: 502,
                        url: 'api/users/create',
                        error: e,
                    },
                    data: confirmacion 
                }       
                res.json(response)
                }
            })
            .catch(e => {
                let response = {
                    status: 404,
                    url: 'api/users/create',
                    error: e
                }
                res.json(response)
            })
        },


    'destroy': (req, res) => {
        let userId = req.params.id;
        db.User.destroy({where: {id: userId}})
        .then(confirmacion => {
            let response;
            if(confirmacion){
                response = {
                    info: {
                        status: 200,
                        total: confirmacion.length,
                        url: 'api/users/delete' + userId
                    },
                    data: confirmacion 
                    }
            }else{ response = {
                info: {
                    status: 200,
                    total: confirmacion.length,
                    url: 'api/users/delete' + userId
                },
                data: confirmacion 
                    }       
                }
                res.json(response)
                })    
            }
    }
    





module.exports = usersApiController;