const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelsSchema = new Schema({
    name: {
        type: 'String',
        required: true
    },
    price: {
        type: 'String',
        required: true
    },
    desc: {
        type: 'String',
        required: true
    },
    category: {
        type: 'String',
        required: true
    },
    status: {
        type: 'String',
        required: true
    }
});

const Models = mongoose.model('Models', modelsSchema);

module.exports = Models;