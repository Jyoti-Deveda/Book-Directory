const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    publisher: {
        type: String,
    },
    ISBN: {
        type: String,
        unique: true,
        validate:{
            validator: function(v) {
              return /^[0-9]{10}|[0-9]{13}$/.test(v);
            }},
        required: true
    }
})

module.exports = mongoose.model('Book', bookSchema);