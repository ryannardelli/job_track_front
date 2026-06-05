# Welcome to the Barbershop Management System Frontend Documentation

Modern web application built with React, Vite, TypeScript, and Tailwind CSS, designed to streamline barbershop operations, including appointment scheduling, customer management, and service administration.

## Overview

The Barbershop Management System provides an intuitive interface for barbers and administrators to manage appointments, customers, services, and daily operations efficiently. The application integrates with a secure backend API and Firebase Authentication for user management.

## Tech Stack & Technologies Used

* React
* Vite
* TypeScript
* Tailwind CSS
* Context API
* Zod


## Architecture
The application is structured using a layered architecture with DDD principles, promoting clear separation between domain, UI, and infrastructure, while ensuring maintainability and scalability.

## Project Structure
  ```bash
📁 src/
 ┣ 📁 components/     → Reusable components
 ┣ 📁 pages/          → System pages or screens
 ┣ 📁 assets/         → Static assets (images, icons, fonts)
 ┣ 📁 adapters/       → Adapters / integration with APIs or external formats
 ┣ 📁 layout/         → Layout components (header, footer, sidebar)
 ┣ 📁 hooks/          → Custom hooks
 ┣ 📁 types/          → Global types and interfaces
 ┣ 📁 schemas/        → Validation schemas (e.g., Zod, Yup)
 ┣ 📁 services/       → Services (APIs, Axios, configs)
 ┣ 📁 provider/       → Context API (global providers)
 ┣ 📁 reducer/        → Context API reducers
 ┣ 📁 models/         → Data models (types, interfaces, entities)
 ┣ 📁 router/         → Route configuration (React Router)
 ┣ 📁 templates/      → Base UI layouts or structures
 ┣ 📁 utils/          → Utility functions and helpers
 ┣ main.tsx           → Main entry file
 ┗ App.tsx            → Main routing and layout configuration
   ```

## Getting Started
### 1. Clone the repository
  ```bash
git clone https://github.com/ryannardelli/job_track_front.git
   ```

### 2. Navigate to the project directory
  ```bash
cd system_barbershop_front
   ```
### 3. Install dependencies
  ```bash
npm install
   ```

### 4. Run in development mode
  ```bash
npm run dev
   ```
### If everything is configured correctly, the following service will be available:

`http://localhost:5173`

---