const express = require('express')
const hotelController = require('./../controllers/hotelController')
const authController = require('./../controllers/authController')
const reviewRouter = require('./../routes/reviewRoutes')

const router = express.Router()

// router.use(authController.protect) protect all routes below this

router.route('/top-5-best')
	.get(hotelController.aliasTopHotels, hotelController.getAllHotels)

router.route('/')
	.get(authController.protect, hotelController.getAllHotels)
	.post(hotelController.checkBody, hotelController.createHotel)

router.route('/:id')
	.get(hotelController.getHotel)
	.patch(hotelController.updateHotel)
	.delete(
		authController.protect,
		authController.restrictTo('admin'),
		hotelController.deleteHotel
	)

router.use('/:hotelId/reviews', reviewRouter)

module.exports = router
