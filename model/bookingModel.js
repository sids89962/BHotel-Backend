const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userid:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required:true,
    },
    cityName: {
        type: String,
        required: true,
      },
      cityId: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
      bookingDate: {
        type: Date,
        required: true,
      },
      bookedDate: {
        type: Date,
        default: new Date(),
      },
      isAccepted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true 

})

module.exports = mongoose.model("Booking", bookingSchema)