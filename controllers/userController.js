const Users = require('../model/userModel')
const Booking = require('../model/bookingModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userController = {
    register: async (req, res) => {
        const { name, email, password } = req.body

        try {
            const ifExist = await Users.findOne({ email: email })
            if (ifExist) return res.status(500).json({ msg: "User already exists" })


            if (password.length < 6)
                return res.status(400).json({ msg: "The password is too short" })

            const hashedPass = await bcrypt.hash(password, 12)
            const user = new Users({
                name, email, password: hashedPass
            })
            await user.save()

            //JSONWEBTOKEN Authentication

            const accesstoken = createAccessToken({ id: user._id })
            const refreshtoken = createRefreshToken({ id: user._id })

            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
           
            res.json({ accesstoken })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ msg: err })
        }
    },
    login: async (req, res) => {
        try {
           
            const { email, password } = req.body
            const user = await Users.findOne({email})
            if (!user) return res.status(400).json({ msg: "User does not exist" })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" })
           
            const accesstoken = createAccessToken({ id: user._id })
            const refreshtoken = createRefreshToken({ id: user._id })
          
            res.cookie('refreshtoken', refreshtoken, {
                httpOnly: true,
                // path: '/users/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })           
            res.json({ accesstoken })            
        } catch (err) {
            return res.status(500).json({ msg: err.message})
        }

    },
    logout: async (req, res) => {
        try {
            res.clearCookie('refreshtoken', { path: '/users/refresh_token' })
            return res.status(200).json({ msg: "Logged Out" })
        } catch (err) {
            return res.status(400).json({ msg: err.message })
        }
    },
    refreshToken: (req, res) => {
        const rf_token = req.cookies.refreshtoken
       
        if (!rf_token) return res.status(400).json({ msg: "Please login or register" })
        jwt.verify(rf_token, process.env.REFRESH_KEY, (err, user) => {
            if (err) return res.status(400).json({ msg: "Please login or register 2" })

            const accesstoken = createAccessToken({ id: user.id })
            res.json({ accesstoken })
        })
    },
    getUser: async (req,res) => {
        try{
            
            const user = await Users.findById(req.user.id).select('-password')
            if(!user) return res.status(400).json({msg :"User does not exist"})

            res.json(user)
        }catch(err){
            return res.status(400).json({msg:err.message})
        }
    },
    getBooking: async (req, res) => {
        try { 
            const Bookings = await Booking.find({ userid: req.user.id })
            console.log('Hello')
         
            res.json({Bookings})
        } catch (err) {
            return res.status(400).json({ msg: err.message })
        }
    }
}
const createAccessToken = (user) => {
    return jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '11m' })
}
const createRefreshToken = (user) => {
    return jwt.sign(user, process.env.REFRESH_KEY, { expiresIn: '7d' })
}

module.exports = userController