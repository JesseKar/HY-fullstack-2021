const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
    const body = req.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    if(body.username.length < 3) {
        res.json({ error: 'username too short' })
    }
    if(body.password.length < 3) {
        res.json({ error: 'password too short' })
    } 
    if(body.password > 3 && body.username > 3) {
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })
    
        const savedUser = await user.save()
    
        res.json(savedUser)
    }
    
})

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
        .populate('blogs', { title: 1, author: 1, url: 1, likes: 1 })
    res.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter
