# NexConn – Real-Time Chat Application

## Overview

NexConn is a real-time messaging application built for the NexConn Hackathon. The goal is to create a smooth, reliable, and user-friendly communication platform where users can connect and communicate with each other in real time.

The application will support private conversations between two users as well as group conversations, allowing users to communicate, share information, and exchange media files seamlessly.

The project integrates the **NexConn Software Development Kit (SDK)** as a core part of its communication infrastructure.

## Core Features

### 1. Private Messaging
- Real-time one-to-one conversations between users.
- Smooth and responsive messaging experience.
- Ability to communicate with friends and family.

### 2. Group Messaging
- Create and participate in group conversations.
- Send and receive messages within groups.
- Support communication between multiple users.

### 3. Media and File Sharing
- Share images with other users.
- Send and receive video files.
- Upload and share PDF documents.
- Cloudinary integration for media storage and management.

### 4. User Authentication
- User registration and login.
- JWT-based authentication.
- Protected application routes and APIs.

## Technology Stack

### Backend
- **Node.js** – JavaScript runtime.
- **Express.js** – Backend framework and REST API development.
- **MongoDB** – Database.
- **Mongoose** – MongoDB object modeling.
- **JWT (jsonwebtoken)** – Authentication and authorization.
- **Cloudinary** – Media and file storage.
- **dotenv** – Environment variable management.
- **CORS** – Cross-origin resource sharing.

### Frontend
- **Next.js** – Frontend framework.
- **Tailwind CSS** – Utility-first CSS framework.
- **shadcn/ui** – UI component library.

### Communication Infrastructure
- **NexConn SDK** – Core SDK integration for real-time communication and messaging.

## Project Architecture

The application follows a separate frontend and backend architecture.

- The Next.js frontend handles the user interface and client-side interactions.
- The Express.js backend handles APIs, authentication, business logic, and database operations.
- MongoDB stores application data.
- Cloudinary handles media storage.
- NexConn SDK provides the communication capabilities required by the application.

## Project Goals

- Build a smooth real-time messaging experience.
- Implement private and group conversations.
- Enable seamless image, video, and document sharing.
- Integrate the NexConn SDK effectively.
- Maintain a clean, modular, and maintainable codebase.
- Deliver a responsive and intuitive user interface.

## Hackathon Context

This project is being developed as part of the NexConn Hackathon, with a focus on demonstrating the capabilities of the NexConn SDK through a practical real-world communication application.