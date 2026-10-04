# 🏨 Hotel Management System

A full-stack Hotel Management System developed to manage customers, rooms, bookings, payments, and administrative operations through a modern web dashboard.

## 🚀 Project Overview

The Hotel Management System is a full-stack web application designed to simplify hotel operations through a centralized management platform.

The system provides an admin dashboard where administrators can efficiently manage customers, rooms, bookings, payments, and view real-time analytics.

The application uses a React frontend connected with a Spring Boot backend through REST APIs, with MySQL as the database for storing and managing hotel records.

---

# 🛠️ Technologies Used

## Frontend

- React.js
- Vite
- JavaScript
- Bootstrap 5
- Axios
- React Router

## Backend

- Java
- Spring Boot
- Spring JDBC
- REST APIs
- Maven

## Database

- MySQL
- MySQL Workbench

## Development Tools

- Visual Studio Code
- Git
- GitHub
- Node.js
- npm

---

# ✨ Features

## 🔐 Admin Authentication

- Admin login system
- Protected routes
- Secure dashboard access
- Logout functionality

## 👥 Customer Management

- Add new customers
- View customer details
- Manage customer records
- Store customer information

## 🏠 Room Management

- View all rooms
- Track room availability
- Manage room status
- Categorize rooms based on room types

## 📅 Booking Management

- Create and manage bookings
- Link customers with rooms
- Track booking status
- Maintain check-in and check-out details

## 💳 Payment Management

- Store payment information
- Track payment status
- Manage transaction records
- Display revenue information

## 📊 Analytics Dashboard

The dashboard provides real-time hotel statistics:

- Total customers
- Total rooms
- Available rooms
- Occupied rooms
- Total bookings
- Revenue overview
- Recent bookings
- Recent payments
- Recent customer activity

All dashboard information is fetched dynamically from the MySQL database through REST APIs.

---

# 📂 Project Structure

```
Hotel-Management-System
│
├── backend
│   ├── Spring Boot Application
│   ├── Controllers
│   ├── Services
│   ├── DAO Layer
│   └── Models
│
├── frontend
│   ├── React Components
│   ├── Pages
│   ├── API Services
│   └── Dashboard UI
│
├── database
│   └── init.sql
│
└── gen_sql.js
```

---

# ⚙️ How to Run the Project

## 1. Database Setup

Open MySQL Workbench and execute:

```
database/init.sql
```

This will create:

- Database
- Tables
- Relationships
- Sample hotel records

---

## 2. Run Backend

Navigate to backend folder:

```
cd backend
```

Run:

```
mvn spring-boot:run
```

Backend runs on:

```
http://localhost:8080
```

---

## 3. Run Frontend

Navigate to frontend folder:

```
cd frontend
```

Install dependencies:

```
npm install
```

Start application:

```
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

# 🔗 REST API Endpoints

Main API endpoints:

```
GET /api/customers

GET /api/rooms

GET /api/bookings

GET /api/payments
```

---

# 📌 Database Design

Main entities:

- Admin
- Customer
- Room Type
- Room
- Booking
- Payment

Relationships are maintained using:

- Primary Keys
- Foreign Keys
- Relational database design principles

---

# 🔄 Application Architecture

```
React Frontend
        |
        |
      Axios
        |
        |
Spring Boot REST API
        |
        |
 Spring JDBC
        |
        |
MySQL Database
```

---

# 🔄 Version Control

The project is maintained using Git version control.

Repository hosting:

GitHub

Version control features:

- Source code management
- Version tracking
- Commit history
- Project backup

---

# 👨‍💻 Developed By

## Aishvarya Perumalsamy

Hotel Management System Project