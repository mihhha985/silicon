const express = require('express');
const mongoose = require('mongoose');
const path = require("path");
const fs = require('fs');
const Cookie = require('cookies');
const session = require('express-session');
const helpers = require('./component/helpers');
const Mailer = require('./component/mailer');
const params = require('./config/params');
const Models = require('./models/models');
const Comment = require('./models/comment');
const Params = require('./models/params');
const PORT = 80 | process.env.PORT;
const app = express();
const db = "mongodb+srv://mihhha1985:nintendo27@cluster0.axbjz.mongodb.net/silicon-dolls?retryWrites=true&w=majority";

mongoose
    .connect(db)
    .then(() => console.log('Connect to DB'))
    .catch(error => console.error(error))

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(session({
    secret: '1234567d1d2f6',
    resave: false,
    saveUninitialized: false
}))

app.listen(PORT, err => {
    if(err) {
        console.error(err);
        return false;
    }

    console.log('Server running on port: ' + PORT);
});

app.get('/', (req, res) => {
    let url = helpers.trimUrl(req.url);
    url = helpers.trimBeforeSlash(url);
    let menu = params.menu;
    let title = 'Бескаркасные силиконовые секс куклы - Интернет магазин Silicon Dolls';

    res.render(__dirname + '/views/site/index.ejs', {title, menu, url});
})

app.get('/women', (req, res) => {
    let url = helpers.trimUrl(req.url);
    url = helpers.trimBeforeSlash(url);
    let menu = params.menu;
    let title = 'Интернет магазин Silicon Dolls - Женские модели';
    let headline = 'Женские модели';
    Models.find({category:'women', status:'1'})
        .then(model => {
            Comment.find().limit(4)
                .then(comment => {
                    res.render(__dirname + '/views/site/catalog.ejs', {title, headline, menu, url, model, comment});
                })
                .catch(err => {
                    console.log(err);
                    res.end('Connection error')
                })
        })
        .catch(err => {
            console.log(err);
            res.end('Connection error')
        })
})

app.get('/men', (req, res) => {
    let url = helpers.trimUrl(req.url);
    url = helpers.trimBeforeSlash(url);
    let menu = params.menu;
    let title = 'Интернет магазин Silicon Dolls - Мужские модели';
    let headline = 'Мужские модели';

    Models.find({category:'men', status:'1'})
        .then(model => {
            Comment.find().limit(4)
                .then(comment => {
                    res.render(__dirname + '/views/site/catalog.ejs', {title, headline, menu, url, model, comment});
                })
                .catch(err => {
                    console.log(err);
                    res.end('Connection error')
                })
        })
        .catch(err => {
            console.log(err);
            res.end('Connection error')
        })
});

app.get('/delivery', (req, res) => {
    let url = helpers.trimUrl(req.url);
    url = helpers.trimBeforeSlash(url);
    let menu = params.menu;
    let title = 'Интернет магазин Silicon Dolls - Доставка и Оплата';
    let headline = 'Доставка и Оплата';

    res.render(__dirname + '/views/site/delivery.ejs', {title, headline, menu, url});
});

app.get('/voice', (req, res) => {
    let url = helpers.trimUrl(req.url);
    url = helpers.trimBeforeSlash(url);
    let menu = params.menu;
    let title = 'Интернет магазин Silicon Dolls - Отзывы  наших покупателей';
    let headline = 'Отзывы  наших покупателей';

    Comment.find()
        .then(result => {
            res.render(__dirname + '/views/site/voice.ejs', {title, headline, menu, url, result});
        })
        .catch(err => {
            console.log(err);
            res.end('Connection error')
        })
});

app.get('/contact', (req, res) => {
    let url = helpers.trimUrl(req.url);
    url = helpers.trimBeforeSlash(url);
    let menu = params.menu;
    let title = 'Интернет магазин Silicon Dolls - Контакты';

    res.render(__dirname + '/views/site/contact.ejs', {title, menu, url});
});

app.get('/view/:id', (req, res) => {
    let title = 'Силиконовая секс кукла';
    let id = req.params.id;
    let menu = params.menu;
    Models.findById(id)
        .then(model => {
            let dir = path.join(__dirname, 'public/image/models', model.category, model.name, 'th');
            let title = 'Силиконовая секс кукла - ' + model.name;
            let url = '/' + model.category;
            //console.log(dir);
            Params.find({name:model.name})
                .then(params => {
                    let param = params[0];
                    if(param == null) throw(new Error('not params'));
                    fs.readdir(dir, (err, files) => {
                        if (err) {
                            throw(err);
                        } else {
                            res.render(__dirname + '/views/catalog/index.ejs', {title, menu, url, files, model, param});
                        }
                    });
                }).catch(error => {
                    console.log(error);
                    res.status(404).end('404');
                });
        })
        .catch(error => {
            console.log(error);
            res.status(404).end('404');
        });

});

app.post('/order-send', (req, res) => {
    let name = req.body.name;
    let phone = req.body.phone;
    let message = req.body.message;
    let desk = req.body.desk;
    let model = req.body.model;
    let ip = req.ip;

    req.session.orderId = req.body.id;
    req.session.desk = desk;
    req.session.name = name;
    req.session.phone = phone;
    req.session.message = message;

    const mailer = new Mailer(desk, name, phone, message, model, ip);
    mailer.send();

    if(desk === '3'){
        res.redirect('/thank');
    }else {
        res.redirect('/order');
    }
});

app.post('/question-send', (req, res) => {
     //console.log(req.body);
    let name = req.body.name;
    let phone = req.body.phone;
    let timeafter = req.body.timeafter;
    let timebefore = req.body.timebefore;
    const mailer = new Mailer(null, name, phone);
    mailer.questionSend(timeafter, timebefore);
    res.status(200).json({status: 'success'});
});

app.get('/thank', (req, res) => {
    let url = '/';
    let menu = params.menu;
    let title = 'Интернет магазин Silicon Dolls - Спасибо за Ваш заказ!!!';
    res.render(__dirname + '/views/order/thank.ejs', {title, menu, url});
});

app.get('/order', (req, res) => {
    let id = req.session.orderId;

    if(id){
        Models.findById(id)
            .then(model => {
                let menu = params.menu;
                let title = 'Интернет магазин Silicon Dolls - Заказ';
                let url = '/' + model.category;
                let order = {
                    desk: req.session.desk,
                    name: req.session.name,
                    phone: req.session.phone,
                    addr: req.session.message,
                    outSumm: function (){
                      if(this.desk == 1){
                          return model.price;
                      } else if(this.desk == 2){
                              return 2000;
                      } else{
                          return null;
                      }
                    },
                    description: function(){
                        if(this.desk == 1) {
                            return 'Вы выбрали способ оплаты "По предоплате с бесплатной доставкой" при этом способе оплаты, вы оплачиваете всю сумму вашего заказа на сайте, а доставка идёт в ПОДАРОК!!!';
                        }else if(this.desk == 2){
                            return 'Вы выбрали способ оплаты "Наложенным платежом курьером" при этом способе оплаты, вы оплачиваете доставку на сайте, а саму модель курьеру при получении';
                        }else{
                            return null;
                        }
                    }
                }
                res.render(__dirname + '/views/order/index.ejs', {title, menu, url, model, order});
            }).catch(err => console.log(err));
    }else{
        res.redirect('/');
    }
});

app.use((req, res) => {
    let url = '/';
    let menu = params.menu;
    let title = 'Интернет магазин Silicon Dolls - 404';

    res.status(404).render(__dirname + '/views/error/index.ejs', {title, menu, url});
})