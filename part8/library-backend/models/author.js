const mongoose = require('mongoose');
// var uniqueValidator = require('mongoose-unique-validator');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 4,
    },
    born: {
        type: Number,
    },
});

module.exports = mongoose.model('Author', schema);
