"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
let users = [];
function findAll() {
    return new Promise((resolve, reject) => {
        resolve(users);
    });
}
function findById(id) {
    return new Promise((resolve, reject) => {
        const user = users.find((p) => p.id === id);
        resolve(user);
    });
}
function create(user) {
    return new Promise((resolve, reject) => {
        const newUser = Object.assign({ id: (0, uuid_1.v4)() }, user);
        users.push(newUser);
        resolve(newUser);
    });
}
function update(id, user) {
    return new Promise((resolve, reject) => {
        const index = users.findIndex((p) => p.id === id);
        users[index] = Object.assign({ id }, user);
        resolve(users[index]);
    });
}
function remove(id) {
    return new Promise((resolve, reject) => {
        users = users.filter((p) => p.id !== id);
        resolve();
    });
}
exports.default = { findAll, findById, create, update, remove };
