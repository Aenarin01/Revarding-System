const express = require('express')
const controller = require('../controllers/user')
const passport = require("passport");
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getOne)
router.patch('/add/:id', passport.authenticate('jwt', {session: false}), controller.addTeam)
router.patch('/del/:id', passport.authenticate('jwt', {session: false}), controller.deleteTeam)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove)
router.post('/', passport.authenticate('jwt', {session: false}), controller.create)
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.update)


module.exports = router
