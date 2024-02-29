const express = require('express')
const morgan = require('morgan')
const hotelRoutes = require('./routes/hotelRoutes')
const userRoutes = require('./routes/userRoutes')
const reviewRoutes = require("./routes/reviewRoutes")
const app = express()

app.use(express.json())
app.use(morgan('dev'))

app.use('/api/v1/hotels', hotelRoutes)
app.use('/api/v1/users', userRoutes)
app.use("/api/v1/review", reviewRoutes)

module.exports = app