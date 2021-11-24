const express = require('express');
const mongoose = require('mongoose');
const Cookie = require('cookies');
const session = require('express-session');
const siteRouter = require('./rotes/site-routes');
const orderRouter = require('./rotes/order-routes');

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

app.use(siteRouter);
app.use(orderRouter);

app.use((req, res) => {
    let url = '/';
    let menu = params.menu;
    let title = 'Интернет магазин Silicon Dolls - 404';

    res.status(404).render(__dirname + '/views/error/index.ejs', {title, menu, url});
})