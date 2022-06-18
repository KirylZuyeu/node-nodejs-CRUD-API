import User from '../models/userModel';
import { getUserData } from '../utils/utils';
import { IncomingMessage, ServerResponse } from 'http';

const getUsers = async function(_req:IncomingMessage, res:ServerResponse) {
    try {
        const users = await User.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(users))
    } catch (error) {
        console.log(error)
    }
}

const getUser = async function(_req:IncomingMessage, res:ServerResponse, id:string) {
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

const createUser = async function(req:IncomingMessage, res:ServerResponse) {
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

const updateUser = async function(req:IncomingMessage, res:ServerResponse, id:string) {
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
                    age: age || user.age,
                    hobbies: hobbies || user.hobbies
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

const deleteUser = async function(_req:IncomingMessage, res:ServerResponse, id:string) {
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

export { getUsers, getUser, createUser, updateUser, deleteUser };
