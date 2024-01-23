# MERN Social Media App

Welcome to the MERN Social Media App! This application is a full-stack social media platform built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It incorporates JWT (JSON Web Tokens) for secure authentication and authorization.

## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication with JWT
- Create, edit, and delete posts
- Follow and unfollow other users
- View and update user profiles

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/try/download/community)

### Installation

1. Clone the repository:

2. Navigate to the project folder:

    ```bash
    cd <YOUR_PROJECT_NAME>
    ```

3. Install dependencies for both frontend and backend:

    ```bash
    cd backend
    npm i
    cd frontend
    npm i
    ```

### Running the App

1. Create a `.env` file in the `backend` directory:

    ```env
    PORT=3001
    MONGO_URI=<YOUR_MONGO_DB_URI>
    SECRET=<YOUR_JWT_SECRET>
    ```

    Replace `<YOUR_MONGO_DB_URI>` with the connection string for your MongoDB instance and `<YOUR_JWT_SECRET>` with a secure string for JWT.

2. Run the backend server:

    ```bash
    nodemon server
    ```

3. In a new terminal, run the frontend:

    ```bash
    npm start
    ```

Now, your MERN Social Media App should be up and running!

## Usage

Visit `http://localhost:3000` in your browser to use the application. Sign up, log in, and start exploring the features.

## Contributing

Feel free to contribute to this project! Fork the repository, make your changes, and submit a pull request.

