# Welcome to the JobTrack Frontend Documentation

Modern web application built with React, Vite, TypeScript, and Tailwind CSS, designed to help job seekers organize and track their job applications throughout the recruitment process.

## Overview

JobTrack is a platform developed to assist candidates in managing their job applications in a centralized and organized way.

Many job seekers apply to multiple positions simultaneously and often lose track of application dates, interview schedules, company responses, and the current status of each opportunity. JobTrack solves this problem by providing a simple and intuitive interface where users can monitor every stage of their job search journey.

The platform allows users to register job opportunities, track application statuses, schedule interviews, record notes and feedback, and visualize their progress through the recruitment pipeline. By centralizing all application-related information in one place, JobTrack helps candidates stay organized, improve their follow-up process, and make better decisions during their job search.

The frontend integrates with a secure backend API and Firebase Authentication, ensuring reliable user management, protected access, and a seamless user experience.

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
cd job_track_front
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
