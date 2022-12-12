const path = require('path');
const fs = require('fs');
const db = require('../database/models');
const Op = db.Sequelize.Op;

const { validationResult } = require("express-validator");


// let productos = JSON.parse(fs.readFileSync(path.resolve(__dirname,'../database/productos.json')));

let adminController = {
    test: function(req,res){
        db.Product.findByPk(125)
        .then(function(response){
            return res.send(response);
        })
        .catch(err => {
            res.send(error);
        })
    },

        
    createView: function(req, res) {
        let brand = db.Brand.findAll();
        let category = db.Category.findAll({include: [{association: 'subcategorias'}]});
        let subcategory = db.Subcategory.findAll();
        let colors = db.Color.findAll();
        let fins = db.Fin.findAll();
        let size = db.Size.findAll()
        Promise.all([brand, category, subcategory, colors, fins, size])
        .then(function([brand, category, subcategory, colors, fins, sizes ]){
          // console.log(JSON.stringify(category))
            return res.render(path.resolve(__dirname, '../views/admin/productCreate'),{brand, category, subcategory, colors, fins, sizes});
        })
        .catch(err => {
            res.send(error);
        })
    },

    create: (req,res) => {
        let errors = validationResult(req);
        console.log(errors)
        if (errors.isEmpty()) {
        db.Product.create({
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            description: req.body.description,
            features: req.body.features,
            stock: req.body.stock,
            fin_id: req.body.fin_id,
            brand_id: req.body.brand_id,
            subcategory_id: req.body.subcategory_id,
            category_id: req.body.category_id,
            image1: req.files.image1 ? req.files.image1[0].filename : "_default-product.png",
            image2: req.files.imageGallery ? req.files.imageGallery[0].filename : null,
            image3: req.files.imageGallery ? req.files.imageGallery[1].filename : null,
            image4: req.files.imageGallery ? req.files.imageGallery[2].filename : null,
            image5: req.files.imageGallery ? req.files.imageGallery[3].filename : null,
            active: req.body.activo,
        })
        .then(function (nuevoProducto) {
            let responseProducto = db.Product.findOne({
                where: { id: {[Op.eq]: nuevoProducto.id} },
            });
            let responseDimensiones = db.Size.findAll({
                    where: { id:{[Op.or]: req.body.size_id} },
                });
            let responseColores = db.Color.findAll({
                    where: { id:{[Op.or]: req.body.color_id} },
                });

            Promise.all([responseProducto, responseDimensiones, responseColores])
            .then(([producto, dimensiones, colores]) => {
                let productsize = [];
                for (let i=0; i<dimensiones.length; i++){
                    let datasize = {
                        product_id: producto.id,
                        size_id: dimensiones[i].id
                    };
                    productsize.push(datasize);
                };
                
                let productcolor = [];
                for (let i=0; i<colores.length; i++){
                    let datacolor = {
                        product_id: producto.id,
                        color_id: colores[i].id
                    };
                    productcolor.push(datacolor);
                };

                let newproductsize =  db.Product_Size.bulkCreate (productsize);
                let newproductcolor =  db.Product_Color.bulkCreate (productcolor);
                Promise.all([newproductsize, newproductcolor])
                .then(response => {
                    if (response && nuevoProducto ){
                        // let currency = req.body.currency;
                        return res.redirect('/product/detail/' + nuevoProducto.id );
                    } else {
                        res.send ("algo salio mal")
                    }
                    })
                })
            })
            } else {
                let brand = db.Brand.findAll();
                let category = db.Category.findAll({include: [{association: 'subcategorias'}]});
                let subcategory = db.Subcategory.findAll();
                let colors = db.Color.findAll();
                let fins = db.Fin.findAll();
                let size = db.Size.findAll()
                Promise.all([brand, category, subcategory, colors, fins, size])
                .then(function([brand, category, subcategory, colors, fins, size ]){
                    return res.render(path.resolve(__dirname, '../views/admin/productCreate'),{brand, category, subcategory, colors, fins, size,  errors: errors.mapped() });
                })
            }
        },



    editView: (req,res)=>{
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
        let brand = db.Brand.findAll();
        let category = db.Category.findAll({include: [{association: 'subcategorias'}]});
        let subcategory = db.Subcategory.findAll();
        let colors = db.Color.findAll()
        let fins = db.Fin.findAll();
        let sizes = db.Size.findAll()
        Promise.all([producto, brand, category, subcategory, colors, fins, sizes])
        .then(function([producto, brand, category, subcategory, colors, fins, sizes]){
            res.render (path.resolve(__dirname,'../views/admin/productEdit'), {producto, brand, category, subcategory, colors, fins, sizes})
        })
    },

    edit: (req,res) => {
        // console.log(req.files['avatar'][0])
        // console.log(req.files['imageGallery'])
        db.Product.update({
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            description: req.body.description,
            features: req.body.features,
            active: req.body.activo,
            stock: req.body.stock,
            fin_id: req.body.fin_id,
            brand_id: req.body.brand_id,
            subcategory_id: req.body.subcategory_id,
            category_id: req.body.category_id,
            image1: req.files.image1 ? req.files.image1[0].filename : req.body.oldImagen1,
            image2: req.files.imageGallery? req.files.imageGallery[0].filename : req.body.oldImagen2,
            image3: req.files.imageGallery && req.files.imageGallery.length >1? req.files.imageGallery[1].filename : req.body.oldImagen3,
            image4: req.files.imageGallery && req.files.imageGallery.length >2? req.files.imageGallery[2].filename : req.body.oldImagen4,
            image5: req.files.imageGallery && req.files.imageGallery.length >3? req.files.imageGallery[3].filename : req.body.oldImagen5,
            active: req.body.activo? true : false,
        },{
            where: {id: req.params.id}
        })
        .then(function (productoEditado) {
            let responseProducto = db.Product.findOne({
                where: { id: {[Op.eq]: req.params.id} },
            });
            let responseDimensiones = db.Size.findAll({
                    where: { id: req.body.size_id? {[Op.or]: req.body.size_id} : '' },
                });
            let responseColores = db.Color.findAll({
                    where: { id: req.body.color_id? {[Op.or]: req.body.color_id} : '' },
                });

            let emptyColors =
                db.Product_Color.destroy(
                    { where: {product_id : req.params.id}}
                );
            let emptySizes =
                db.Product_Size.destroy(
                    { where: {product_id : req.params.id}}
                );

            Promise.all([responseProducto, responseDimensiones, responseColores, emptyColors, emptySizes])
            .then(([producto, dimensiones, colores]) => {
                let productsize = [];
                for (let i=0; i<dimensiones.length; i++){
                    let datasize = {
                        product_id: producto.id,
                        size_id: dimensiones[i].id,
                        isActive: 1
                    };
                    productsize.push(datasize);
                };
                // console.log("PRODUCTO SIZE<<<<<<<<<<<<<<<" + productsize)
                
                let productcolor = [];
                for (let i=0; i<colores.length; i++){
                    let datacolor = {
                        product_id: producto.id,
                        color_id: colores[i].id,
                        isActive: 1
                    };
                    productcolor.push(datacolor);
                }; 
                let newproductsize =  db.Product_Size.bulkCreate(productsize);
                let newproductcolor =  db.Product_Color.bulkCreate(productcolor)
                Promise.all([newproductsize, newproductcolor])
                .then(response => {
                    if (response && productoEditado ){
                        // let currency = req.body.currency;
                       console.log("-----------------------" + productoEditado.image1);
                       console.log("----------------------PROD EDITADO :" + productoEditado);
                        return res.redirect('/product/detail/' + req.params.id );
                    } else {
                        next()
                    }
                })
            })
        })
    },  

    destroy: (req,res) =>{
        db.Product.destroy ({
            where: { id: req.params.id }
        })
        .then(function (productoBorrado) {
        res.redirect("/admin")
        // const productDeleteId = req.params.id;
        // const productsFinal = productos.filter(product => product.id != productDeleteId);
        // let productsGuardar = JSON.stringify(productsFinal,null,2)
        // fs.writeFileSync(path.resolve(__dirname, '../database/productos.json'),productsGuardar);
        // res.redirect('/product');
    });
    },
    destroyTrucho: (req,res) =>{
        db.Product.destroy ({
            where: { id: req.params.id }
        })
        .then(function (productoBorrado) {
        res.redirect("/admin")
    });
    },

    admin: (req, res, next) => {
        let productos = db.Product.findAll({
            include: [ { association: "marca" }, { association: "categoria"}],
        });
        let categorias = db.Category.findAll()
        Promise.all([productos, categorias])
        .then(([productos, category]) => {
            return res.render(path.resolve(__dirname, '../views/admin/adminPanel'),{productos, category});
        })
        // next();
    }
}

module.exports = adminController;