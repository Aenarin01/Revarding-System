const bcrypt = require('bcrypt')
const errorHandler = require('../utils/errorHandler')
const User = require('../models/User')
const Task = require('../models/Task')
const Team = require("../models/Team");


module.exports.create = async function (req, res) {
    const candidate = await User.findOne({email: req.body.email})
    if (candidate) {
        res.status(409).json({
            message: 'Такой email уже занят. Попробуйте другой.'
        })
    }else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(password,salt),
            role: req.body.role || 'user'
        })
        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            errorHandler(res, e)
        }
    }
}

module.exports.getAll = async (req, res) => {
    try {
        await User.find({})
            .then(data => {
                res.send(data)
            })
        res.status(200)
    } catch (e) {
        errorHandler(res, e)
    }
};

module.exports.getOne = async function (req, res) {
    try {
        await User.findById(req.params.id,)
            .then(data => {
                res.send(data)
            })
        res.status(200)
    } catch (e) {
        errorHandler(res, e)
    }
};



module.exports.update = async function (req, res) {
    const updated = {
        name: req.body.name,
        role: req.body.role
    }
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updated},
            {new: true}
        )
        res.status(200).json(user)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.remove = async function (req, res) {
    try {
        await User.remove({_id: req.params.id})
        await Task.remove({userID: req.params.id})
        res.status(200).json({
            message: 'Пользователь удалена.'
        })
    } catch (e) {
        errorHandler(res, e)
    }
}


module.exports.addTeam = async function (req, res) {
    try {
        await User.findOneAndUpdate(req.user.id, {
            "$push": {"teams": req.params.id}
        }, {new: true, safe: true, upsert: true}).then((result) => {
            return res.status(201).json({
                data: result
            });
        }).catch((error) => {
            return res.status(500).json({
                data: error
            });
        });
    } catch (e) {
        errorHandler(res, e)
    }
}


module.exports.deleteTeam = async function (req, res) {
    try {
        await User.findOneAndUpdate(req.user.id, {
            "$pull": {"teams": req.params.id}
        }, {new: true, safe: true, upsert: true}).then((result) => {
            return res.status(201).json({
                data: result
            });
        }).catch((error) => {
            return res.status(500).json({
                data: error
            });
        });
    } catch (e) {
        errorHandler(res, e)
    }
}
