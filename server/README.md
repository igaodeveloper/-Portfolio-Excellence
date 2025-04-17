# Portfolio Excellence Backend API

## Overview

Backend API for the Portfolio Excellence project. This API provides endpoints for managing portfolio content, including projects, skills, experience, services, and analytics.

## Features

- RESTful API architecture
- JWT authentication for secure admin access
- In-memory data storage (no database required)
- Input validation
- Rate limiting
- Error handling
- Logging

## Technologies

- Node.js
- Express.js
- JSON Web Tokens (JWT)
- Express Validator
- Helmet (security)
- CORS
- Morgan (logging)

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login and get token
- `GET /api/auth/me` - Get current user info

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/featured` - Get featured projects
- `GET /api/projects/:id` - Get project by ID
- `POST /api/projects` - Create a new project (admin only)
- `PUT /api/projects/:id` - Update a project (admin only)
- `DELETE /api/projects/:id` - Delete a project (admin only)

### Profile
- `GET /api/profile` - Get profile data
- `PUT /api/profile` - Update profile data (admin only)

### Skills
- `GET /api/skills` - Get all skills
- `GET /api/skills/:id` - Get skill by ID
- `POST /api/skills` - Create a new skill (admin only)
- `PUT /api/skills/:id` - Update a skill (admin only)
- `DELETE /api/skills/:id` - Delete a skill (admin only)

### Experience
- `GET /api/experience` - Get all experiences
- `GET /api/experience/:id` - Get experience by ID
- `POST /api/experience` - Create a new experience (admin only)
- `PUT /api/experience/:id` - Update an experience (admin only)
- `DELETE /api/experience/:id` - Delete an experience (admin only)

### Services
- `GET /api/services` - Get all services
- `GET /api/services/:id` - Get service by ID
- `POST /api/services` - Create a new service (admin only)
- `PUT /api/services/:id` - Update a service (admin only)
- `DELETE /api/services/:id` - Delete a service (admin only)

### Analytics
- `GET /api/analytics` - Get analytics data (admin only)
- `PUT /api/analytics` - Update analytics data (admin only)
- `POST /api/analytics/pageview` - Record page view
- `POST /api/analytics/project/:projectId` - Record project view

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the server: `npm start`
4. For development with auto-restart: `npm run dev`

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
JWT_SECRET=your-super-secret-jwt-key
NODE_ENV=development
```

## Default Admin Credentials

```
Email: admin@example.com
Password: password123
```

## License

MIT 