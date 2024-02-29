const express = require('express')
const router = express.Router()
const authController = require('./../controllers/authController')
const userController = require('./../controllers/userController')

router.post('/signup', authController.signup)
router.post('/login', authController.login)

router.get("/", 
	authController.protect,
	authController.restrictTo("admin"),
	userController.getAllUsers
)
router.get("/:id", 
	authController.protect,
	authController.restrictTo("admin"),
	userController.getUser)

module.exports = router