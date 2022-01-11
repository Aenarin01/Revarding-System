const express = require('express')
const passport = require('passport')
const controller = require('../controllers/teamTasks')
const router = express.Router()

router.get('/:team', passport.authenticate('jwt', {session: false}), controller.getByTeamId)
router.post('/', passport.authenticate('jwt', {session: false}), controller.create)
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.update)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove)


module.exports = router

