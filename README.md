# node-nodejs-CRUD-API
## INITIAL
- clone repo
- checkout on develop branch
- cd in CRUID-api folder in terminal
- npm install

## POSTMAN
- `http://localhost:5000/api/users` - working url

## NPM Scripts
- `npm run start:dev` - Run server in development mode;
- `npm run start:prod` - Build server app and run in production mode;
- `npm run start:multi` - Run multiple instances of server app;
- `npm run test` - Run test cases for server app;

## ENDPOINTS
- **GET** `api/users` is used to get all persons;
- **GET** `api/users/${userId}`;
- **POST** `api/users` is used to create record about new user and store it in database;
- **PUT** `api/users/{userId}` is used to update existing user;
- **DELETE** `api/users/${userId}` is used to delete existing user from database;
