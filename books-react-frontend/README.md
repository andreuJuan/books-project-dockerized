# Books project frontend

### What is the books project frontend?

This project is an application used to manage a private book collection. It is built with React, TypeScript, Bootstrap and CSS.
It uses the [books project backend](../books-node-backend/) with the endpoints to login, manage users and manage books.

### How it works?

When you run it you will see the login page. To access the books service log in with your credentials if you already have a user. In case you don't, press on the "Register here" button and create a new user.

After logging in, you will see an empty table. To create a new book, press the "Add new book" button and a creation popup will appear. You can fill the fields to create new books.
When you already have books in the table you can press the pencil icon to edit them and the trash icon to delete them.

In case you want to log out you can press the "Logout" button and you will be redirected to the login page.

### Steps to run this project

Read the document in the [root](../) of this repository to find how to run this project altogether with the frontend project using Docker.

### Libraries

Those are the different libraries that have been used in this React project:

[react-bootstrap](https://react-bootstrap.github.io/)
Frontend framework used for styling a curated UI

[react-fontawesome](https://www.npmjs.com/package/@fortawesome/react-fontawesome)
Tool that adds icons for the UI

[react-router-dom](https://reactrouter.com/en/main)
Routing tool used to move between pages

[axios](https://axios-http.com/docs/intro)
Lightweight, promise-based HTTP client to make requests to the backend endpoints

[eslint](https://www.npmjs.com/package/eslint)
Tool for identifying and reporting on patterns in the code

[eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import)
Plugin that allows to include import/export verifications for ESLint

[eslint-import-resolver-typescript](https://www.npmjs.com/package/eslint-import-resolver-typescript)
Plugin that makes eslint-plugin-import compatible with typescript

[prettier](https://prettier.io/docs/en/install.html)
Code formatter that autmatically sets the code style

[eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier)
Coordinates eslint and prettier to apply best practices around the code automatically
