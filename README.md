# Task Manager Web Application

A full stack task management application built with Next.js, Tailwind CSS, Node.js, Express.js, and MongoDB. This project is structured as a monorepo using pnpm workspaces and TurboRepo for faster development and deployment.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Monorepo Management**: pnpm workspaces, TurboRepo

## Features

- User login and registration functionality
- User authentication and authorization
- Display user-specific tasks
- Create, read, update, and delete tasks
- Mark tasks as completed
- Progress Tracking

## Setup Instructions

Clone the repository and follow the steps below to set up the application locally.

### 1. Prerequisites

- **Node.js** (v18 or higher)
- **pnpm** installed globally (npm install -g pnpm)
- **MongoDB Atlas** account for database hosting (<https://www.mongodb.com/>)

### 2. Dependencies Installation

- Navigate to the root directory of the project and run:

     ```bash
     pnpm install
     ```

### 3. Environment Variables Setup

#### For the Frontend

- Navigate to the client directory :

     ```bash
     cd apps/client
     ```

- Create a `.env.local` file and add the following environment variables:

     ```env
        NEXT_PUBLIC_API_URL=http://localhost:5000
        JWT_SECRET=your_jwt_secret_key
    ```

    Generate a 32-character JWT secret and replace `your_jwt_secret_key` with it.

#### For the Backend

- Navigate to the server directory:

     ```bash
     cd ../server
     ```

- Create a `.env` file and add the following environment variables:

     ```env
        MONGODB_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret_key
    ```

    Replace `your_mongodb_connection_string` with your MongoDB Atlas connection string and ensure the `JWT_SECRET` matches the one used in the frontend.

    Login/SignUp to MongoDB Atlas, create a new project, and create a cluster in the project. Then, get the connection string by following the on-screen instructions to connect the application to the database.

## Steps to Run the Application

Go back to the root directory and run the following command to start both the frontend and backend servers concurrently:

```bash
cd ../..
pnpm dev
```

This will start the frontend on `http://localhost:3000` and the backend on `http://localhost:5000`.
