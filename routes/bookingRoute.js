
const router = require('express').Router()
const bookingController = require('../controllers/bookingController')
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

router.route('/booking')
        .post(auth ,bookingController.createBooking)
        .get(auth, authAdmin, bookingController.getAllBooking)
        .put(auth,authAdmin, bookingController.setBooking)

module.exports = router