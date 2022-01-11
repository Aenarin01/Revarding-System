const express = require('express')
const controller = require('../controllers/team')
const router = express.Router()
const passport = require('passport')

router.get('/all', passport.authenticate('jwt', {session: false}), controller.getAll)
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAllByAuthor)
router.patch('/add/:id', passport.authenticate('jwt', {session: false}), controller.addUser)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove)
router.post('/', passport.authenticate('jwt', {session: false}), controller.create)
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.update)

module.exports = router

