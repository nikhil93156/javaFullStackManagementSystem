# Employee Management System

A full-stack web application for managing employees, built with React (frontend) and Spring Boot (backend).

## Features

- Employee registration and login
- JWT-based authentication
- Role-based access (ADMIN/NORMAL USER)
- Dashboard to view all employees
- Delete employee (ADMIN only)
- Responsive UI with Tailwind CSS

## Tech Stack

- **Frontend:** React, Vite, Axios, React Router, Tailwind CSS
- **Backend:** Spring Boot, Spring Security, JPA, MySQL, JWT

## Getting Started

### Prerequisites

- Node.js & npm
- Java 17+ (or as per `pom.xml`)
- MySQL server

### Backend Setup

1. Configure MySQL in [`backend/src/main/resources/application.properties`](backend/src/main/resources/application.properties).
2. Install dependencies and run the backend:

   ```sh
   cd backend
   ./mvnw spring-boot:run
