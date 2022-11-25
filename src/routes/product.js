const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require("multer");


// MULTER CONFIG
const multerDiskstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb (null, path.resolve(__dirname, "../../public/img"));
  },
  filename: function (req, file, cb) {
    let nombreArchivo = Date.now() + '-' + file.originalname;
    cb(null, nombreArchivo );
  },
});
const upload = multer({ storage : multerDiskstorage });



let productController = require(path.join(__dirname, '../controllers/productController.js'));

// READ PRODUCTOS
router.get('/test',productController.test);
router.get('/all',productController.indexAll);
router.get('/detail/:id',productController.detail);
// router.get('/category',productController.index);


// BOARDBUILDER
router.get('/boardBuilder',productController.boardBuilder);

// SIZES TABLE
router.get('/sizes',productController.sizes);

// CHECKOUT
router.get('/cart',productController.cart);
router.get('/checkout',productController.checkoutView);
router.post('/checkout',productController.checkout);

module.exports = router;