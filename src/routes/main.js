const express = require('express');
const router = express.Router();
const path = require('path');
const {body} = require('express-validator');


// VALIDACIONES CONTACT-FORM
const validacionesContact = [
    body('email').notEmpty().withMessage('No te olvides de completar tu email').isEmail().withMessage('Mmmhhh... Parece que ese email no es válido'),
    body('nombre').notEmpty().withMessage('No te olvides de completar tu nombre'),
    body('mensaje').notEmpty().withMessage('No te olvides de escribir un mensaje!')
];


let mainController = require(path.join(__dirname, '../controllers/mainController.js'));

router.get('/',mainController.index);
router.get('/about',mainController.about);
router.get('/devoluciones',mainController.devoluciones);
router.get('/faqs',mainController.faqs);
router.get('/politica-cancelacion',mainController.politicaCancelacion);
router.get('/contact', validacionesContact, mainController.contactView);
router.post('/contact', validacionesContact, mainController.contact);
router.get('/tracker',mainController.tracker);
router.get('/volumeCalculator',mainController.volumeCalculator);

module.exports = router;