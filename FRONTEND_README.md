# Portfolio Frontend Documentation v5

## Overview

This is a production-ready React frontend for a portfolio website. The entire public site requires zero login - any visitor can browse all content. Authentication only enters when someone needs to write data (admins managing their projects, super admin managing contacts and organization projects).

## Features

✨ **Public Features:**
- Home page with team member cards
- Individual team member portfolio pages
- Organization projects showcase
- Services page
- Contact form with rate limiting

🔐 **Admin Features:**
- Admin login
- Personal project management (CRUD)
- View submitted contact requests (Super Admin)
- Manage organization projects (Super Admin)

🎨 **Technical:**
- React 19 + Vite
- React Router for dynamic routing
- Three.js integration for hero scene
- Tailwind CSS styling
- JWT authentication
- React Hot Toast notifications

## Getting Started

```bash
cd frontend
npm install
npm run dev
```

App opens at `http://localhost:5173`

## Project Structure

```
src/
├── api/
│   ├── axiosClient.js      # Axios instance with JWT interceptor
│   └── mockData.js         # Mock data for standalone development
├── components/
│   ├── layout/
│   │   ├── Header.jsx      # Navigation header
│   │   └── Footer.jsx      # Footer with links
│   ├── TeamCard.jsx        # Team member card
│   ├── ProjectCard.jsx     # Project display card
│   └── HeroScene.jsx       # Three.js animated scene
├── context/
│   └── AuthContext.jsx     # Authentication state management
├── pages/
│   ├── Home.jsx            # Home page
│   ├── Services.jsx        # Services page
│   ├── ContactUs.jsx       # Contact form
│   ├── MemberPortfolio.jsx # Dynamic portfolio page
│   ├── OrganizationProjects.jsx
│   ├── AdminLogin.jsx      # Login page
│   ├── AdminDashboard.jsx  # Admin dashboard
│   └── SuperAdminDashboard.jsx # Super admin controls
├── routes/
│   └── ProtectedRoute.jsx  # Route protection component
├── App.jsx                 # Main app component
└── main.jsx                # Entry point
```

## Key Components

### Header
- Shows navigation links
- Login button for non-authenticated users
- User dropdown for authenticated users

### MemberPortfolio
- Dynamic route `/portfolio/:slug`
- Fetches individual member data and projects
- Shows edit/delete controls only to the owner or super admin

### AdminDashboard
- Protected route (requires admin login)
- Displays user's personal projects
- Allows project deletion

### SuperAdminDashboard
- Protected route (requires superadmin role)
- Three tabs: Contact Requests, Organization Projects, Manage Team
- Mark contact requests as resolved

## API Integration

All API calls go through the `axiosClient` which automatically attaches JWT tokens:

```javascript
import axiosClient from '../api/axiosClient';

// GET request
const res = await axiosClient.get('/team');

// POST request with token attached automatically
const res = await axiosClient.post('/contact', formData);
```

## Authentication Flow

1. User logs in at `/login`
2. Credentials sent to `/api/auth/login`
3. Backend returns JWT token + user data
4. Frontend stores token in localStorage
5. Token automatically attached to all subsequent requests
6. Protected routes check authentication status

## Environment Variables

```
VITE_API_BASE_URL=http://localhost:5000/api
```

## Security Notes

- Tokens stored in localStorage (consider httpOnly cookies for production)
- UI controls visibility only - real security enforced server-side
- All protected routes redirected to login if not authenticated
- Role-based route protection (admin vs superadmin)

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Default Test Credentials

**Admin Account:**
- Email: arman@company.com
- Password: SecurePass123

**Super Admin Account:**
- Email: superadmin@company.com
- Password: SuperSecurePass123
