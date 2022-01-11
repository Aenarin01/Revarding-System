const errorHandler = require('../utils/errorHandler')
const User = require('../models/User')
const Team = require('../models/Team')

module.exports.getAllByAuthor = async function (req, res) {
    try {
        const team = await Team.find({author: req.user.id})
        res.status(200).json(team)
    } catch (e) {
        errorHandler(res, e)
    }
}


module.exports.addUser = async function (req, res) {
    try {
        await Team.findOneAndUpdate(req.params.id, {
            "$push": {"users": req.user.id}
        }, {new: true, safe: true, upsert: true}).then((result) => {
            return res.status(201).json({
                status: "Success",
                message: "User add",
                data: result
            });
        }).catch((error) => {
            return res.status(500).json({
                status: "Failed",
                message: "Database Error",
                data: error
            });
        });
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getAll = async function (req, res) {
    try {
        const team = await Team.find({})
        res.status(200).json(team)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function (req, res) {
    try {
        const team = await Team.findById(req.params.id)
        res.status(200).json(team)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    const teams = await Team.findOne({title: req.body.title})
    if (teams) {
        res.status(409).json({
            message: 'Такой team уже занят. Попробуйте другой.'
        })
    } else {
        try {
            const team = await new Team({
                title: req.body.title,
                author: req.user.id,
                users: req.user.id
            }).save()
            res.status(201).json(team)
        } catch (e) {
            errorHandler(res, e)
        }
    }
}

module.exports.remove = async function (req, res) {
    try {
        await Team.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Team был удален.'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function (req, res) {

    const updated = {
        title: req.body.title
    }

    try {
        const team = await Team.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(team)
    } catch (e) {
        errorHandler(res, e)
    }
}
