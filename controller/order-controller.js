const Mailer = require("../component/mailer");
const params = require("../config/params");
const Models = require("../models/models");
const helpers = require('../component/helpers');

const orderSend = (req, res) => {
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
		res.redirect('/thank');
		/*
    if(desk === '3'){
        res.redirect('/thank');
    }else {
        res.redirect('/order');
    }
		*/
}

const questionSend = (req, res) => {
    let name = req.body.name;
    let phone = req.body.phone;
    let timeafter = req.body.timeafter;
    let timebefore = req.body.timebefore;
    const mailer = new Mailer(null, name, phone);
    mailer.questionSend(timeafter, timebefore);
    res.status(200).json({status: 'success'});
}

const orderIndex = (req, res) => {
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
                res.render(helpers.createPath('order', 'index'),  {title, menu, url, model, order});
            }).catch(err => console.log(err));
    }else{
        res.redirect('/');
    }
}

const orderThank = (req, res) => {
    let url = '/';
    let menu = params.menu;
    let title = 'Интернет магазин Silicon Dolls - Спасибо за Ваш заказ!!!';
    res.render( helpers.createPath('order', 'thank'),{title, menu, url});
}

module.exports = {
    orderSend,
    questionSend,
    orderIndex,
    orderThank
}