const driverUser = require('../models/User_driver')

// все готово
// из пожеланий, нужно переделать все под id вместо login
// функции по изменению количества пассажиров необходимо пересмотреть, если идет несколько запросов в одно время
// !написать функцию по обнулени записи водителя!
// вырезал register 
// выкинул driverGetRouteById, в файле stops есть его аналог

module.exports.login = async function (req, res){       // функция для входа водителя в аккаунт/проверка по паролю
    try{
        const candidate = await driverUser.findOne({"name.login": req.body.login})     // получаю объект водителя
        if (candidate === null){
            res.status(404).json({      // если не нашел водителя
                message: "Запись не найдена"
            })
        } else if (candidate.name.password == req.body.password) {       // случай, если нашел
            res.status(201).json({      // пароли совпали
                message: "Пароль верный"
            })
        } else {
            res.status(201).json({      // пароли не совпали
                message: "Пароль неверен"
            })
        }
    } catch (e) {
        res.status(501).json({      // ошибки в серверной части
            message: "Ошибка сервера. Попробуйте снова"
        })
        console.log(e)
    }
}

module.exports.newPassword = async function (req, res){     // функция для смены пароля водителя
    try{
        let candidate = await driverUser.findOne({"name.login": req.query.login})     // получаю объект водителя
        if (candidate === null){
            res.status(404).json({      // если не нашел водителя
                message: "Запись не найдена"
            })
        } else {        // случай, если нашел
            switch (candidate.flag){
                case 0:
                    if (candidate.name.password == req.query.password){        // смена первоначального пароля
                        candidate.flag = 1      // флаг для повторного запроса, означает, что готово к смене пароля
                        await candidate.save()        // сохранение 
                        res.status(201).json({
                            message: "Введите новый пароль"
                        })
                    } else {     // если первоначальный пароль неверен
                        res.status(201).json({
                            message: "Пароль неверен"
                        })
                    }
                    break
                
                case 1:
                    if (candidate.name.password != req.query.password){        // смена пароля, который был уже изменен
                        candidate.flag = 2      // флаг, что пароль изменен и не соответствует первоначальному
                        candidate.name.password = req.query.password      // смена пароля в БД
                        await candidate.save()        // сохранение
                        res.status(201).json({
                            message: "Пароль изменен"
                        })
                    } else {     // если пароль не совпал со старым
                        res.status(201).json({
                            message: "Это старый пароль, попробуйте еще раз"
                        })
                    }
                    break
                
                case 2:
                    if (candidate.name.password == req.query.password){        // смена пароля, который был уже изменен
                        candidate.flag = 1      // флаг для повторного запроса, означает, что готово к смене пароля
                        await candidate.save()        // сохранение
                        res.status(201).json({
                            message: "Введите новый пароль"
                        })
                    } else {     // если пароль не совпал со старым
                        res.status(201).json({
                            message: "Пароль неверен"
                        })
                    }
                    break
            }
        }
    } catch (e) {
        res.status(501).json({      // ошибки в серверной части
            message: "Ошибка сервера. Попробуйте снова"
        })
        console.log(e)
    }
}

module.exports.getDriverRouterID = async function (req, res){       // функция для получения массива маршрута следования для машины
    try{
        const candidate = (await driverUser.findOne({"name.login": req.query.login})).routeID       // нашли по логину, выделили массив с маршрутами
        if (candidate === null){        // проверка на соответствие
            res.status(404).json({      // если не нашел водителя
                message: "Запись не найдена"
            })
        } else {
            res.status(201).json(candidate)     // вывожу маршруты
        }
    } catch(e) {
        res.status(501).json({      // ошибки в серверной части
            message: "Ошибка сервера. Попробуйте снова"
        })
        console.log(e)
    }
}

module.exports.plusOne = async function (req,res){      // функция для добавления одного пассажира в запись водителя (поштучно!)
    try{
        let candidate = await driverUser.findOne({"name.login": req.query.login})       // нашли по логину запись водителя
        if (candidate === null){        // проверка на соответствие
            res.status(404).json({      // если не нашел водителя
                message: "Запись не найдена"
            })
        } else {
            candidate.quanPassengers++      // добавляю пассажира в запись
            await candidate.save()      // сохраняю
            res.status(201).json({      // все ок, если ок
                message: "Пассажир добавлен"
            })
        }
    } catch(e) {
        res.status(501).json({      // ошибки в серверной части
            message: "Ошибка сервера. Попробуйте снова"
        })
        console.log(e)
    }
}

module.exports.minusOne = async function (req,res){     // функция для вычитания одного пассажира в запись водителя (поштучно!)
    try{
        let candidate = await driverUser.findOne({"name.login": req.query.login})       // нашли по логину запись водителя
        if (candidate === null){        // проверка на соответствие
            res.status(404).json({      // если не нашел водителя
                message: "Запись не найдена"
            })
        } else {
            candidate.quanPassengers--      // отнимаю пассажира из записи
            await candidate.save()      // сохраняю
            res.status(201).json({      // все ок, если ок
                message: "Пассажир вычтен"
            })
        }
    } catch(e) {
        res.status(501).json({      // ошибки в серверной части
            message: "Ошибка сервера. Попробуйте снова"
        })
        console.log(e)
    }
}

module.exports.deletePassengers = async function (req,res){     // функция для обнуление количества пассажиров в записи водителя по логину
    try{
        let candidate = await driverUser.findOne({"name.login": req.query.login})       // нашли по логину запись водителя
        if (candidate === null){        // проверка на соответствие
            res.status(404).json({      // если не нашел водителя
                message: "Запись не найдена"
            })
        } else {
            candidate.quanPassengers = 0      // обнуляю пассажиров у водителя
            await candidate.save()      // сохраняю
            res.status(201).json({      // все ок, если ок
                message: "Количество пассажиров обнулено"
            })
        }
    } catch(e) {
        res.status(501).json({      // ошибки в серверной части
            message: "Ошибка сервера. Попробуйте снова"
        })
        console.log(e)
    } 
}

module.exports.setWorkAuto = async function (req, res){      // функция для изменения флага в записи водителя
    try{
        if (!(await driverUser.findOneAndUpdate({"name.login": req.query.login}, { $set: {"workAuto": req.query.workAuto}}))){        // нахожу запись, меняю флаг
            res.status(404).json({      // если не нашел водителя
                message: "Запись не найдена"
            })
        } else {
            res.status(201).json({      // все ок, если ок
                message: "Флаг изменен"
            })
        }
    } catch(e) {
        res.status(501).json({      // ошибки в серверной части
            message: "Ошибка сервера. Попробуйте снова"
        })
        console.log(e)
    }
}

module.exports.setGPSDriver = async function(req, res){     // функция для изменения данных GPS по логину водителя
    try{
        if (!(await driverUser.findOneAndUpdate({"name.login": req.query.login}, {"gps.latitude": req.query.latitude, "gps.longitude": req.query.longitude}))){        // нахожу запись, меняю поля координат
            res.status(404).json({      // если не нашел водителя
                message: "Запись не найдена"
            })
        } else {
            res.status(201).json({      // все ок, если ок
                message: "GPS данные обновлены"
            })
        }
    } catch(e) {
        res.status(501).json({      // ошибки в серверной части
            message: "Ошибка сервера. Попробуйте снова"
        })
        console.log(e)
    }
}
