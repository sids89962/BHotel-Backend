const express = require('express')
require('dotenv').config()
const mongoose= require('mongoose')
const userRoute = require('./routes/userRoute')
const bookingRoute = require('./routes/bookingRoute')
const hotelRoute = require('./routes/hotelRoute')
const cookieParser = require('cookie-parser')
const app =express()


app.use(express.json())
app.use(cookieParser())

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('Connection to database Successful')
}).catch((err) =>
{
    console.error(err)
})

app.use('/users',userRoute)
app.use('/api',bookingRoute)
app.use('/api',hotelRoute)


const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server running at PORT ${PORT}`)
})


