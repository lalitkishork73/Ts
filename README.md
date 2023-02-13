# Ts User and Book Management System
===============================

This application is a user and book management system, built using Typescript and a RESTful CRUD API. The system uses MongoDB as its database.

Features
--------

-   Create, read, update and delete users
-   Create, read, update and delete books

Requirements
------------

-   Node.js and npm
-   MongoDB

Getting Started
---------------

1.  Clone the repository to your local machine

shellCopy code

`$ git clone https://github.com/lalitkishork73/Ts-based-Rest-Api-using-Mongodb.git`

1.  Install the dependencies

shellCopy code

`$ cd Ts-based-Rest-Api-using-Mongodb
$ npm install`

1.  Start r Run the application

rubyCopy code

`$ nodemon`

1.  Build the application as Javascript file

rubyCopy code

`$ npm run build`

API Endpoints
-------------

The following are the API endpoints for the User and Book management system:

### Users Endpoints

-   `GET /authors/get`: Retrieve all users
-   `GET /authors/get/:authorId`: Retrieve a single user by ID
-   `POST /authors/create`: Create a new user
-   `PUT /authors/update/:authorId`: Update a user by ID
-   `DELETE /authors/delete/:authorId`: Delete a user by ID

### Books Endpoints

-   `GET /books/get`: Retrieve all books
-   `GET /books/get/:bookId`: Retrieve a single book by ID
-   `POST /books/create`: Create a new book
-   `PUT /books/update/:bookId`: Update a book by ID
-   `DELETE /books/delete/:bookId`: Delete a book by ID

Conclusion
----------

This user and book management system provides a basic CRUD API for managing users and books. The application is built using Typescript and MongoDB, and can be easily extended to meet additional requirements.
