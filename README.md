# Rydex | One Tap Away from Your Next Ride

## Project Overview

Rydex is a production-grade, full-stack ride-sharing application designed to provide a seamless and intuitive experience for Riders, Drivers, and Administrators. Inspired by popular platforms like Uber and Pathao, Rydex leverages modern web technologies to deliver a responsive, feature-rich, and secure ride booking system.

This repository contains the frontend implementation of Rydex, built with React, Redux Toolkit, and RTK Query, ensuring robust state management and efficient API communication. The frontend is fully responsive, offering a consistent and polished UI/UX across mobile, tablet, and desktop devices.

## Features

Rydex offers distinct, role-based experiences, each tailored with specific functionalities:

### Public Landing Experience

- **Home:** Engaging sections including a Hero Banner, How-it-works, Service Highlights, Customer Testimonials, and Call-to-action prompts.
- **About Us:** Comprehensive company background, mission, and team profiles.
- **Features:** Detailed breakdown of Rider, Driver, and Admin capabilities.
- **Contact:** Validated inquiry form with simulated submission.
- **FAQ:** Searchable list of common questions.

### Authentication & Authorization

- **JWT-based Security:** Secure login and registration with role selection (Rider, Driver, Admin).
- **Role-Based Landing:** Users are directed to specific dashboards based on their roles.
- **Account Status Handling:** Dedicated pages for blocked/suspended users and notices for offline drivers.
- **Persistent Session:** Maintained authentication state across browser sessions.
- **Logout:** Secure session termination.

### Rider Features

- **Ride Request:** Intuitive form for pickup/destination, fare estimation, and payment method.
- **Live Ride Tracking:** Real-time map updates and driver details during active rides.
- **Ride History:** Paginated list with search and filter options (date, fare, status).
- **Ride Details:** Comprehensive page with optional map route, timestamps, driver info, and status timeline.
- **Profile Management:** Update personal details and password.
- **Emergency / SOS Button:** Floating button for quick access to call police, notify emergency contacts, and share live location during active rides.

### Driver Features

- **Availability Control:** Easy toggle for Online/Offline status.
- **Incoming Requests:** Accept or reject ride offers from riders.
- **Active Ride Management:** Update ride statuses (Accepted, Picked Up, In Transit, Completed, Cancelled).
- **Earnings Dashboard:** Visual breakdown of daily, weekly, and monthly earnings with charts.
- **Ride History:** Paginated and filterable records of past rides.
- **Profile Management:** Update vehicle details, contact info, and password.

### Admin Features

- **User Management:** Search, filter, block/unblock riders, approve/suspend drivers.
- **Ride Oversight:** View all rides with advanced filtering capabilities.
- **Analytics Dashboard:** Data visualizations for ride volume, revenue trends, and driver activity.
- **Search & Filter Tools:** Consistent across all listing pages for efficient data management.
- **Profile Management:** Update personal profile and password.

### General UI/UX Enhancements

- **Responsive Design:** Optimized for mobile, tablet, and desktop.
- **Visual Consistency:** Uniform typography, spacing, and color palette.
- **Sticky Navigation & Footer:** Well-structured navigation with dropdowns and a thematic footer.
- **Performance Optimization:** Lazy-loading, skeleton loaders, and smooth transitions.
- **Accessibility:** Compliant components and semantic HTML.
- **Data Visualization:** Interactive cards, bar charts, pie charts, and tables for dynamic data display.
- **Strict Error Handling:** Robust form validation, clear error messages for API failures, and success/error toasts.

## Tech Stack

### Frontend

- **Framework:** React
- **State Management:** Redux Toolkit
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI, Lucide React, Framer Motion, Sonner
- **Forms & Validation:** React Hook Form, Zod
- **Icons:** React Icons
- **Data Visualization:** Recharts
- **API Client:** Axios
- **Date Utilities:** Date FNS

### Backend

- **Framework:** Node.js/Express
- **Database:** MongoDB , Mongoose ODM
- **Authentication:** JWT, bcryptjs, Passport.js
- **Language:** TypeScript
- **Validation:** Zod
- **Middleware:** CORS, Cookie Parser, Express Session, Multer
- **Utilities:** Dotenv, Day.js , HTTP Status Codes, MS

### Demo Login Credentials

For testing purposes, you can use the following accounts:

- **Super Admin**

  - Email: `super@admin.com`
  - Password: `123456`

- **Rider**

  - Email: `rifat@gmail.com`
  - Password: `Rifat123@`

- **Driver**
  - Email: `raiyan@gmail.com`
  - Password: `Raiyan123@`
