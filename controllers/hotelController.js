const Hotel = require('./../models/hotelModel')
const APIFeatures = require('./../utils/apiTools')

exports.checkBody = (req, res, next) => {
	if (!req.body.name || !req.body.room_price) {
		return res.status(400).json({
			status: 'failed',
			message: 'Missing name or price',
		})
	}

	next()
}

exports.aliasTopHotels = (req, res, next) => {
	req.query.limit = '5'
	req.query.sort = '-comfort,room_price'
	req.query.fields = 'name,room_price,comfort'

	next()
}

exports.getAllHotels = async (req, res) => {
	try {
		const hotelsData = new APIFeatures(Hotel.find(), req.query)
			.filter()
			.sort()
			.limitFields()
			.paginate()

		const hotels = await hotelsData.query

		res.status(200).json({
			status: 'success',
			results: hotels.length,
			data: { hotels },
		})
	} catch (err) {
		res.status(404).json({
			status: 'failed',
			message: err.message,
		})
	}
}

exports.createHotel = async (req, res) => {
	try {
		const newHotel = await Hotel.create(req.body)

		res.status(201).json({
			status: 'success',
			message: 'new hotel created',
			data: newHotel,
		})
	} catch (err) {
		res.status(404).json({
			status: 'failed',
			message: err.message,
		})
	}
	// fs.writeFileSync('./data/hotels.json', JSON.stringify(hotels, null, "\t")) 
}

exports.getHotel = async (req, res) => {
	try {
		const hotel = await Hotel.findById(req.params.id).populate({
			path: 'managers',
			select: '-__v'
		}).populate('reviews')

		res.status(200).json({
			status: 'success',
			data: { hotel },
		})
	} catch (err) {
		res.status(404).json({
			status: 'failed',
			message: err.message,
		})
	}
}

exports.updateHotel = async (req, res) => {
	try {
		const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		})

		res.status(201).json({
			status: 'success',
			message: 'hotel updated',
			data: {
				hotel
			},
		})
	} catch (err) {
		res.status(404).json({
			status: 'failed',
			message: err.message,
		})
	}
}

exports.deleteHotel = async (req, res) => {
	try {
		await Hotel.findByIdAndDelete(req.params.id)

		res.status(200).json({
			status: 'success',
			message: 'hotel deleted',
			data: null,
		})
	} catch (err) {
		res.status(404).json({
			status: 'failed',
			message: err.message,
		})
	}
}
