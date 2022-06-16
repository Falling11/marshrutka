const express = require('express')
const controller = require('../controllers/gps')
const router = express.Router()


router.post('/getJpsByStops', controller.getJpsByStops)


router.post('/getGpsDriver',controller.getGpsDriver)

module.exports = router
