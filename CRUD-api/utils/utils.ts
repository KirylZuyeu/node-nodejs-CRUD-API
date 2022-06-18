import fs from 'fs';
import { IncomingMessage } from 'http';
import { User } from "../schems/types";

function writeDataToFile(filename:string, content:Array<User>) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8');
}

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

export {writeDataToFile, getUserData}