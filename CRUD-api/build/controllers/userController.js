"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const utils_1 = require("../utils/utils");
const getUsers = function (_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield userModel_1.default.findAll();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(users));
        }
        catch (error) {
            console.log(error);
        }
    });
};
exports.getUsers = getUsers;
const getUser = function (_req, res, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findById(id);
            if (!user) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User Not Found' }));
            }
            else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(user));
            }
        }
        catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Internal server error 500' }));
        }
    });
};
exports.getUser = getUser;
const createUser = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = yield (0, utils_1.getUserData)(req);
            const { username, age, hobbies } = JSON.parse(body);
            const user = {
                username,
                age,
                hobbies
            };
            if (!username || typeof username !== "string") {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Incorrect type of mandatory value username field - it must be a string' }));
            }
            else if (!age || typeof age !== "number") {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Incorrect type of mandatory value age field - it must be a number' }));
            }
            else if (!hobbies || !Array.isArray(hobbies) || !hobbies.every((i) => (typeof i === "string"))) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Incorrect type of mandatory value hobbies field - it must be array of strings' }));
            }
            else {
                const newUser = yield userModel_1.default.create(user);
                res.writeHead(201, { 'Content-Type': 'application/json' });
                return res.end(JSON.stringify(newUser));
            }
        }
        catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Internal server error 500' }));
        }
    });
};
exports.createUser = createUser;
const updateUser = function (req, res, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findById(id);
            if (!user) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User Not Found' }));
            }
            else {
                const body = yield (0, utils_1.getUserData)(req);
                const { username, age, hobbies } = JSON.parse(body);
                if (!username || typeof username !== "string") {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Incorrect type of mandatory value username field - it must be a string' }));
                }
                else if (!age || typeof age !== "number") {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Incorrect type of mandatory value age field - it must be a number' }));
                }
                else if (!hobbies || !Array.isArray(hobbies) || !hobbies.every((i) => (typeof i === "string"))) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ message: 'Incorrect type of mandatory value hobbies field - it must be array of strings' }));
                }
                else {
                    const userData = {
                        username: username || user.username,
                        age: age || user.age,
                        hobbies: hobbies || user.hobbies
                    };
                    const updUser = yield userModel_1.default.update(id, userData);
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    return res.end(JSON.stringify(updUser));
                }
            }
        }
        catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Internal server error 500' }));
        }
    });
};
exports.updateUser = updateUser;
const deleteUser = function (_req, res, id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield userModel_1.default.findById(id);
            if (!user) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'User Not Found' }));
            }
            else {
                yield userModel_1.default.remove(id);
                res.writeHead(204, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: `User ${id} removed` }));
            }
        }
        catch (error) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Internal server error 500' }));
        }
    });
};
exports.deleteUser = deleteUser;
