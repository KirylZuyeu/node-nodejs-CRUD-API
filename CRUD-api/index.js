const http = require('http')
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('./controllers/userController')
const { validate } = require('uuid')

const dotenv = require('dotenv');
dotenv.config();

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ message: 'Internal server error 500' }))
    } else if (req.url === '/api/users' && req.method === 'GET') {
        getUsers(req, res)
    } else if(req.url.match(/\/api\/users\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[3];
        if (validate(id)) {
            getUser(req, res, id)
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Bad Request - InvalidInput' }))
        }
    } else if(req.url === '/api/users' && req.method === 'POST') {
        createUser(req, res)
    } else if(req.url.match(/\/api\/users\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];
        if (validate(id)) {
            updateUser(req, res, id)
        } else {
            res.writeHead(400, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ message: 'Bad Request - InvalidInput' }))
        }
    } else if(req.url.match(/\/api\/users\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];
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

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

module.exports = server;

