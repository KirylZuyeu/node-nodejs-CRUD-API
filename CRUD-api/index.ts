import http from 'http'
import { getUsers, getUser, createUser, updateUser, deleteUser } from './controllers/userController'
import { validate } from 'uuid'
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    let urlReq = req.url!;
    if (urlReq === '/') {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Internal server error 500' }))
    } else if (urlReq === '/api/users' && req.method === 'GET') {
        getUsers(req, res)
    } else if(urlReq.match(/\/api\/users\/\w+/) && req.method === 'GET') {
        const id = urlReq.split('/')[3];
        if (validate(id)) {
            getUser(req, res, id)
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Bad Request - InvalidInput' }))
        }
    } else if(req.url === '/api/users' && req.method === 'POST') {
        createUser(req, res)
    } else if(urlReq.match(/\/api\/users\/\w+/) && req.method === 'PUT') {
        const id = urlReq.split('/')[3];
        if (validate(id)) {
            updateUser(req, res, id)
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Bad Request - InvalidInput' }))
        }
    } else if(urlReq.match(/\/api\/users\/\w+/) && req.method === 'DELETE') {
        const id = urlReq.split('/')[3];
        if (validate(id)) {
            deleteUser(req, res, id)
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Bad Request - InvalidInput' }))
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Resource Not Found' }))
    }
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))


