const path = require('path');
const fs = require('fs');
const params = require('../config/params');
const Models = require('../models/models');
const Comment = require('../models/comment');
const Params = require('../models/params');
const helpers = require('../component/helpers');

const  hendleError = (res, err) => {
    console.log(err);
    res.end('Connection error')
}

const getSite = (req, res) => {
    let url = helpers.trimUrl(req.url);
    url = helpers.trimBeforeSlash(url);
    let menu = params.menu;
    let title = 'Бескаркасные силиконовые секс куклы - Интернет магазин Silicon Dolls';

    res.render(helpers.createPath('site', 'index'), {title, menu, url});
}

const getWomen = (req, res) => {
    let url = helpers.trimUrl(req.url);
    url = helpers.trimBeforeSlash(url);
    let menu = params.menu;
    let title = 'Интернет магазин Silicon Dolls - Женские модели';
    let headline = 'Женские модели';
    Models.find({category:'women', status:'1'})
        .then(model => {
            Comment.find().limit(4)
                .then(comment => {
                    res.render(helpers.createPath('site', 'catalog'), {title, headline, menu, url, model, comment});
                })
                .catch(err => hendleError(res, err))
        })
        .catch(err => {
            console.log(err);
            res.end('Connection error')
        })
}

const getMen = (req, res) => {
    let url = helpers.trimUrl(req.url);
    url = helpers.trimBeforeSlash(url);
    let menu = params.menu;
    let title = 'Интернет магазин Silicon Dolls - Мужские модели';
    let headline = 'Мужские модели';

    Models.find({category:'men', status:'1'})
        .then(model => {
            Comment.find().limit(4)
                .then(comment => {
                    res.render(helpers.createPath('site', 'catalog'), {title, headline, menu, url, model, comment});
                })
                .catch(err => hendleError(res, err))
        })
        .catch(err => hendleError(res, err))
}

const getDelivery = (req, res) => {
    let url = helpers.trimUrl(req.url);
    url = helpers.trimBeforeSlash(url);
    let menu = params.menu;
    let title = 'Интернет магазин Silicon Dolls - Доставка и Оплата';
    let headline = 'Доставка и Оплата';

    res.render(helpers.createPath('site', 'delivery'), {title, headline, menu, url});
}

const getVoice = (req, res) => {
    let url = helpers.trimUrl(req.url);
    url = helpers.trimBeforeSlash(url);
    let menu = params.menu;
    let title = 'Интернет магазин Silicon Dolls - Отзывы  наших покупателей';
    let headline = 'Отзывы  наших покупателей';

    Comment.find()
        .then(result => {
            res.render(helpers.createPath('site', 'voice'), {title, headline, menu, url, result});
        })
        .catch(err => hendleError(res, err))
}

const getContact = (req, res) => {
    let url = helpers.trimUrl(req.url);
    url = helpers.trimBeforeSlash(url);
    let menu = params.menu;
    let title = 'Интернет магазин Silicon Dolls - Контакты';

    res.render(helpers.createPath('site', 'contact'), {title, menu, url});
}

const getViews = (req, res) => {
    //let title = 'Силиконовая секс кукла';
    let id = req.params.id;
    let menu = params.menu;
    Models.findById(id)
        .then(model => {
            let dir = path.join(__dirname, '../public/image/models', model.category, model.name, 'th');
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
                            res.render(helpers.createPath('catalog', 'index'), {title, menu, url, files, model, param});
                        }
                    });
                }).catch(err => hendleError(res, err));
        })
        .catch(err => hendleError(res, err));
}

module.exports = {
    getSite,
    getWomen,
    getMen,
    getDelivery,
    getVoice,
    getContact,
    getViews
}