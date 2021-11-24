const express = require('express');
const router = express.Router();
const {
    getSite,
    getWomen,
    getMen,
    getDelivery,
    getVoice,
    getContact,
    getViews
} = require('../controller/site-controller');

router.get('/', getSite)
router.get('/women', getWomen);
router.get('/men', getMen);
router.get('/delivery', getDelivery);
router.get('/voice', getVoice);
router.get('/contact', getContact);
router.get('/view/:id', getViews);

module.exports = router;
