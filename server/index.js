const app = require('express');
const router = app.Router();
const tokens = require('../tokenConfig.json'); // файл с токенами
const axios = require('axios');

const Counter = require('./models/Counter'); // счетчики

// подключаем паспорт
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/User'); // админ

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// апи для регистрации админа (раскоментить для регистрации админа, потом можно закаоенить)
// router.post('/signup', function(req, res) {
//   User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
//       console.log(' - signup');
//       if (err) {
//           console.log(err.message);
//           res.send(err.message);
//       }
//
//       else {
//           console.log(user);
//           res.send('ok');
//       }
//   });
// });

// апи для логина админа
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.send('ok');
});

//апи для логаута админа
router.get('/logout', function(req, res) {
     req.session.destroy(function(err) {
         res.send('ok');
     })
});

//апи для проверки сессии админа
router.get('/checksession', function(req, res) {
    if(req.session && req.session.passport){
        res.send('logged').end(); // сессия есть
    } else {
        res.send('notlogged').end(); // сессии нет
    }
});

//апи для добавления счетчика метрики
router.post('/addcounter', function(req, res){
  //стучимся к метрике для проверки айди и чтобы получить имя счетчика
  axios.get("https://api-metrika.yandex.ru/management/v1/counter/"+req.body.id+"?oauth_token="+tokens.yandex)
    .then(resp => {

          //еслт айди правильный, стучимся опять чтобы взять аиди цели
          axios.get("https://api-metrika.yandex.ru/management/v1/counter/"+req.body.id+"/goals?oauth_token="+tokens.yandex)
            .then(resp3 => {
              var targetArr = resp3.data.goals;
              var goalId;
              //метрика отправляет список доступных целей, из них находим Заявку
              targetArr.forEach(function(targetOne, targI, targetArr){
                if (targetOne.name==='Заявка'){
                  goalId=targetOne.id;
                }
              })

              //сохроняем счетчик в базу
              var counter = new Counter({
                id: req.body.id,
                name: resp.data.counter.name,
                goalId: goalId,
                yandexCompanies: [],
                fbAdsCompanies: [],
                instaCompanies: [],
                yandexBudget: 0,
                fbBudget: 0,
                instaBudget: 0,
                yandexDeals: 0,
                fbDeals: 0,
                instaDeals: 0
              });
              counter.save(function (err, savedCounter) {
                if(err){
                  res.status(500).send(err.message);
                  return;
                }
                res.send(savedCounter);
              });

            })
            .catch(error => {
              console.log(error);
              res.status(500).send('error');
            });

    })
      .catch(error => {
        console.log(error);
        res.status(500).send('error');
      });
});

//получить список счетчиков из базы
router.get('/counters', function(req, res){
  Counter.find()
      .exec(function (err, counters) {
          if(err){
              res.status(500).send(err.message);
              return;
          }
          res.send(counters);
      });
});

//удалить счетчик по айди (не аиди счетчика, а аиди записи в базе)
// входные: аиди счетчика в базе, индекс компании в массиве счетика
router.post('/deletecounter', function(req, res){
  Counter.findByIdAndRemove(req.body.counter, function(err){
    if(err){
        res.status(500).send(err.message);
        return;
    }
    res.send(req.body.counter);
  })
});

//добавить компанию фейсбук в выбранный счетчик по аиди записи счетчика
// входные: айиди счетчика из базы, айди компании
router.post('/addfbadscompany', function(req, res){
  Counter.findById(req.body.counter, function (err, counter) {
    if (err){
      res.status(500).send(err.message);
      return;
    }

    counter.fbAdsCompanies.push(req.body.newFbAdsCompany);
    counter.save(function (err, updatedCounter) {
      if (err){
        res.status(500).send(err.message);
        return;
      }
      res.send(updatedCounter);
    });
  });
});

//удалить компанию фейсбук из выбранного счетчика по его айдишке
router.post('/deletefbadscompany', function(req, res){
  Counter.findById(req.body.counter, function (err, counter) {
    if (err){
      res.status(501).send(err.message);
      return;
    }

    counter.fbAdsCompanies.splice(req.body.fbAdsCompanyIndex, 1);
    counter.save(function (err, updatedCounter) {
      if (err){
        res.status(502).send(err.message);
        return;
      }
      res.send(updatedCounter);
    });
  });
});

//добавить компанию яндекса в счетчик
router.post('/addyandexcompany', function(req, res){
  Counter.findById(req.body.counter, function (err, counter) {
    if (err){
      res.status(500).send(err.message);
      return;
    }

    counter.yandexCompanies.push(req.body.newYandexCompany);
    counter.save(function (err, updatedCounter) {
      if (err){
        res.status(500).send(err.message);
        return;
      }
      res.send(updatedCounter);
    });
  });
});

//удалить яндекс компанию из счетчика
router.post('/deleteyandexcompany', function(req, res){
  Counter.findById(req.body.counter, function (err, counter) {
    if (err){
      res.status(501).send(err.message);
      return;
    }

    counter.yandexCompanies.splice(req.body.yandexCompanyIndex, 1);
    counter.save(function (err, updatedCounter) {
      if (err){
        res.status(502).send(err.message);
        return;
      }
      res.send(updatedCounter);
    });
  });
});

