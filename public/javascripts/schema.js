const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const toDoSchema = new Schema({
    Title: {
        type: String,
        required: true,

    },
    Description: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

var Lists = mongoose.model('Lists', toDoSchema);

module.exports = Lists;