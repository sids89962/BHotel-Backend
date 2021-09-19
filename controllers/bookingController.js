const Book = require('../model/bookingModel')

const bookingController = {
    createBooking: async (req, res) => {
        try {
            const {name, cityName, cityId, price, bookingDate} = req.body
            const booking = new Book({
                userid: req.user._id,
                name, cityName, cityId, price, bookingDate
            })
            await booking.save();
            res.status(201).json({msg: "Booked"})
        } catch (err) {
            return res.status(400).json({ msg: err.message })
        }
    },
    getAllBooking: async (req, res) => {
        try {
            const Booking = await Book.find()
            if(!Booking)
                return res.status(400).json({msg:"No booking yet"})
            res.json(Booking)

        } catch (err) {
            return res.status(400).json({ msg: err.message })
        }
    }
}

module.exports = bookingController