//добавить компанию инсты
router.post('/addinstacompany', function(req, res){
  Counter.findById(req.body.counter, function (err, counter) {
    if (err){
      res.status(500).send(err.message);
      return;
    }

    counter.instaCompanies.push(req.body.newInstaCompany);
    counter.save(function (err, updatedCounter) {
      if (err){
        res.status(500).send(err.message);
        return;
      }
      res.send(updatedCounter);
    });
  });
});

//удалить компанию инсты
router.post('/deleteinstacompany', function(req, res){
  Counter.findById(req.body.counter, function (err, counter) {
    if (err){
      res.status(501).send(err.message);
      return;
    }

    counter.instaCompanies.splice(req.body.instaCompanyIndex, 1);
    counter.save(function (err, updatedCounter) {
      if (err){
        res.status(502).send(err.message);
        return;
      }
      res.send(updatedCounter);
    });
  });
});

//установить бюджет для яндексы для выбранного счетчика
router.post('/setyandexbudget', function(req, res){
  Counter.findById(req.body.counter, function (err, counter) {
    if (err){
      res.status(500).send(err.message);
      return;
    }

    counter.yandexBudget=req.body.yandexBudget;
    counter.save(function (err, updatedCounter) {
      if (err){
        res.status(500).send(err.message);
        return;
      }
      res.send(updatedCounter);
    });
  });
});

//установить бюджет для инсты
router.post('/setinstabudget', function(req, res){
  Counter.findById(req.body.counter, function (err, counter) {
    if (err){
      res.status(500).send(err.message);
      return;
    }

    counter.instaBudget=req.body.instaBudget;
    counter.save(function (err, updatedCounter) {
      if (err){
        res.status(500).send(err.message);
        return;
      }
      res.send(updatedCounter);
    });
  });
});

//установить бюджет для фейсбук
router.post('/setfbbudget', function(req, res){
  Counter.findById(req.body.counter, function (err, counter) {
    if (err){
      res.status(500).send(err.message);
      return;
    }

    counter.fbBudget=req.body.fbBudget;
    counter.save(function (err, updatedCounter) {
      if (err){
        res.status(500).send(err.message);
        return;
      }
      res.send(updatedCounter);
    });
  });
});

//установить дилс для яндекс в выбранном счетчике
router.post('/setyandexdeals', function(req, res){
  Counter.findById(req.body.counter, function (err, counter) {
    if (err){
      res.status(500).send(err.message);
      return;
    }

    counter.yandexDeals=req.body.yandexDeals;
    counter.save(function (err, updatedCounter) {
      if (err){
        res.status(500).send(err.message);
        return;
      }
      res.send(updatedCounter);
    });
  });
});

//установить дилс для инсты
router.post('/setinstadeals', function(req, res){
  Counter.findById(req.body.counter, function (err, counter) {
    if (err){
      res.status(500).send(err.message);
      return;
    }

    counter.instaDeals=req.body.instaDeals;
    counter.save(function (err, updatedCounter) {
      if (err){
        res.status(500).send(err.message);
        return;
      }
      res.send(updatedCounter);
    });
  });
});

//установить дилс для фейсбук
router.post('/setfbdeals', function(req, res){
  Counter.findById(req.body.counter, function (err, counter) {
    if (err){
      res.status(500).send(err.message);
      return;
    }

    counter.fbDeals=req.body.fbDeals;
    counter.save(function (err, updatedCounter) {
      if (err){
        res.status(500).send(err.message);
        return;
      }
      res.send(updatedCounter);
    });
  });
});

