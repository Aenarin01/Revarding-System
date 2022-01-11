const mongoose = require('mongoose')
const Schema = mongoose.Schema

const teamSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    users: [
        {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    ]
})

module.exports = mongoose.model('teams', teamSchema)
