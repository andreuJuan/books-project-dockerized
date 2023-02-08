# Books project backend

### What is the books project backend?

This project is a web service using [Express](https://expressjs.com/) in Node.js matching a RESTful API.
It provides the [books project frontend](../books-react-frontend/) with the endpoints to login, manage users and manage books.

### API endpoints

#### Authentication

`api/v1/login POST`: Used to authenticate a user. It expects to receive a `username` and `password`.
If they match with the DataBase data, it returns a JWT token valid for 1 hour.

#### Users

`api/v1/user POST`: Used to create a new user. It expects to receive a `username` and `password` that will be added in the DataBase. After that, don't forget to call the authentication endpoint.

#### Books

`api/v1/book GET`: Used to retrieve all the books in the Database. It expects to contain a valid JWToken in the header as authentication.

`api/v1/book POST`: Used to create a new book. It expects to receive a `title`, `author` and optionally a `summary`. It also expects to contain a valid JWToken in the header as authentication.

`api/v1/book PATCH`: Used to update an existing book. It expects to receive an `id` to identify the book to be updated, a `title`, `author` and optionally a `summary`. It also expects to contain a valid JWToken in the header as authentication.

`api/v1/book DELETE`: Used to delete an existing book. It expects to receive an `id` to identify the book to be deleted. It also expects to contain a valid JWToken in the header as authentication.

### Steps to run this project

Read the document in the [root](../) of this repository to find how to run this project altogether with the frontend project using Docker.

### Installed libraries

Those are the different libraries that have been used in this backend project:

[express](https://expressjs.com/)
Minimal and flexible Node.js web application framework that provides a robust and varied set of features to develop applications

[helmet](https://www.npmjs.com/package/helmet)
Express middleware that helps us to improve the security in the application by setting various HTTP headers

[cors](https://expressjs.com/en/resources/middleware/cors.html)
Express middleware that enables cross-origin Requests

[body-parser](https://www.npmjs.com/package/body-parser)
Parses the client’s request from json into javascript objects

[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
Handles the JWT authorization operations

[bcryptjs](https://www.npmjs.com/package/bcryptjs)
Hashes and verifies user passwords

[typeorm](https://typeorm.io/)
The ORM we used to manipulate the database

[reflect-metadata](https://www.npmjs.com/package/reflect-metadata)
Allows some annotations features used with TypeORM

[class-validator](https://www.npmjs.com/package/reflect-metadata)
Validation package used thogether with TypeORM

[mysql](https://www.npmjs.com/package/mysql)
Database configuration for MySql and MariaDB databases

[ts-node-dev](https://www.npmjs.com/package/ts-node-dev)
Automatically restarts the server when we change any file

[eslint](https://www.npmjs.com/package/eslint)
Tool for identifying and reporting on patterns in the code

[prettier](https://prettier.io/docs/en/install.html)
Code formatter that autmatically sets the code style

[eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)
Coordinates eslint and prettier to apply best practices around the code automatically
