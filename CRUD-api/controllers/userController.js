const User = require('../models/userModel')

const { getUserData } = require('../utils')

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

        const { name, description, price } = JSON.parse(body)

        const user = {
            name,
            description,
            price
        }

        const newUser = await User.create(user)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newUser))  

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

            const { name, description, price } = JSON.parse(body)

            const userData = {
                name: name || user.name,
                description: description || user.description,
                price: price || user.price
            }

            const updUser = await User.update(id, userData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updUser)) 
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
            res.writeHead(200, { 'Content-Type': 'application/json' })
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