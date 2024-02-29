const mongoose = require('mongoose')
const User = require('./userModel')

const hotelSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'A hotel must have name'],
		unique: true,
	},
	address: {
		type: String,
		required: [true, 'Must have address'],
	},
	rankingAverage: {
		type: Number,
		default: 4.5,
		min: [1, 'Ranking must be above 1'],
		max: [5, 'Ranking must be below 5'],
	},
	room_price: {
		type: Number,
		required: [true, 'Must have room price'],
	},
	price_discount: {
		type: Number,
	},
	comfort: {
		type: String,
		required: [true, "A hotel must have stars level"],
		enum: {
			values: ['1', '2', '3', '4', '5', '6', '7']
		},
	},
	summary: {
		type: String,
		trim: true,
		required: [true, 'A hotel must have summary']
	},
	description: {
		type: String,
		trim: true,
	},
	image_cover: {
		type: String,
		required: [true, 'A hotel must have an image']
	},
	managers: [
		{
			type: mongoose.Schema.ObjectId,
			ref: "User",
		}
	],
	createdAt: {
		type: Date,
		default: Date.now(),
		select: false,
	}
},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true }
	}
)

// hotelSchema.pre('save', async function() {
// 	const managersPromises = this.managers.map(async (id) => User.findById(id))
// 	this.managers = await Promise.all(managersPromises)
// })

hotelSchema.virtual('reviews', {
	ref: 'Review',
	foreignField: 'hotel',
	localField: '_id',
})

const Hotel = mongoose.model('Hotel', hotelSchema)

module.exports = Hotel