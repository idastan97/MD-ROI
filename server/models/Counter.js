var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
//схема для счетчика (метрики)
var Counter = new Schema({
    id: {type: Number, unique: true}, //аиди из метрики
    name: {type: String, required: true}, // имя
    goalId: {type: Number, required: true}, // аиди цели (заявки)
    yandexCompanies: {type: Array}, // список яндекс компании
    fbAdsCompanies: {type: Array}, // список фейсбук компании
    instaCompanies: {type: Array}, // список инста компании
    yandexBudget: {type: Number}, // бюджет в яндекс (директ)
    fbBudget: {type: Number}, // бюджет в фейсбуке
    instaBudget: {type: Number}, // бюджет в инсте
    yandexDeals: {type: Number}, // дилс яндекса
    fbDeals: {type: Number}, // дилс фейсбука
    instaDeals: {type: Number} // дилс инсты
});

module.exports = mongoose.model('Counter', Counter);
