const HotelController = require('../controllers/hotelController')

const router = require('express').Router()



router.route('/hotels')
            .get(HotelController.getAllHotels)
            .post(HotelController.createHotel)
router.get('/hotels/city/:city',HotelController.getHotelList) 
router.get('/hotels/:id',HotelController.getHotelDetail) 

module.exports = router