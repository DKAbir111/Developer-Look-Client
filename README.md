# MERN Stack To-Do App with Enhanced Security and Google Calendar Integration

## Description

This is a full-stack **MERN (MongoDB, Express, React, Node.js)** application that allows users to manage tasks securely with Mail Code 2-Step Authentication and Google Authenticator 2FA. It also integrates with Google Calendar, allowing users to sync their tasks with their Google Calendar. The app supports full CRUD operations for tasks, and tasks are displayed on a unified dashboard where users can filter them by date, status, and priority.

---

## Features

- **User Authentication:**
  - Register and log in using email and password.
  - Two-step authentication with Mail Code (Email-based 6-digit code, valid for 2 minutes).
  - Google Authenticator 2FA for an added layer of security (6-digit code, valid for 30 seconds).
  
- **To-Do Management (CRUD Operations):**
  - Create, read, update, and delete tasks.
  - Each task includes a title, description, due date, status, and priority.
  - Task status options: "Pending", "Completed".
  - Priority options: "High", "Medium", "Low".
  
- **Google Calendar Sync:**
  - Sync tasks with Google Calendar when the user connects their Google account.
  - Automatically create, update, and delete events in Google Calendar based on task changes.

- **Unified Dashboard:**
  - View tasks in a single dashboard.
  - Filter tasks by due date, status, and priority.
  - Tasks are displayed with their due dates and statuses.

---

## Technologies

- **Frontend:**  
  - React.js: Framework for building the user interface.
  - Tailwind CSS: Utility-first CSS framework for styling.
  - React Router: For navigation between different views.
  
- **Backend:**  
  - Node.js: JavaScript runtime for the backend.
  - Express.js: Web framework for building APIs.
  - MongoDB: Database for storing users and tasks (using MongoDB Atlas).
  - Mongoose: MongoDB ORM for interacting with the database.
  - Passport.js: Middleware for authentication (including Google OAuth integration).
  
- **Google APIs:**  
  - Google OAuth 2.0 for Google account authentication and task synchronization.
  - Google Calendar API to add/update/remove tasks in the user's Google Calendar.

- **Security:**  
  - **Mail Code 2-Step Authentication:** Email-based verification code.
  - **Google Authenticator 2FA:** Mobile app-based authentication for an extra layer of security.

---

## Setup Instructions

### Prerequisites

- Node.js and npm installed.
- MongoDB Atlas account (for database hosting).
- Google Cloud Console account (for Google OAuth and Google Calendar API setup).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/todo-app.git
   cd todo-app
