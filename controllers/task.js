const bcrypt = require('bcrypt')
const errorHandler = require('../utils/errorHandler')
const User = require('../models/User')
const Task = require('../models/Task')

module.exports.getAllByUser = async function(req, res) {
    try {
        const task = await Task.find({user: req.user.id})
        res.status(200).json(task)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getAll = async function(req, res) {
    try {
        const task = await Task.find({})
        res.status(200).json(task)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.getById = async function(req, res) {
    try {
        const task = await Task.findById(req.params.id)
        res.status(200).json(task)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.create = async function (req, res) {
    try {
        const task = await new Task({
            title: req.body.title,
            description: req.body.description,
            imageSrc: req.file ? req.file.path : '',
            interval: req.body.interval,
            user: req.user.id
        }).save()
        res.status(201).json(task)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function(req, res) {
    try {
        await Task.remove({_id: req.params.id})
        res.status(200).json({
            message: 'Task был удален.'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.update = async function(req, res) {

    const updated = {
        title: req.body.title,
        description: req.body.description,
        imageSrc: req.file ? req.file.path : '',
        interval: req.body.interval,
        status: req.body.status
    }

    try {
        const task = await Task.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(task)
    } catch (e) {
        errorHandler(res, e)
    }
}
