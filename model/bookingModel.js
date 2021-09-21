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
    city: {
        type: String,
        required: true,
      },
    
      price: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        required: true,
      },
      days: {
        type: Number,
        required: true,
      },
      isAccepted: {
        type: Boolean,
        default: false,
      },
    },
    { timestamps: true 

})

module.exports = mongoose.model("Booking", bookingSchema)