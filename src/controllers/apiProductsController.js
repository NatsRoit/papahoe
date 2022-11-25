const { response } = require('express');
const { restart } = require('nodemon');
const db = require('../database/models');
const Op = db.Sequelize.Op;


const apiProductsController = {

    index: (req, res) =>{
        db.Product.findAll({
            include: [
                { association: "marca" },
                { association: "categoria", include: [{association: 'subcategorias'}],
                raw: true},
                { association: "subcategoria" },
                { association: "fin" },
                { association: "dimensiones" },
                { association: "colores" },
            ], 
        })
            .then(products => {
                const reducer = (map, val) => {
                    if(map[val] == null) { map[val] = 1; } else { ++map[val]; }
                    return map
                };
                let response = {
                    meta: {
                        status: 200,
                        total: products.length,
                        url: 'api/products/index'
                    },
                    data: {
                        count: products.length,
                        countByCategory: products.map(el => el.categoria.name).reduce(reducer, {}),
                        products,
                    }
                }
                res.json(response)
            })
            .catch(e => {
                let response = {
                    meta: {
                        status: 404,
                        url: 'api/products/index',
                        error: e
                    },
                }
                res.json(response)
            })
    },


    detail: (req, res) => {
        db.Product.findByPk(req.params.id, {
            include: [
                { association: "marca" },
                { association: "categoria", include: [{association: 'subcategorias'}] },
                { association: "subcategoria" },
                { association: "fin" },
                { association: "dimensiones" },
                { association: "colores" },
            ],
        }).then(product => {
            if (product){    
                let response = {
                        meta:
                        {
                            status: 200,
                            url: 'api/products/detail/' + req.params.id
                        },
                        data: product,
                    }
                    res.json(response)
                } else {
                    let response = {
                        meta:
                        {
                            status: 400,
                            url: 'api/products/detail/' + req.params.id,
                            error: "Lo sentimos! El producto que estás buscando no existe en nuestra base de datos",
                        },
                    }
                    res.json(response)
                }
            })
            .catch(e => {
                let response = {
                    meta: {
                        status: 404,
                        url: 'api/products/index',
                        error: e
                    },
                }
                res.json(response)
            })
    },


    categories: (req, res) =>{
        db.Category.findAll()
            .then(categories => {
                let response = {
                    meta: {
                        status: 200,
                        total: categories.length,
                        url: 'api/products/categories'
                    },
                    data: categories
                }
                res.json(response)
            })
            .catch(e => {
                let response = {
                    info: {
                        status: 404,
                        url: 'api/products/categories',
                        error: e
                    },
                }
                res.json(response)
            })
    }, 


    search: (req, res) => {
        db.Product.findAll({
            include: [
                { association: "marca" },
                { association: "categoria", include: [{association: 'subcategorias'}],raw: true},
                { association: "subcategoria" },
                { association: "fin" },
                { association: "dimensiones" },
                { association: "colores" },
            ],
            where: {
                name: { [Op.like]: "%" + req.query.keyword + "%"},
            }
        })
        .then (products => {
            if(products.length > 0) {
                let response = {
                    meta: {
                        status: 200,
                        resultados: products.length,
                        url: 'api/products/search?keyword=' + req.query.keyword
                    },
                    data: products
                }
                res.json(response)
            } else {
                let response = {
                    meta: {
                        status: 204,
                        resultados: "Lo sentimos! No se encontraron resultados para su búsqueda",
                        url: 'api/products/search?keyword=' + req.query.keyword
                    },
                }
                res.json(response)
            }
            })
        .catch(e => {
            let response = {
                info: {
                    status: 404,
                    url: 'api/products/search?keyword=' + req.query.keyword,
                    error: e
                },
            }
            res.json(response)
        })
    },



// EN CONSTRUCCIÓN
    edit: (req, res) =>{
        let productId = req.params.id;
        db.Product.update(
            {
                active: req.body.active,
            },
            {
                where: {id: productId}
            })
            .then(confirmacion => {
            let response;
            if(confirmacion){
                response = {
                    meta: {
                        status: 201,
                        message: "Producto actualizado",
                        url: 'api/products/edit'
                    },
                    data: confirmacion
                }
            } else {
                response = {
                    info: {
                        status: 500 ,
                        url: 'api/products/edit'
                    },
                    data: confirmacion 
                }
            }
            res.json(response)
        })
        .catch(error => res.send(error))
    },


    list: (req, res) =>{
        db.Product.findAll()
        .then(products => {
            let response = {
                info: {
                    status: 200,
                    total: products.length,
                    url: 'api/products/list'
                },
                data: products,
                include: [
                    { association: "marca" },
                    { association: "categoria", include: [{association: 'subcategorias'}],
                    raw: true},
                    { association: "subcategoria" },
                    { association: "fin" },
                    { association: "dimensiones" },
                    { association: "colores" },
                ]
            }
            res.json(response)
        })
        .catch(e => {
            let response = {
                info: {
                    status: 404,
                    url: 'api/products/list',
                    error: e
                },
            }
            res.json(response)
        })
    },






}

module.exports = apiProductsController;