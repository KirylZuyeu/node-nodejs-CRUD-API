let users = require('../data/users')

const { writeDataToFile } = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(users)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const user = users.find((p) => p.id === id)
        resolve(user)
    })
}

function create(user) {
    return new Promise((resolve, reject) => {
        const lastUser = users[users.length - 1];
        let userId;
        if (lastUser) {
            userId = lastUser.id + 1;
        } else {
            userId = 1;
        }
        const newUser = {id: userId, ...user}
        users.push(newUser)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/users.json', users);
        }
        resolve(newUser)
    })
}

function update(id, user) {
    return new Promise((resolve, reject) => {
        const index = users.findIndex((p) => p.id === id)
        users[index] = {id, ...user}
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/users.json', users);
        }
        resolve(users[index])
    })
}

function remove(id) {
    return new Promise((resolve, reject) => {
        users = users.filter((p) => p.id !== id)
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/users.json', users);
        }
        resolve()
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update,
    remove
}