const express = require('express');
const router = express.Router();
const {
    orderSend,
    questionSend,
    orderIndex,
    orderThank
} = require('../controller/order-controller');

router.post('/order-send', orderSend);
router.post('/question-send', questionSend);
router.get('/order', orderIndex);
router.get('/thank', orderThank);

module.exports = router;