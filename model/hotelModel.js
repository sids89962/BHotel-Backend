const mongoose = require('mongoose')

const hotelSchema = new mongoose.Schema({
    hotel:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        required:true
    }
},{
    timestamps:true
})


module.exports = mongoose.model('Hotel', hotelSchema)