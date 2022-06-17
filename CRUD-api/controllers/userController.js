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
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(user))
        }
    } catch (error) {
        console.log(error)
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
            res.end(JSON.stringify({ message: 'Incorrect value for mandatory username field of new User' }))
        } else if (!user.age) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Incorrect value for mandatory age field of new User' }))
        } else if (!user.hobbies) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Incorrect value for mandatory hobbies field of new User' }))
        } else {
            const newUser = await User.create(user)
            res.writeHead(201, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(newUser))  
        }
    } catch (error) {
        console.log(error)
    }
}

async function updateUser(req, res, id) {
    try {
        const user = await User.findById(id)

        if(!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            const body = await getUserData(req)

            const { username, age, hobbies } = JSON.parse(body)

            if (!username) {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: 'Incorrect value for mandatory username field of new User' }))
            } else if (!age) {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: 'Incorrect value for mandatory age field of new User' }))
            } else if (!hobbies) {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: 'Incorrect value for mandatory hobbies field of new User' }))
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
        console.log(error)
    }
}

async function deleteUser(req, res, id) {
    try {
        const user = await User.findById(id)

        if(!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Product Not Found' }))
        } else {
            await User.remove(id)
            res.writeHead(204, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: `Product ${id} removed` }))
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}