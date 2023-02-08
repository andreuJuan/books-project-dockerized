# Books project

### What is the books project?

This project is an application used to manage a private book collection. It is separated in two separated subprojects: a frontend and a backend.
They are contained using [Docker](https://docs.docker.com/) and connected via [NGINX](https://www.nginx.com/) to simplify installing and launching the project.

Check the [frontend docs](books-react-frontend/README.md) for details on the React application and its user interface.
Check the [backend docs](books-node-backend/README.md) for details on the Nodejs web service.

### Steps to run this project

1. To run this project, first of all you need to have Docker installed. It is recommended to install the Docker desktop app.

2. Open a terminal and navigate to the root of this project. There, run `docker-compose up --build` until it has completed setting up. **NOTE:** If you want it to not depend on the terminal to be open, add the `-d` flag. Bear in mind that in this case you will have to close the containers from the terminal or the desktop app.

3. Open a browser and type the URL `http://localhost`. The login page will appear and we are ready to go! For more details on how to navigate the frontend check the [frontend docs](books-react-frontend/README.md).
