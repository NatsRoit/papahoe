const express = require("express");
const router = express.Router();
const path = require("path");
const multer = require("multer");


// MULTER CONFIG
const multerDiskstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb (null, path.resolve(__dirname, "../../public/img"));
  },
  filename: function (req, file, cb) {
    let nombreArchivo = Date.now() + '_' +  file.fieldname + '-' + file.originalname;
    cb(null, nombreArchivo );
  },
});
const upload = multer({ storage : multerDiskstorage });


// MIDDLEWARES
//verifica si el usuario está logueado, sino redirige a login
const logueado = require(path.resolve(__dirname, "../middlewares/logueado"));
const validaciones = require(path.resolve(__dirname, "../middlewares/validaciones"));


let adminController = require(path.join(__dirname, '../controllers/adminController.js'));

// TEST
router.get('/test',adminController.test);


// PANEL DE CONTROL
router.get("/", logueado, adminController.admin);

// CREATE NUEVO PRODUCTO
router.get("/create", logueado, adminController.createView);
const fotosCreateArray = upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'imageGallery', maxCount: 4 }])
router.post("/create", fotosCreateArray, /*validaciones.validar('create'),*/ adminController.create);

// NO BORRAR!!!!!!
// // CREATE NUEVO PRODUCTO
// router.post("/create", uploadProducts.fields([
//   { name: 'image1', maxCount: 1 },
//   { name: 'imageGallery1', maxCount: 1 },
//   { name: 'imageGallery2', maxCount: 1 },
//   { name: 'imageGallery3', maxCount: 1 },
//   { name: 'imageGallery4', maxCount: 1 },
// ]), adminController.create);



// UPDATE PRODUCTOS
router.get("/edit/:id", logueado, adminController.editView);
router.put("/edit/:id", logueado, upload.fields([
  { name: 'image1', maxCount: 1 },
  { name: 'imageGallery', maxCount: 4 }]), adminController.edit);

// NO BORRAR!!!!!!
// router.put("/edit/:id", upload.fields([
//   { name: 'image1', maxCount: 1 },
//   { name: 'imageGallery1', maxCount: 1 },
//   { name: 'imageGallery2', maxCount: 1 },
//   { name: 'imageGallery3', maxCount: 1 },
//   { name: 'imageGallery4', maxCount: 1 }]),  adminController.edit);


// DELETE PRODUCTOS
router.delete("/delete/:id", adminController.destroy);
router.get("/delete/:id", adminController.destroyTrucho);













module.exports = router;
