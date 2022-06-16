const express = require('express')
const controller = require('../controllers/stops')
const router = express.Router()


// вывод в массиве всех существующих остановок
router.post('/getAllExistingStops', controller.getAllExistingStops)      // у   

// вывод массива остановок, в которые можно добраться из текущей 
router.post('/getAvailableStopsByName', controller.getAvailableStopsByName)      // у

// вывод всех маршрутов в форме массива
router.post('/getAllRoutes', controller.getAllRoutes)        // у

// вывод массива названий остановок по маршруту
router.post('/getRouteNameByID', controller.getRouteNameByID)        // у

// вывод массива остановок по маршруту с их координатами
router.post('/getRouteNameWithGPSByID', controller.getRouteNameWithGPSByID)        // у

// вывод массива с маршрутами подходящими по пути пассажира
router.post('/getRoutesByStops', controller.getRoutesByStops)        // у

// вывод массива с объектами
// название + координаты остановок
router.post('/getGPSAllStops', controller.getGPSAllStops)        // у

module.exports = router
