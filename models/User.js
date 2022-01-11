const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        default: 123456
    },
    role: {
        type: String,
        required: true,
        enum: ["user","premium", "admin"]
    },
    achieves: [
        {
            type: Schema.Types.ObjectId,
            ref: 'achieves'
        }
    ], teams: [
        {
            type: Schema.Types.ObjectId,
            ref: 'teams'
        }
    ],
    points : {
        type: String,
        required: true,
        default: '0'
    }
})

module.exports = mongoose.model('users', userSchema)
