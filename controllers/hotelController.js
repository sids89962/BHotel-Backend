// const data =  require('../data/data')
const Hotels = require('../model/hotelModel')

const HotelController = {
    getAllHotels: async (req, res) => {
        try {
            const hotels = await Hotels.find()
            if (!hotels) return res.status(404).json({ msg: "Error occured while fetching hotels" })
            res.json(hotels)
        } catch (err) {
            res.status(404).json({ msg: err.message })
        }

    },
    getHotelList: async (req, res) => {
        try {
            console.log(req.query.type)
            console.log(req.params)

            if (!req.query.type) {
                const hotels = await Hotels.find({ city: req.params.city })
                if (!hotels) return res.status(404).json({ msg: "Error occured while fetching hotels" })
                res.json({ hotels })
            } else if (req.query.type !== '') {
                const hotels = await Hotels.find({
                    $and: [{ city: req.params.city },
                    { category: req.query.type }
                    ]
                })
                if (!hotels) return res.status(404).json({ msg: "Error occured while fetching hotels" })
                console.log(hotels)
                res.json({ hotels })
            } 
        } catch (err) {
            res.status(404).json({ msg: err.message })
        }

    },


    createHotel: async (req, res) => {
        try {

            const { hotel, city, price, description, category, address, image, rating } = req.body;
            const Hotel = new Hotels({
                city, hotel, image, category, address, price, rating, description
            })
            await Hotel.save();
            res.json(Hotel);

        } catch (err) {
            res.status(404).json({ msg: err.message });
        }
    },
    getHotelDetail: async (req, res) => {
        try {
            const hotel = await Hotels.find({ _id: req.params.id })
            res.json(hotel)
        } catch (err) {
            res.status(404).json({ msg: err.message });
        }
    }
}

module.exports = HotelController