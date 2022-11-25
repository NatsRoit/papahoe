const express = require('express');
const router = express.Router();
const apiUsersController = require('../controllers/apiUsersController');


// API RUTA COMPLETA>  /api/users
router.get('/list', apiUsersController.list)
router.get('/detail/:id', apiUsersController.detail)
router.post('/create', apiUsersController.create)
// router.get('/delete/:id', apiUsersController.destroy)

module.exports = router;