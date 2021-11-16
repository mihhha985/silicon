const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paramsSchema = new Schema({
    name: {
        type:'String',
        require:true
    },
    height: {
        type: 'String',
        required:true
    },
    weight: {
        type: 'String',
        required:true
    },
    bra_size: {
        type: 'String',
        required:true
    },
    bust: {
        type: 'String',
        required:true
    },
    waist: {
        type: 'String',
        required:true
    },
    hips: {
        type: 'String',
        required:true
    },
    food_size: {
        type: 'String',
        required:true
    },
    vagina: {
        type: 'String',
        required:true
    },
    anus: {
        type: 'String',
        required:true
    },
    mouse: {
        type: 'String',
        required:true
    },
    penis: {
        type: 'String',
        required:true
    }
});

const Params = mongoose.model('params', paramsSchema);

module.exports = Params;