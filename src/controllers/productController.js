const path = require('path');
const fs = require('fs');
const db = require('../database/models');
const Op = db.Sequelize.Op;

// let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/productos.json')));


const productController = {
    test: function(req,res){
        let producto =
        db.Product.findByPk(1, {
            include: [
                { association: "marca" },
                { association: "categoria", include: [{association: 'subcategorias'}],
                raw: true},
                { association: "subcategoria" },
                { association: "fin" },
                { association: "dimensiones" },
                { association: "colores" },
            ]
        });
        let sizes = db.Size.findAll()
        Promise.all([producto, sizes])
        .then(function([producto, sizes]){
            return res.send(producto);        
        });
    },

    indexAll: function(req, res, next) {
        db.Product.findAll({
            include: [ { association: "marca" }, { association: "categoria"}],
        })
        .then(function (productos) {
            if (productos.length > 0) {
                return res.render(path.resolve(__dirname, '../views/product/shop'),{productos});
            } else {
                next();
            }
        });
    },
// POR AHORA NO LO USAMOS MÁS XQ TENEMOS LA BARRA DE BÚSQUEDA
    // index: function(req, res, next){
    //     !req.query.cat? req.query.cat = 0 : "";
    //     let productos = db.Product.findAll({
    //         include: [ { association: "marca" }, { association: "categoria"}],
    //         where : {category_id : req.query.cat == "all"? {[Op.col]:"category_id"} : req.query.cat }
    //     });
    //     let categorias = db.Category.findAll()
    //     Promise.all([productos, categorias])
    //     .then(function([productos, categorias]){
    //         if (productos.length > 0) {
    //             let categoria;
    //             if (req.query.cat == "all"){
    //                 categoria = "Todos los productos"
    //             } else { 
    //                 categoria = categorias.find(c => c.id == req.query.cat);
    //             }
    //             return res.render(path.resolve(__dirname, '../views/product/shop'),{productos, categoria: categoria.name?categoria.name:categoria });
    //         } else if (!req.query.cat){
    //             next();
    //         } else {
    //             next();
    //         }
    //     })
    //     .catch(error => {
    //         res.send(error);
    //     })
    // },
    
    detail: function(req,res,next){
        let producto = 
        db.Product.findByPk(req.params.id, {
            include: [
                { association: "marca" },
                { association: "categoria", include: [{association: 'subcategorias'}] },
                { association: "subcategoria" },
                { association: "fin" },
                { association: "dimensiones" },
                { association: "colores" },
            ],
        });
        let prodAll = db.Product.findAll();
        let size = db.Size.findAll();
        let fins = db.Fin.findAll();
        let colors = db.Color.findAll()
        Promise.all([producto, prodAll, size, fins, colors])
        .then(function([producto, prodAll, size, fins, colors ]){
            // Creo una función para seleccionar en modo aleatorio 5 productos del total de productos (prodAll).
            let randomArr = [];
            while(randomArr.length < 5)
            { var r = Math.floor(Math.random() * prodAll.length);
                if(randomArr.indexOf(r) === -1) { 
                    randomArr.push(r);
            }};
            // Pusheo esos 5 productos en un nuevo array (relatedProds) para pasarlo a la vista
            let relatedProds = [];
            for (let i = 0; i < randomArr.length; i++) {
                relatedProds.push(prodAll[randomArr[i]])
            }

            // Hago un array con las imágenes de la imgGallery para poder recorrerlo
            let imgGallery = [producto.image1, producto.image2, producto.image3, producto.image4, producto.image5]
            // for (let el in producto) {
            //     el.test("image")
            //     imageGallery.push(el)
            //     console.log("-------------------------- IMAGEGALLERY:" + imageGallery)
            // }


            if (producto !== null){
                return res.render(path.resolve(__dirname, '../views/product/detail'),{producto, relatedProds, size, fins, colors, imgGallery });
            } else {
                next();
            }
        })
        .catch(error => res.send(error));
    },

    boardBuilder: function(req, res){
        res.render(path.resolve(__dirname, '../views/product/boardBuilder'));
    },

    cart: function(req,res){
        res.render(path.resolve(__dirname, '../views/product/cart'));
    },

    
    checkoutView: function(req,res){
        res.render(path.resolve(__dirname, '../views/product/checkout'));
    },
    checkout: function(req,res){
        res.render(path.resolve(__dirname, '../views/product/checkout'));
    },
    sizes: function(req,res){
        res.render(path.resolve(__dirname, '../views/product/sizes'));
    }
};

module.exports = productController;