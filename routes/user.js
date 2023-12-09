const express = require('express')
const router = express.Router()
const UserrController = require('../controller/user_controller')

router.get('/', UserrController.getAll)
router.post('/register', UserrController.register)
router.post('/login', UserrController.login)


module.exports = router