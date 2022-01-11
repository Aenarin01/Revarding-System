const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    start: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: 'started',
        enum: ['started','done','failed']
    },
    imageSrc: {
        type: String,
        default: ''
    },
    interval: {
        type: String,
        required: false
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
})

module.exports = mongoose.model('tasks', taskSchema)