//апи для получения опщей статистики ('all')
router.get('/getdata', function(req, res){
  console.log('api getdata');
  Counter.find() //находим все счетчики из базы
      .exec(function (err, counters) {
          if(err){
              res.status(500).send(err.message);
              return;
          }
          //создаем переменные
          var yandexWeekReaches = 0; //число заявок (достижении цели) за неделю в яндексесе
          var facebookWeekReaches = 0; //число заявок (достижении цели) за неделю в фейсбуке
          var instaWeekReaches = 0; //число заявок (достижении цели) за неделю в инсте
          var yandexDayReaches = 0; //число заявок (достижении цели) за день в яндексесе
          var facebookDayReaches = 0; //число заявок (достижении цели) за день в фейсбуке
          var instaDayReaches = 0; //число заявок (достижении цели) за день в инсте
          var weekRejects = 0; //общее количество отказов за неделю
          var yandexBudget = 0; //общий бюджет яндекса за все счетчики
          var fbBudget = 0; //общий бюджет фейсбук за все счетчики
          var instaBudget = 0; //общий бюджет инсты за все счетчики
          var yandexDeals = 0; //общий дилс яндекса за все счетчики
          var fbDeals = 0; //общий дилс фейсбука за все счетчики
          var instaDeals = 0; //общий дилс инсты за все счетчики

          var yandexCompanies = []; //масив для хранения всех компании яндекса
          var fbAdsCompanies = []; //масив для хранения всех компании фейсбука
          var instaCompanies = []; //масив для хранения всех компании инсты

          function getIDS(i){ //рекурсивная функция для постепенного получения данных

            if (i===counters.length){ //последняя операция функции, когда все массивы компании готовы
              console.log('metrika done');
              //настраиваем даты
              var today = new Date(); //сегодня
              var curr_date = today.getDate();
              var curr_month = today.getMonth() + 1;
              var curr_year = today.getFullYear();
              var todayFormated = curr_year + "-" + (curr_month>9 ? curr_month : "0"+curr_month) + "-" + (curr_date>9 ? curr_date : "0"+curr_date);

              var oneWeekAgo = new Date(); //неделю назад
              oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
              var weekAgo_date = oneWeekAgo.getDate();
              var weekAgo_month = oneWeekAgo.getMonth() + 1;
              var weekAgo_year = oneWeekAgo.getFullYear();
              var weekAgoFormated = weekAgo_year + "-" + (weekAgo_month>9 ? weekAgo_month : "0"+weekAgo_month) + "-" + (weekAgo_date>9 ? weekAgo_date : "0"+weekAgo_date);

              var yesterday = new Date(); //вчера
              yesterday.setDate(yesterday.getDate() - 1);
              var yesterday_date = yesterday.getDate();
              var yesterday_month = yesterday.getMonth() + 1;
              var yesterday_year = yesterday.getFullYear();
              var yesterdayFormated = yesterday_year + "-" + (yesterday_month>9 ? yesterday_month : "0"+yesterday_month) + "-" + (yesterday_date>9 ? yesterday_date : "0"+yesterday_date);

              //получаем данные с яндекса (директ)
              axios.post('https://api.direct.yandex.ru/live/v4/json/',{
                "method": "GetSummaryStat",
                "param": {
                  /* GetSummaryStatRequest */
                  "CampaignIDS": yandexCompanies, //отправляем список компании яндекса
                  "StartDate": weekAgoFormated, //статистика за неделю
                  "EndDate": todayFormated,
                  "Currency": 'KZT'
                },
                "locale": "ru",
                "token": tokens.yandex, //токен яндекса из файла
              }, {
                responseType: 'json',
                headers: {
                  'Content-Length': 204,
                  'Content-Type': 'application/json'
                }
              })
                .then(resp => {
                  var dataArr = resp.data.data; //респонс массив
                  //данные отправляются по дням, статистика каждого дня за последние 7 дней
                  console.log(resp.data);
                  //переменные для яндекса
                  var yandexWeekClicks = 0; //клики за неделю
                  var yandexWeekShows = 0; //показы за неделю
                  var yandexDayClicks = 0; //клики за день
                  var yandexDayShows = 0; //показы за день
                  var yandexWeekSpent = 0; //потрачено за неделю
                  var yandexDaySpent = 0; //потрачено за день
                  var yandexArrLength = dataArr.length; //длина респонс массива
                  for (var i=0; i<yandexArrLength; i++){ //проходимся по данным массива
                    //сохраняем данные (суммируем)
                    //ClicksContext - клики в контексте, ClicksSearch - клики в поиске
                    yandexWeekClicks=yandexWeekClicks+dataArr[i].ClicksContext+dataArr[i].ClicksSearch;
                    yandexWeekShows=yandexWeekShows+dataArr[i].ShowsContext+dataArr[i].ShowsSearch;
                    yandexWeekSpent=yandexWeekSpent+dataArr[i].SumContext+dataArr[i].SumSearch;
                    if (dataArr[i].StatDate===todayFormated){ //если данные за сегодня, то добавляем их в статистику за сегодня
                      yandexDayClicks=yandexDayClicks+dataArr[i].ClicksContext+dataArr[i].ClicksSearch;
                      yandexDayShows=yandexDayShows+dataArr[i].ShowsContext+dataArr[i].ShowsSearch;
                      yandexDaySpent=yandexDaySpent+dataArr[i].SumContext+dataArr[i].SumSearch;
                    }
                  }

                  //переменные для инсты
                  var instaWeekClicks = 0;
                  var instaWeekShows = 0;
                  var instaDayClicks = 0;
                  var instaDayShows = 0;
                  var instaWeekSpent = 0;
                  var instaDaySpent = 0;

                  //настраиваем массив для гет запроса для инсты (facebook ads)
                  //прочитай документацию facebook ads api
                  var instaCalls = [];
                  instaCompanies.forEach(function(instaComp, instaI, instaCompanies){
                    instaCalls.push({
                      "method": "GET",
                      "relative_url": 'v2.9/'+instaCompanies[instaI]+'/insights?fields=impressions,spend,clicks&time_ranges[]={"since":"'+weekAgoFormated.toString()+'","until":"'+todayFormated.toString()+'"}&time_ranges[]={"since":"'+yesterdayFormated.toString()+'","until":"'+todayFormated.toString()+'"}'
                    });
                  });

                  console.log('direct done');

                  axios.post("https://graph.facebook.com/", {
                    access_token: tokens.fb, //токен для фейсбук адс
                    batch: instaCalls //отправляем массив гет запроса
                  })
                    .then((resp2)=>{
                      var resp2Arr = resp2.data; //сохраняем ремпнс массив
                      //советую поставить консоль лог для массива и посмотреть формат респонса
                      resp2Arr.forEach(function(resp2Dat, resp2I, resp2Arr){ //пробегаемся по данным респонс массива
                        //парс джейсон потомучто боди отправляется в стринге, и нужно перевести в формат джесон
                        //парс инт для перевода текста в число

                        instaWeekClicks = instaWeekClicks + parseInt(JSON.parse(resp2Dat.body).data[0].clicks); //суммируем клики за неделю
                        instaWeekShows = instaWeekShows + parseInt(JSON.parse(resp2Dat.body).data[0].impressions); //показы за неделю
                        instaWeekSpent = instaWeekSpent + parseInt(JSON.parse(resp2Dat.body).data[0].spend); //потрачено за неделю
                        instaDayClicks = instaDayClicks + parseInt(JSON.parse(resp2Dat.body).data[1].clicks); //клики за день
                        instaDayShows = instaDayShows + parseInt(JSON.parse(resp2Dat.body).data[1].impressions); //показы за день
                        instaDaySpent = instaDaySpent + parseInt(JSON.parse(resp2Dat.body).data[1].spend); //потрачено за день
                      });

                      console.log('insta done');

                      //с фейсбуком то же самое что и с инстаграмом
                      var fbWeekClicks = 0;
                      var fbWeekShows = 0;
                      var fbDayClicks = 0;
                      var fbDayShows = 0;
                      var fbWeekSpent = 0;
                      var fbDaySpent = 0;

                      var fbCalls = [];
                      fbAdsCompanies.forEach(function(fbComp, fbI, fbAdsCompanies){
                        fbCalls.push({
                          "method": "GET",
                          "relative_url": 'v2.9/'+fbAdsCompanies[fbI]+'/insights?fields=impressions,spend,clicks&time_ranges[]={"since":"'+weekAgoFormated.toString()+'","until":"'+todayFormated.toString()+'"}&time_ranges[]={"since":"'+yesterdayFormated.toString()+'","until":"'+todayFormated.toString()+'"}'
                        });
                      });

                      axios.post("https://graph.facebook.com/", {
                        access_token: tokens.fb,
                        batch: fbCalls
                      })
                        .then((resp3)=>{
                          var resp3Arr = resp3.data;
                          resp3Arr.forEach(function(resp3Dat, resp3I, resp3Arr){
                            fbWeekClicks = fbWeekClicks + parseInt(JSON.parse(resp3Dat.body).data[0].clicks);
                            fbWeekShows = fbWeekShows + parseInt(JSON.parse(resp3Dat.body).data[0].impressions);
                            fbWeekSpent = fbWeekSpent + parseInt(JSON.parse(resp3Dat.body).data[0].spend);
                            fbDayClicks = fbDayClicks + parseInt(JSON.parse(resp3Dat.body).data[1].clicks);
                            fbDayShows = fbDayShows + parseInt(JSON.parse(resp3Dat.body).data[1].impressions);
                            fbDaySpent = fbDaySpent + parseInt(JSON.parse(resp3Dat.body).data[1].spend);
                          });

                          console.log('fb done');

                          //получаем курс тенге доллар
                          //фейсбук отправляет данные в долларах, поэтому нужен курс
                          axios.get('https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDKZT%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=')
                            .then((resp4)=>{
                              var oneUSD=parseInt(resp4.data.query.results.rate.Rate); //курс
                              console.log('KZT-USD: '+oneUSD);
                              res.send({
                                //отправляем собранные данные
                                yandexWeekShows: yandexWeekShows,
                                yandexWeekClicks: yandexWeekClicks,
                                yandexDayShows: yandexDayShows,
                                yandexDayClicks: yandexDayClicks,
                                yandexWeekReaches: yandexWeekReaches,
                                yandexDayReaches: yandexDayReaches,
                                yandexCampaigns: yandexCompanies.length,
                                yandexWeekSpent: yandexWeekSpent,
                                yandexDaySpent: yandexDaySpent,

                                fbWeekShows: fbWeekShows,
                                fbWeekClicks: fbWeekClicks,
                                fbDayShows: fbDayShows,
                                fbDayClicks: fbDayClicks,
                                facebookWeekReaches: facebookWeekReaches,
                                facebookDayReaches: facebookDayReaches,
                                fbAdsCampaigns: fbAdsCompanies.length,
                                fbWeekSpent: fbWeekSpent*oneUSD,
                                fbDaySpent: fbDaySpent*oneUSD,

                                instaWeekShows: instaWeekShows,
                                instaWeekClicks: instaWeekClicks,
                                instaDayShows: instaDayShows,
                                instaDayClicks: instaDayClicks,
                                instaWeekReaches: instaWeekReaches,
                                instaDayReaches: instaDayReaches,
                                instaCampaigns: instaCompanies.length,
                                instaWeekSpent: instaWeekSpent*oneUSD, //используем курс
                                instaDaySpent: instaDaySpent*oneUSD,

                                yandexBudget: yandexBudget,
                                fbBudget: fbBudget,
                                instaBudget: instaBudget,
                                deals: yandexDeals+fbDeals+instaDeals, //общий дилс суммируется
                                weekRejects: weekRejects //количество отказов
                              });
                            })
                        })

                      })
                      .catch(error => {
                        console.log(error);
                      });


                })
                  .catch(error => {
                    console.log(error);
                  });


            } else { //если это не последняя операция продолжаем загружать данные с метрики

              // суммируем бюджеты и дилс всех счетчиков
              yandexBudget = yandexBudget + counters[i].yandexBudget;
              fbBudget = fbBudget + counters[i].fbBudget;
              instaBudget = instaBudget + counters[i].instaBudget;
              yandexDeals = yandexDeals + counters[i].yandexDeals;
              fbDeals = fbDeals + counters[i].fbDeals;
              instaDeals = instaDeals + counters[i].instaDeals;

              //получаем данные с метрики за неделю
              axios.get("https://api-metrika.yandex.ru/stat/v1/data?dimensions=ym:s:UTMSource&metrics=ym:s:goal%3Cgoal_id%3Ereaches,ym:s:visits,ym:s:bounceRate&date1=6daysAgo&date2=today&goal_id="+counters[i].goalId+"&id="+counters[i].id+"&oauth_token="+tokens.yandex)
                .then(resp => {
                  var dataArr = resp.data.data;
                  //из метрики берем количество заявок за неделю
                  dataArr.forEach(function(dataOne, index, dataArr){ //проходимся по всем записям массива
                    weekRejects=weekRejects+Math.round(dataOne.metrics[1]*dataOne.metrics[2]/100); //количество отказов= доля отказов*визиты/100 (и суммируем)
                    switch (dataOne.dimensions[0].name) { //проверяем названия источников перехода
                      case "yandex": //если яндекс то суммируем к яндексу
                        yandexWeekReaches = yandexWeekReaches + dataOne.metrics[0];
                        break;
                      case "fb": //фейсбук к фейсбуку
                        facebookWeekReaches = facebookWeekReaches + dataOne.metrics[0];
                        break;
                      case "insta": //инста
                        instaWeekReaches = instaWeekReaches + dataOne.metrics[0];
                        break;
                      default:
                        break;
                    }
                  });

                  //повторно стучимся чтобы получить данные за день
                  axios.get("https://api-metrika.yandex.ru/stat/v1/data?dimensions=ym:s:UTMSource&metrics=ym:s:goal%3Cgoal_id%3Ereaches&date1=today&date2=today&goal_id="+counters[i].goalId+"&id="+counters[i].id+"&oauth_token="+tokens.yandex)
                    .then(resp => {
                      //то же самое что и за неделю
                      var dataArr2 = resp.data.data;
                      dataArr2.forEach(function(dataOne, index, dataArr2){
                        switch (dataOne.dimensions[0].name) {
                          case "yandex":
                            yandexDayReaches = yandexDayReaches + dataOne.metrics[0];
                            break;
                          case "fb":
                            facebookDayReaches = facebookDayReaches + dataOne.metrics[0];
                            break;
                          case "insta":
                            instaDayReaches = instaDayReaches + dataOne.metrics[0];
                            break;
                          default:
                            break;
                        }
                      });
                      //создаем массив из всех компании
                      //кидаем компании одного счетчика в общий массив компании
                      yandexCompanies = yandexCompanies.concat(counters[i].yandexCompanies);
                      fbAdsCompanies = fbAdsCompanies.concat(counters[i].fbAdsCompanies);
                      instaCompanies = instaCompanies.concat(counters[i].instaCompanies);
                      getIDS(i+1); //запускаем следующий счетчик
                    })
                      .catch(error => {
                        console.log(error);
                      });

                })
                  .catch(error => {
                    console.log(error);
                  });
            }

          }

          getIDS(0);

      });


})

