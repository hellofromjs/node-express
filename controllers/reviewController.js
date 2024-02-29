const Review = require("../models/reviewModel")

exports.getAllReviews = async (req, res) => {
	try {
		let filter = {}

		if (req.params.hotelId) {
			filter = { hotel: req.params.hotelId }
		}

		const reviews = await Review.find(filter)

		res.status(200).json({
			status: "Success",
			result: reviews.length,
			data: { reviews }
		})
	} catch (err) {
		res.status(400).json({
			status: "Fail",
			message: err.message
		})
	}
}

exports.createReview = async (req, res) => {
	try {
		if (!req.body.hotel) req.body.hotel = req.params.hotelId
		if (!req.body.user) req.body.user = req.user.id

		const newReview = await Review.create(req.body)

		res.status(201).json({
			status: "Success",
			message: "New review is created",
			data: { newReview} ,
		})
	} catch (err) {
		res.status(400).json({
			status: "Fail",
			message: err.message
		})
	}
}