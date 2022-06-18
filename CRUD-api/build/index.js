"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const userController_1 = require("./controllers/userController");
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
const server = http_1.default.createServer((req, res) => {
    let urlReq = req.url;
    console.log(urlReq);
    if (urlReq === '/') {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Internal server error 500' }));
    }
    else if (urlReq === '/api/users' && req.method === 'GET') {
        (0, userController_1.getUsers)(req, res);
    }
    else if (urlReq.match(/\/api\/users\/\w+/) && req.method === 'GET') {
        const id = urlReq.split('/')[3];
        if ((0, uuid_1.validate)(id)) {
            (0, userController_1.getUser)(req, res, id);
        }
        else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Bad Request - InvalidInput' }));
        }
    }
    else if (req.url === '/api/users' && req.method === 'POST') {
        (0, userController_1.createUser)(req, res);
    }
    else if (urlReq.match(/\/api\/users\/\w+/) && req.method === 'PUT') {
        const id = urlReq.split('/')[3];
        if ((0, uuid_1.validate)(id)) {
            (0, userController_1.updateUser)(req, res, id);
        }
        else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Bad Request - InvalidInput' }));
        }
    }
    else if (urlReq.match(/\/api\/users\/\w+/) && req.method === 'DELETE') {
        const id = urlReq.split('/')[3];
        if ((0, uuid_1.validate)(id)) {
            (0, userController_1.deleteUser)(req, res, id);
        }
        else {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Bad Request - InvalidInput' }));
        }
    }
    else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Resource Not Found' }));
    }
});
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
