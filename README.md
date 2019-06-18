# Hypermedia Applications Project - 2019

## Overview
This page contains useful informations about our project and its architecture.

## General group informations

| Member n.     | Role           | First name | Last Name | Matricola | Email Address |
| ------------- | -------------  | ---------- | --------- | --------- | ------------- |
| 1             | Administrator | Davide     | Avanzi    | 913038    | davide1.avanzi@mail.polimi.it |
| 2     | Member  | Fabrizio | Carsenzuola | ... | fabrizio.carsenzuola@mail.polimi.it |
| 2     | Member  | Francesca | Bernecich | ... | francesca.bernecich@mail.polimi.it |

## Project specifications

The project **backend** consists in a NodeJS server, using a PostgreSQL relational database to store data.

The project **frontend** is made by a simple bootstrap template, of which we used the single components as building blocks to create our own web pages. We used jQuery to perform AJAX requests to the API interface in order to retrieve data and display it to the user.

## Installation

To run a copy of our project, follow the steps below (for Linux and OSX):

1. Download the .zip file of the source code (present at this [address](https://hyp.avanzi.dev/backend/source.zip))
2. Extract the content inside a folder
3. Open a shell inside the folder just created
4. Install PostgreSQL and create a new database "postgres" with a relative user "postgres" identified by a password "postgres" (these are the default values we used for developement, and are editable in the *knexfile.js* file present in the project other/service folder)

5. run  ```npm start ``` , the setup will take care of creating and populating the database tables
6. visit http://localhost:8080, the website will be prompted.


## Functionalities

We developed the following functionalities:

  - **Get all books** from the API, optionally filter them by author, theme and genre.
  - **Get the authors**, and see the books written by each one
  - **See the reviews** of a book (with a score average and score breakdown)
  -** Write your own review** of a book (once logged in)
  - **Register and login**, with your own user and cart pages while authenticated
  - **Get all events**, eventually filtered by book and for the current month.
  - **Add and remove books to cart** with stock management (the stock gets updated as an user adds it to the cart).
  - **Reserve** a book: this feature is to reserve books when they are out of stock, and we didn't develop it completely as it was not requested by the assignment.
  
## Info & troubleshooting

We decided to host the application server on a personal Ubuntu VPS accessible at the domain https://hyp.avanzi.dev. This is because we wanted to challenge ourselves with a real-world scenario in which we are tasked to deploy the application in a Linux server and make it accessible to the public using a real domain name and a reverse proxy. In the remote case the VPS is having issues and the website is not available at the moment of the evaluation, please contact any of the team members and we'll fix the problem within minutes.