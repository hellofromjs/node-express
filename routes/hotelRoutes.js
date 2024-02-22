const express = require('express')
const hotelController = require('./../controllers/hotelController')
const authController = require('./../controllers/authController')

const router = express.Router()

router.route('/top-5-best')
    .get(hotelController.aliasTopHotels, hotelController.getAllHotels)

router.route('/')
    .get(authController.protect, hotelController.getAllHotels)
    .post(hotelController.checkBody, hotelController.createHotel)

router.route('/:id')
    .get(hotelController.getHotel)
    .patch(hotelController.updateHotel)
    .delete(hotelController.deleteHotel)

module.exports = router
