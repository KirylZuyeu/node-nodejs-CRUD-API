const User = require('../models/userModel')

const { getUserData } = require('../utils/utils')

async function getUsers(req, res) {
    try {
        const users = await User.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(users))
    } catch (error) {
        console.log(error)
    }
}

async function getUser(req, res, id) {
    try {
        const user = await User.findById(id)
        if(!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'User Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(user))
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Internal server error 500' }))
    }
}

async function createUser(req, res) {
    try {
        const body = await getUserData(req)

        const { username, age, hobbies } = JSON.parse(body)

        const user = {
            username,
            age,
            hobbies
        }

        if (!user.username) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Incorrect value of mandatory username field for new User' }))
        } else if (!user.age) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Incorrect value of mandatory age field of for User' }))
        } else if (!user.hobbies) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Incorrect value of mandatory hobbies field for new User' }))
        } else {
            const newUser = await User.create(user)
            res.writeHead(201, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(newUser))  
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Internal server error 500' }))
    }
}

async function updateUser(req, res, id) {
    try {
        const user = await User.findById(id)

        if(!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'User Not Found' }))
        } else {
            const body = await getUserData(req)

            const { username, age, hobbies } = JSON.parse(body)

            if (!username) {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: 'Incorrect value of mandatory username field for new User' }))
            } else if (!age) {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: 'Incorrect value of mandatory age field for new User' }))
            } else if (!hobbies) {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: 'Incorrect value of mandatory hobbies field for new User' }))
            } else {

                const userData = {
                    username: username || user.username,
                    age: age || user.description,
                    hobbies: hobbies || user.price
                }
    
                const updUser = await User.update(id, userData)
    
                res.writeHead(200, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify(updUser)) 
            }

        }
 

    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Internal server error 500' }))
    }
}

async function deleteUser(req, res, id) {
    try {
        const user = await User.findById(id)

        if(!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'User Not Found' }))
        } else {
            await User.remove(id)
            res.writeHead(204, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `User ${id} removed` }))
        }
    } catch (error) {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Internal server error 500' }))
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}