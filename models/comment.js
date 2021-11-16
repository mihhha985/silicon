const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    name: {
        type: 'String',
        required: true
    },
    age: {
        type: 'String',
        required: true
    },
    text: {
        type: 'String',
        required: true
    }
});

const Comment = mongoose.model('Comments', commentSchema);

module.exports = Comment;