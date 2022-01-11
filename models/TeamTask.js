const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamTaskSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    time: {
        type: String,
        required: true
    },
    teamId: {
        ref: 'teams',
        type: Schema.Types.ObjectId
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    status: {
        type: String,
        required: true,
        enum: ["start","done", "false"],
        default: "start"
    },
})

module.exports = mongoose.model('teamTasks', teamTaskSchema)
