const Users =  require('../model/userModel')
const Booking = require('../model/bookingModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const userController = {
    register: async (req,res) =>{
            const {name,email,password} =  req.body
    
            try{
                const ifExist =await Users.findOne({email:email})
                if(ifExist) return res.status(500).json({msg:"User already exists"})
                

               if(password.length < 6)
              return res.status(400).json({msg:"The password is too short"})

                const hashedPass = await bcrypt.hash(password,12)
                const user = new Users({
                    name, email, password:hashedPass
                })
                await user.save()
                
                //JSONWEBTOKEN Authentication

                const accesstoken = createAccessToken({id: user._id})
                const refreshtoken = createRefreshToken({id: user._id})

                res.cookie('refrestoken', refreshtoken, {
                    httpOnly: true,
                    path: '/users/refresh_token',
                    maxAge: 7*24*60*60*1000
                })
                res.json({accesstoken})
            }catch(err){
                console.log(err)
                return res.status(500).json({msg: err})
            }
    },
    login: async(req,res) => {       
        try{
            const {email,password} = req.body
            const user = await Users.find({email:email})
            if(!user) return res.status(400).json({msg:"User does not exist"})

            const isMatch = bcrypt.compare(password,user.password)
            if(!isMatch) return res.json({msg:"Invalid credentials"})

            const accesstoken = createAccessToken({id: user._id})
            const refreshtoken = createRefreshToken({id: user._id})

            res.cookie('refreshtoken',refreshtoken, {
                httpOnly:true,
                path:'/users/refresh_token',
                maxAge: 7*24*60*60*1000
            })
            res.json({accesstoken})
        }catch(err){
            return res.status(500).json({msg:err})
        }

    },
    logout: async (req,res) => {
        try{
        res.clearCookie('refreshtoken', {path: '/users/refresh_token'})
        return res.status(200).json({msg:"Logged Out"})
        }catch(err){
            return res.status(400).json({msg:err.message})
        }
    },
    refreshToken: (req,res) => {
        const rf_token = req.cookies.refreshToken
        if(!rf_token) return res.status(400).json({msg:"Please login or register"})
        jwt.verify(rf_token, process.env.REFRESH_KEY, (err,user) => {
            if(err) return res.status(400).json({msg:"Please login or register 2"})
        
        const accesstoken = createAccessToken({id: user.id})
        res.json({accesstoken})
        })
    },
    getBooking:async (req,res) => {
        try{
           const userBooking = await Booking.find({userid: req.user._id})
            res.json(userBooking)
        }catch(err){
            return res.status(400).json({msg: err.message})
        }
    }
}
const createAccessToken = (user) => {
    return jwt.sign(user, process.env.SECRET_KEY, {expiresIn: '11m'})
}
const createRefreshToken = (user) => {
    return jwt.sign(user,process.env.REFRESH_KEY, {expiresIn:'7d'})
}
module.exports = userController