//то же самое что и общей статистикой, но из базы берем только один счетчик по его аидишке (из базы)
router.post('/getcounterdata', function(req, res){
  console.log('api getcounterdata');
  Counter.findById(req.body.counter, function (err, counter) {
          console.log(counter);
          if(err){
              res.status(500).send(err.message);
              return;
          }
          var yandexWeekReaches = 0;
          var facebookWeekReaches = 0;
          var instaWeekReaches = 0;
          var yandexDayReaches = 0;
          var facebookDayReaches = 0;
          var instaDayReaches = 0;
          var weekRejects = 0;
          var yandexBudget = counter.yandexBudget;
          var fbBudget = counter.fbBudget;
          var instaBudget = counter.instaBudget;
          var yandexDeals = counter.yandexDeals;
          var fbDeals = counter.fbDeals;
          var instaDeals = counter.instaDeals;

          var yandexCompanies = [];
          var fbAdsCompanies = [];
          var instaCompanies = [];

          axios.get("https://api-metrika.yandex.ru/stat/v1/data?dimensions=ym:s:UTMSource&metrics=ym:s:goal%3Cgoal_id%3Ereaches,ym:s:visits,ym:s:bounceRate&date1=6daysAgo&date2=today&goal_id="+counter.goalId+"&id="+counter.id+"&oauth_token="+tokens.yandex)
            .then(respS => {
              var dataArrS = respS.data.data;
              dataArrS.forEach(function(dataOne, index, dataArrS){
                weekRejects=weekRejects+Math.round(dataOne.metrics[1]*dataOne.metrics[2]/100);
                switch (dataOne.dimensions[0].name) {
                  case "yandex":
                    yandexWeekReaches = yandexWeekReaches + dataOne.metrics[0];
                    break;
                  case "fb":
                    facebookWeekReaches = facebookWeekReaches + dataOne.metrics[0];
                    break;
                  case "insta":
                    instaWeekReaches = instaWeekReaches + dataOne.metrics[0];
                    break;
                  default:
                    break;
                }
              });

              axios.get("https://api-metrika.yandex.ru/stat/v1/data?dimensions=ym:s:UTMSource&metrics=ym:s:goal%3Cgoal_id%3Ereaches&date1=today&date2=today&goal_id="+counter.goalId+"&id="+counter.id+"&oauth_token="+tokens.yandex)
                .then(respS2 => {
                  var dataArrS2 = respS2.data.data;
                  dataArrS2.forEach(function(dataOne, index, dataArrS2){
                    switch (dataOne.dimensions[0].name) {
                      case "yandex":
                        yandexDayReaches = yandexDayReaches + dataOne.metrics[0];
                        break;
                      case "fb":
                        facebookDayReaches = facebookDayReaches + dataOne.metrics[0];
                        break;
                      case "insta":
                        instaDayReaches = instaDayReaches + dataOne.metrics[0];
                        break;
                      default:
                        break;
                    }
                  });
                  yandexCompanies = counter.yandexCompanies;
                  fbAdsCompanies = counter.fbAdsCompanies;
                  instaCompanies = counter.instaCompanies;

                  console.log('metrika done');
                  var today = new Date();
                  var curr_date = today.getDate();
                  var curr_month = today.getMonth() + 1;
                  var curr_year = today.getFullYear();
                  var todayFormated = curr_year + "-" + (curr_month>9 ? curr_month : "0"+curr_month) + "-" + (curr_date>9 ? curr_date : "0"+curr_date);

                  var oneWeekAgo = new Date();
                  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                  var weekAgo_date = oneWeekAgo.getDate();
                  var weekAgo_month = oneWeekAgo.getMonth() + 1;
                  var weekAgo_year = oneWeekAgo.getFullYear();
                  var weekAgoFormated = weekAgo_year + "-" + (weekAgo_month>9 ? weekAgo_month : "0"+weekAgo_month) + "-" + (weekAgo_date>9 ? weekAgo_date : "0"+weekAgo_date);

                  var yesterday = new Date();
                  yesterday.setDate(yesterday.getDate() - 1);
                  var yesterday_date = yesterday.getDate();
                  var yesterday_month = yesterday.getMonth() + 1;
                  var yesterday_year = yesterday.getFullYear();
                  var yesterdayFormated = yesterday_year + "-" + (yesterday_month>9 ? yesterday_month : "0"+yesterday_month) + "-" + (yesterday_date>9 ? yesterday_date : "0"+yesterday_date);

                  if (yandexCompanies.length>0){
                    axios.post('https://api.direct.yandex.ru/live/v4/json/',{
                      "method": "GetSummaryStat",
                      "param": {
                        /* GetSummaryStatRequest */
                        "CampaignIDS": yandexCompanies,
                        "StartDate": weekAgoFormated,
                        "EndDate": todayFormated,
                        "Currency": 'KZT'
                      },
                      "locale": "ru",
                      "token": tokens.yandex,
                    }, {
                      responseType: 'json',
                      headers: {
                        'Content-Length': 204,
                        'Content-Type': 'application/json'
                      }
                    })
                      .then(resp => {
                        var dataArr = resp.data.data;
                        var yandexWeekClicks = 0;
                        var yandexWeekShows = 0;
                        var yandexDayClicks = 0;
                        var yandexDayShows = 0;
                        var yandexWeekSpent = 0;
                        var yandexDaySpent = 0;
                        var yandexArrLength = dataArr.length;
                        for (var i=0; i<yandexArrLength; i++){
                          yandexWeekClicks=yandexWeekClicks+dataArr[i].ClicksContext+dataArr[i].ClicksSearch;
                          yandexWeekShows=yandexWeekShows+dataArr[i].ShowsContext+dataArr[i].ShowsSearch;
                          yandexWeekSpent=yandexWeekSpent+dataArr[i].SumContext+dataArr[i].SumSearch;
                          if (dataArr[i].StatDate===todayFormated){
                            yandexDayClicks=yandexDayClicks+dataArr[i].ClicksContext+dataArr[i].ClicksSearch;
                            yandexDayShows=yandexDayShows+dataArr[i].ShowsContext+dataArr[i].ShowsSearch;
                            yandexDaySpent=yandexDaySpent+dataArr[i].SumContext+dataArr[i].SumSearch;
                          }
                        }

                        var instaWeekClicks = 0;
                        var instaWeekShows = 0;
                        var instaDayClicks = 0;
                        var instaDayShows = 0;
                        var instaWeekSpent = 0;
                        var instaDaySpent = 0;

                        var instaCalls = [];
                        instaCompanies.forEach(function(instaComp, instaI, instaCompanies){
                          instaCalls.push({
                            "method": "GET",
                            "relative_url": 'v2.9/'+instaCompanies[instaI]+'/insights?fields=impressions,spend,clicks&time_ranges[]={"since":"'+weekAgoFormated.toString()+'","until":"'+todayFormated.toString()+'"}&time_ranges[]={"since":"'+yesterdayFormated.toString()+'","until":"'+todayFormated.toString()+'"}'
                          });
                        });

                        console.log('direct done');

                        axios.post("https://graph.facebook.com/", {
                          access_token: tokens.fb,
                          batch: instaCalls
                        })
                          .then((resp2)=>{
                            var resp2Arr = resp2.data;
                            resp2Arr.forEach(function(resp2Dat, resp2I, resp2Arr){
                              instaWeekClicks = instaWeekClicks + parseInt(JSON.parse(resp2Dat.body).data[0].clicks);
                              instaWeekShows = instaWeekShows + parseInt(JSON.parse(resp2Dat.body).data[0].impressions);
                              instaWeekSpent = instaWeekSpent + parseInt(JSON.parse(resp2Dat.body).data[0].spend);
                              instaDayClicks = instaDayClicks + parseInt(JSON.parse(resp2Dat.body).data[1].clicks);
                              instaDayShows = instaDayShows + parseInt(JSON.parse(resp2Dat.body).data[1].impressions);
                              instaDaySpent = instaDaySpent + parseInt(JSON.parse(resp2Dat.body).data[1].spend);
                            });

                            console.log('insta done');

                            var fbWeekClicks = 0;
                            var fbWeekShows = 0;
                            var fbDayClicks = 0;
                            var fbDayShows = 0;
                            var fbWeekSpent = 0;
                            var fbDaySpent = 0;

                            var fbCalls = [];
                            fbAdsCompanies.forEach(function(fbComp, fbI, fbAdsCompanies){
                              fbCalls.push({
                                "method": "GET",
                                "relative_url": 'v2.9/'+fbAdsCompanies[fbI]+'/insights?fields=impressions,spend,clicks&time_ranges[]={"since":"'+weekAgoFormated.toString()+'","until":"'+todayFormated.toString()+'"}&time_ranges[]={"since":"'+yesterdayFormated.toString()+'","until":"'+todayFormated.toString()+'"}'
                              });
                            });

                            axios.post("https://graph.facebook.com/", {
                              access_token: tokens.fb,
                              batch: fbCalls
                            })
                              .then((resp3)=>{
                                var resp3Arr = resp3.data;
                                resp3Arr.forEach(function(resp3Dat, resp3I, resp3Arr){
                                  fbWeekClicks = fbWeekClicks + parseInt(JSON.parse(resp3Dat.body).data[0].clicks);
                                  fbWeekShows = fbWeekShows + parseInt(JSON.parse(resp3Dat.body).data[0].impressions);
                                  fbWeekSpent = fbWeekSpent + parseInt(JSON.parse(resp3Dat.body).data[0].spend);
                                  fbDayClicks = fbDayClicks + parseInt(JSON.parse(resp3Dat.body).data[1].clicks);
                                  fbDayShows = fbDayShows + parseInt(JSON.parse(resp3Dat.body).data[1].impressions);
                                  fbDaySpent = fbDaySpent + parseInt(JSON.parse(resp3Dat.body).data[1].spend);
                                });

                                console.log('fb done');

                                axios.get('https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDKZT%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=')
                                  .then((resp4)=>{
                                    var oneUSD=parseInt(resp4.data.query.results.rate.Rate);
                                    console.log('KZT-USD: '+oneUSD);
                                    res.send({
                                      yandexWeekShows: yandexWeekShows,
                                      yandexWeekClicks: yandexWeekClicks,
                                      yandexDayShows: yandexDayShows,
                                      yandexDayClicks: yandexDayClicks,
                                      yandexWeekReaches: yandexWeekReaches,
                                      yandexDayReaches: yandexDayReaches,
                                      yandexCampaigns: yandexCompanies.length,
                                      yandexWeekSpent: yandexWeekSpent,
                                      yandexDaySpent: yandexDaySpent,

                                      fbWeekShows: fbWeekShows,
                                      fbWeekClicks: fbWeekClicks,
                                      fbDayShows: fbDayShows,
                                      fbDayClicks: fbDayClicks,
                                      facebookWeekReaches: facebookWeekReaches,
                                      facebookDayReaches: facebookDayReaches,
                                      fbAdsCampaigns: fbAdsCompanies.length,
                                      fbWeekSpent: fbWeekSpent*oneUSD,
                                      fbDaySpent: fbDaySpent*oneUSD,

                                      instaWeekShows: instaWeekShows,
                                      instaWeekClicks: instaWeekClicks,
                                      instaDayShows: instaDayShows,
                                      instaDayClicks: instaDayClicks,
                                      instaWeekReaches: instaWeekReaches,
                                      instaDayReaches: instaDayReaches,
                                      instaCampaigns: instaCompanies.length,
                                      instaWeekSpent: instaWeekSpent*oneUSD,
                                      instaDaySpent: instaDaySpent*oneUSD,

                                      weekRejects: weekRejects
                                    });
                                  })
                              })

                            })
                            .catch(error => {
                              console.log(error);
                            });


                      })
                        .catch(error => {
                          console.log(error);
                        });
                  } else {
                    var instaWeekClicks = 0;
                    var instaWeekShows = 0;
                    var instaDayClicks = 0;
                    var instaDayShows = 0;
                    var instaWeekSpent = 0;
                    var instaDaySpent = 0;

                    var instaCalls = [];
                    instaCompanies.forEach(function(instaComp, instaI, instaCompanies){
                      instaCalls.push({
                        "method": "GET",
                        "relative_url": 'v2.9/'+instaCompanies[instaI]+'/insights?fields=impressions,spend,clicks&time_ranges[]={"since":"'+weekAgoFormated.toString()+'","until":"'+todayFormated.toString()+'"}&time_ranges[]={"since":"'+yesterdayFormated.toString()+'","until":"'+todayFormated.toString()+'"}'
                      });
                    });

                    console.log('direct done');

                    axios.post("https://graph.facebook.com/", {
                      access_token: tokens.fb,
                      batch: instaCalls
                    })
                      .then((resp2)=>{
                        var resp2Arr = resp2.data;
                        resp2Arr.forEach(function(resp2Dat, resp2I, resp2Arr){
                          instaWeekClicks = instaWeekClicks + parseInt(JSON.parse(resp2Dat.body).data[0].clicks);
                          instaWeekShows = instaWeekShows + parseInt(JSON.parse(resp2Dat.body).data[0].impressions);
                          instaWeekSpent = instaWeekSpent + parseInt(JSON.parse(resp2Dat.body).data[0].spend);
                          instaDayClicks = instaDayClicks + parseInt(JSON.parse(resp2Dat.body).data[1].clicks);
                          instaDayShows = instaDayShows + parseInt(JSON.parse(resp2Dat.body).data[1].impressions);
                          instaDaySpent = instaDaySpent + parseInt(JSON.parse(resp2Dat.body).data[1].spend);
                        });

                        console.log('insta done');

                        var fbWeekClicks = 0;
                        var fbWeekShows = 0;
                        var fbDayClicks = 0;
                        var fbDayShows = 0;
                        var fbWeekSpent = 0;
                        var fbDaySpent = 0;

                        var fbCalls = [];
                        fbAdsCompanies.forEach(function(fbComp, fbI, fbAdsCompanies){
                          fbCalls.push({
                            "method": "GET",
                            "relative_url": 'v2.9/'+fbAdsCompanies[fbI]+'/insights?fields=impressions,spend,clicks&time_ranges[]={"since":"'+weekAgoFormated.toString()+'","until":"'+todayFormated.toString()+'"}&time_ranges[]={"since":"'+yesterdayFormated.toString()+'","until":"'+todayFormated.toString()+'"}'
                          });
                        });

                        axios.post("https://graph.facebook.com/", {
                          access_token: tokens.fb,
                          batch: fbCalls
                        })
                          .then((resp3)=>{
                            var resp3Arr = resp3.data;
                            resp3Arr.forEach(function(resp3Dat, resp3I, resp3Arr){
                              fbWeekClicks = fbWeekClicks + parseInt(JSON.parse(resp3Dat.body).data[0].clicks);
                              fbWeekShows = fbWeekShows + parseInt(JSON.parse(resp3Dat.body).data[0].impressions);
                              fbWeekSpent = fbWeekSpent + parseInt(JSON.parse(resp3Dat.body).data[0].spend);
                              fbDayClicks = fbDayClicks + parseInt(JSON.parse(resp3Dat.body).data[1].clicks);
                              fbDayShows = fbDayShows + parseInt(JSON.parse(resp3Dat.body).data[1].impressions);
                              fbDaySpent = fbDaySpent + parseInt(JSON.parse(resp3Dat.body).data[1].spend);
                            });

                            console.log('fb done');

                            axios.get('https://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.xchange+where+pair+=+%22USDKZT%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=')
                              .then((resp4)=>{
                                var oneUSD=parseInt(resp4.data.query.results.rate.Rate);
                                console.log('KZT-USD: '+oneUSD);
                                res.send({
                                  yandexWeekShows: 0,
                                  yandexWeekClicks: 0,
                                  yandexDayShows: 0,
                                  yandexDayClicks: 0,
                                  yandexWeekReaches: 0,
                                  yandexDayReaches: 0,
                                  yandexCampaigns: 0,
                                  yandexWeekSpent: 0,
                                  yandexDaySpent: 0,

                                  fbWeekShows: fbWeekShows,
                                  fbWeekClicks: fbWeekClicks,
                                  fbDayShows: fbDayShows,
                                  fbDayClicks: fbDayClicks,
                                  facebookWeekReaches: facebookWeekReaches,
                                  facebookDayReaches: facebookDayReaches,
                                  fbAdsCampaigns: fbAdsCompanies.length,
                                  fbWeekSpent: fbWeekSpent*oneUSD,
                                  fbDaySpent: fbDaySpent*oneUSD,

                                  instaWeekShows: instaWeekShows,
                                  instaWeekClicks: instaWeekClicks,
                                  instaDayShows: instaDayShows,
                                  instaDayClicks: instaDayClicks,
                                  instaWeekReaches: instaWeekReaches,
                                  instaDayReaches: instaDayReaches,
                                  instaCampaigns: instaCompanies.length,
                                  instaWeekSpent: instaWeekSpent*oneUSD,
                                  instaDaySpent: instaDaySpent*oneUSD,

                                  yandexBudget: yandexBudget,
                                  fbBudget: fbBudget,
                                  instaBudget: instaBudget,
                                  deals: yandexDeals+fbDeals+instaDeals,

                                  weekRejects: weekRejects
                                });
                              })
                          })

                        })
                        .catch(error => {
                          console.log(error);
                        });
                  }



                })
                  .catch(error => {
                    console.log(error);
                  });

            })
              .catch(error => {
                console.log(error);
              });

      });


})


module.exports = router;
