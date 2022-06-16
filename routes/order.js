const express = require('express')
const controller = require('../controllers/order')
const router = express.Router()


// создание новой заявки с занесением в файл
// отправка _id новым пользователям
router.post('/createOrder', controller.createOrder)     // y

// получение всех заявок на маршруте
router.post('/getAllOrderByRoute', controller.getAllOrderByRoute)        // y

// получение количества заявок на остановке по маршруту
router.post('/getNumberOrderByStopsOnRoute', controller.getNumberOrderByStopsOnRoute)        // y

// получение начала и конца пути заявки на маршруте
router.post('/getAllOrderByRoute', controller.getAllOrderByRoute)        // y

// отмена заявки, полное удаление
router.post('/disableOrder', controller.disableOrder)       // y

// завершение заявки
// удаление из файла активных
// перенос в файл с отработанными заявками
router.post('/deleteOrder', controller.deleteOrder)     // у

module.exports = router