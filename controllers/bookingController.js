const Book = require('../model/bookingModel')

const bookingController = {
    createBooking: async (req, res) => {
        
        try {
            const {name, city,  price, date,days} = req.body
            const booking = new Book({
                userid: req.user.id,
                name, city,  price, days,date
            })
            await booking.save();
            res.json({booking})
        } catch (err) {
            return res.status(400).json({ msg: err.message })
        }
    },
    getAllBooking: async (req, res) => {
        try {
          
            const Bookings = await Book.find()
            if(!Bookings)      return res.status(400).json({msg:"No booking yet"})
          
            res.json({Bookings})

        } catch (err) {
            return res.status(400).json({ msg: err.message })
        }
    },
    setBooking:async (req,res) => {
        try{
           const {id,value} = req.body
           const booking = await Book.findByIdAndUpdate(id , {isAccepted:value}        
           )   
          const update=  await booking.save()
           res.json({update})
        }catch (err) {
            return res.status(400).json({ msg: err.message })
        }
    }

}

module.exports = bookingController