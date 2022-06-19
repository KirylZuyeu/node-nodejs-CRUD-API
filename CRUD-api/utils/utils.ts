import { IncomingMessage } from 'http';

function getUserData(req:IncomingMessage):Promise<string> {
    return new Promise((resolve, reject) => {
        try {
            let body = ''

            req.on('data', (chunk) => {
                body += chunk.toString()
            })

            req.on('end', () => {
                resolve(body)
            })
        } catch (error) {
            reject(error)
        }
    })
}

export { getUserData}