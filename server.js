const app = require('./app')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config({ path: './config.env' })

const PORT = process.env.PORT
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB)
    .then(con => console.log('Connected to MongoDB Database'))
    .catch(err => console.log(err))

app.listen(PORT, () => {
    console.log(`Started server at http://localhost:${PORT}`)
})
