const http = require('http');

const PORT = process.env.PORT || 5000;

const server = http.createServer((res, req) => {
    res.readableEnded('Sercer is woorking!')
})

server.listen(PORT, () => console.log(`Serverstrrted on PORT ${PORT}`))