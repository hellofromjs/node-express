const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Please tell us your name'],
	},
	email: {
		type: String,
		required: [true, 'Please provide your email'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'is not email'],
	},
	photo: {
		type: String,
	},
	password: {
		type: String,
		required: [true, 'Please provide a password'],
		minlength: 8,
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [true, "Please confirm your password"],
		validate: {
			validator: function(el) {
				return el === this.password
			},
			message: "Passwords are not the same",
		},
	},
	passwordChangedAt: Date,
	passwordResetToken: String,
	passwordResetExpires: Date,
	active: {
		type: Boolean,
		default: true,
		select: false,
	}
})

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next()
	}

	// hash password with cost 12
	this.password = await bcrypt.hash(this.password, 12)

	this.passwordConfirm = undefined

	next()
})

const User = mongoose.model('User', userSchema)

module.exports = User