import User from '../models/userModel';
import { getUserData } from '../utils/utils';
import { IncomingMessage, ServerResponse } from 'http';
import { User as UserIntarface, UserInfo } from "../schems/types";

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

        if (!username || typeof username !== "string") {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Incorrect type of mandatory value username field - it must be a string' }))
        } else if (!age || typeof age !== "number") {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Incorrect type of mandatory value age field - it must be a number' }))
        } else if (!hobbies || !Array.isArray(hobbies) || !hobbies.every((i:string) => (typeof i === "string"))) {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Incorrect type of mandatory value hobbies field - it must be array of strings'}))
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

            if (!username || typeof username !== "string") {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: 'Incorrect type of mandatory value username field - it must be a string' }))
            } else if (!age || typeof age !== "number") {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: 'Incorrect type of mandatory value age field - it must be a number' }))
            } else if (!hobbies || !Array.isArray(hobbies) || !hobbies.every((i:string) => (typeof i === "string"))) {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ message: 'Incorrect type of mandatory value hobbies field - it must be array of strings'}))
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
