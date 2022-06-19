import { v4 as uuidv4 } from 'uuid'
import { User, UserInfo } from "../schems/types";

let users: User[] = []; 

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(users)
    })
}

function findById(id:string):Promise<User|undefined> {
    return new Promise((resolve, reject) => {
        const user = users.find((p:User) => p.id === id)
        resolve(user)
    })
}

function create(user:UserInfo) {
    return new Promise((resolve, reject) => {
        const newUser = {id: uuidv4(), ...user}
        users.push(newUser)
        resolve(newUser)
    })
}

function update(id:string, user:UserInfo) {
    return new Promise((resolve, reject) => {
        const index = users.findIndex((p:User) => p.id === id)
        users[index] = {id, ...user}
        resolve(users[index])
    })
}

function remove(id:string):Promise<void> {
    return new Promise((resolve, reject) => {
        users = users.filter((p:User) => p.id !== id)
        resolve()
    })
}

export default { findAll, findById, create, update, remove };