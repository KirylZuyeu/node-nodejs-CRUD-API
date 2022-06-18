"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserData = void 0;
function getUserData(req) {
    return new Promise((resolve, reject) => {
        try {
            let body = '';
            req.on('data', (chunk) => {
                body += chunk.toString();
            });
            req.on('end', () => {
                resolve(body);
            });
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.getUserData = getUserData;
