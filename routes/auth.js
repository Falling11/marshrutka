const express = require('express')
const controller = require('../controllers/auth')
const router = express.Router()

router.get('/login', controller.login)     // вход в систему по паролю     // y

router.patch('/newPassword', controller.newPassword)        // изменение пароля в БД, универсальный метод       // y

router.get('/getDriverRouterID', controller.getDriverRouterID)      // получения массива маршрутов по логину        // у

router.patch('/plusOne', controller.plusOne)        // добавляю пассажира в запись водителя (поштучно!)     // y

router.patch('/minusOne', controller.minusOne)      // отнимаю пассажира в запись водителя (поштучно!)     // y

router.patch('/deletePassengers', controller.deletePassengers)      // обнуление количества пассажиров в записи водителя по логину      // y

router.patch('/setWorkAuto', controller.setWorkAuto)        // изменение флага водителя в записи (работает/неработает)      // у

router.patch('/setGPSDriver', controller.setGPSDriver)        // изменение координат GPS водителя     // у

module.exports = router