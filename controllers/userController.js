const User = require("../models/userModel")

exports.getAllUsers = async (req, res) => {
	try {
		const users = await User.find()
		res.status(200).json({
			status: "Success",
			result: users.length,
			data: { users }
		})
	} catch (err) {
		res.status(400).json({
			status: "Fail",
			message: err
		})
	}
}

exports.getUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
		res.status(200).json({
			status: "Success",
			data: { user }
		})
	} catch (err) {
		res.status(400).json({
			status: "Fail",
			message: err
		})
	}
}