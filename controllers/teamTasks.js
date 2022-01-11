const TeamTask = require('../models/TeamTask')
const errorHandler = require('../utils/errorHandler')
const User = require("../models/User");

module.exports.getByTeamId = async function (req, res) {
    try {
        const teamTask = await TeamTask.find({
            teamId: req.params.teamId,
            author: req.user.id
        })
        res.status(200).json(teamTask)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})
    if (candidate) {
        res.status(409).json({
            message: 'Такой email уже занят. Попробуйте другой.'
        })
    } else {
        try {
            const teamTask = await new TeamTask({
                title: req.body.title,
                description: req.body.description,
                time: req.body.time,
                teamId: req.body.teamId,
                author: req.user.id
            }).save()
            res.status(201).json(teamTask)
        } catch (e) {
            errorHandler(res, e)
        }
    }
}

module.exports.remove = async function (req, res) {
    try {
        await TeamTask.remove({_id: req.params.id})
        res.status(200).json({
            message: 'TeamTask был удален.'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {
    try {
        const teamTask = await TeamTask.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(teamTask)
    } catch (e) {
        errorHandler(res, e)
    }
}
