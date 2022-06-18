import fs from 'fs';
import { v4 as uuidv4 } from 'uuid'
import { writeDataToFile } from '../utils/utils';
let users = JSON.parse(fs.readFileSync('./data/users.json').toString());
import { User, UserInfo } from "../schems/types";

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(users)
    })
}

function findById(id:string):Promise<User> {
    return new Promise((resolve, reject) => {
        const user = users.find((p:User) => p.id === id)
        resolve(user)
    })
}

function create(user:UserInfo) {
    return new Promise((resolve, reject) => {
        const newUser = {id: uuidv4(), ...user}
        users.push(newUser)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/users.json', users);
        }
        resolve(newUser)
    })
}

function update(id:string, user:UserInfo) {
    return new Promise((resolve, reject) => {
        const index = users.findIndex((p:User) => p.id === id)
        users[index] = {id, ...user}
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/users.json', users);
        }
        resolve(users[index])
    })
}

function remove(id:string):Promise<void> {
    return new Promise((resolve, reject) => {
        users = users.filter((p:User) => p.id !== id)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/users.json', users);
        }
        resolve()
    })
}

export default { findAll, findById, create, update, remove };