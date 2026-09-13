# Portfolio Backend Documentation v5

## Overview

This is a production-ready Node.js/Express backend for a portfolio website. It provides a fully RESTful API with JWT authentication, role-based access control, and comprehensive security measures.

## Features

✨ **Public Endpoints:**
- Get team members
- Get team member portfolio
- Get organization projects
- Submit contact form

🔐 **Authentication:**
- JWT-based authentication
- Bcrypt password hashing
- Role-based access control (admin, superadmin)

🛡️ **Security:**
- Rate limiting on login and contact endpoints
- Input sanitization and validation
- XSS and NoSQL injection prevention
- CORS protection
- Secure HTTP headers (Helmet.js)

## Getting Started

```bash
cd backend

# Copy environment file
cp .env.example .env

# Install dependencies
npm install

# Seed database with sample data
npm run seed

# Start development server
npm run dev
```

Server runs on `http://localhost:5000`

## Project Structure

```
src/
├── config/
│   └── db.js               # MongoDB connection
├── models/
│   ├── User.js             # User schema
│   ├── Project.js          # Project schema
│   └── ContactMessage.js   # Contact message schema
├── controllers/
│   ├── authController.js   # Auth logic
│   ├── teamController.js   # Team data
│   ├── projectController.js # Project CRUD
│   ├── contactController.js # Contact form
│   └── superAdminController.js # Super admin operations
├── middleware/
│   ├── authMiddleware.js   # JWT verification
│   ├── requireRole.js      # Role checking
│   ├── requireOwnership.js # Ownership verification
│   └── rateLimiters.js     # Rate limiting
├── routes/
│   ├── authRoutes.js       # Auth endpoints
│   ├── teamRoutes.js       # Team endpoints
│   ├── projectRoutes.js    # Project endpoints
│   ├── contactRoutes.js    # Contact endpoints
│   └── superAdminRoutes.js # Super admin endpoints
├── utils/
│   ├── errorHandler.js     # Error class
│   └── asyncHandler.js     # Async wrapper
└── app.js                  # Express app setup
```

## Database Models

### User
```javascript
{
  name: String,
  slug: String (unique),
  email: String (unique),
  password: String (hashed),
  role: 'admin' | 'superadmin',
  title: String,
  avatar: String,
  bio: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Project
```javascript
{
  title: String (required),
  image: String (required),
  liveLink: String (required),
  githubLink: String,
  description: String,
  techStack: [String],
  type: 'personal' | 'organization',
  owner: ObjectId (required if personal),
  featured: Boolean,
  order: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### ContactMessage
```javascript
{
  name: String (required),
  email: String (required),
  phone: String (required),
  address: String,
  message: String,
  status: 'new' | 'resolved',
  createdAt: Date
}
```

## API Endpoints

### Public Routes

#### Get all team members
```
GET /api/team
```

#### Get team member portfolio
```
GET /api/team/:slug
```

#### Get organization projects
```
GET /api/organization-projects
```

#### Submit contact form
```
POST /api/contact
Body: { name, email, phone, address?, message? }
```

### Authentication

#### Login
```
POST /api/auth/login
Body: { email, password }
Response: { token, user: { id, name, slug, role } }
```

### Protected Routes (Admin)

#### Create project
```
POST /api/projects
Headers: Authorization: Bearer <token>
Body: { title, image, liveLink, githubLink?, description?, techStack? }
```

#### Update project
```
PUT /api/projects/:id
Headers: Authorization: Bearer <token>
Body: { title?, image?, liveLink?, ... }
```

#### Delete project
```
DELETE /api/projects/:id
Headers: Authorization: Bearer <token>
```

### Protected Routes (Super Admin)

#### Get contact requests
```
GET /api/superadmin/contacts
Headers: Authorization: Bearer <superadmin-token>
```

#### Update contact status
```
PUT /api/superadmin/contacts/:id
Headers: Authorization: Bearer <superadmin-token>
Body: { status: 'resolved' }
```

#### Get organization projects
```
GET /api/superadmin/organization-projects
Headers: Authorization: Bearer <superadmin-token>
```

#### Create organization project
```
POST /api/superadmin/organization-projects
Headers: Authorization: Bearer <superadmin-token>
Body: { title, image, liveLink, ... }
```

## Environment Variables

```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/portfolioDB
JWT_SECRET=your_secret_key_min_32_chars
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=optional
CLOUDINARY_API_KEY=optional
CLOUDINARY_API_SECRET=optional
```

## Middleware

### Authentication
Verifies JWT token and attaches user to request.

### Role-based
Ensures user has required role (admin or superadmin).

### Ownership
Verifies user owns the resource or is superadmin.

### Rate Limiting
- Login: 10 attempts per 15 minutes
- Contact: 5 submissions per hour

## Seeding Database

```bash
npm run seed
```

Creates:
- 4 admin accounts (Arman, Biswajit, Debjit, Sankha)
- 1 superadmin account
- 5 sample projects
- 2 sample contact messages

## Default Credentials (After Seeding)

**Admins:**
- arman@company.com / SecurePass123
- biswajit@company.com / SecurePass123
- debjit@company.com / SecurePass123
- sankha@company.com / SecurePass123

**Super Admin:**
- superadmin@company.com / SuperSecurePass123

## Error Handling

All errors return standardized JSON:
```json
{
  "success": false,
  "message": "Error description",
  "errors": [{ "field": "email", "message": "Invalid email" }]
}
```

## Testing with Postman

1. Import the API endpoints
2. Test public routes (no auth needed)
3. Login and copy token
4. Add to Authorization header: `Bearer <token>`
5. Test protected routes

## Security Best Practices

✅ Passwords hashed with bcrypt (cost 10)
✅ JWT signed with secret key
✅ CORS restricted to frontend URL
✅ Rate limiting on sensitive endpoints
✅ Input validation and sanitization
✅ XSS protection enabled
✅ NoSQL injection prevention
✅ Helmet.js for secure headers
✅ Environment variables for secrets

## Available Scripts

```bash
npm run dev    # Start with nodemon
npm start      # Start production
npm run seed   # Seed database
```

## Troubleshooting

**MongoDB Connection Error:**
- Ensure MongoDB is running locally or update MONGO_URI

**Port Already in Use:**
- Change PORT in .env or kill process on port 5000

**CORS Error:**
- Update CLIENT_URL in .env to match frontend URL

**Rate Limit Error:**
- Wait 15 minutes for login attempts or 1 hour for contacts
