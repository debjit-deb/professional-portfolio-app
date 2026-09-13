# Professional Portfolio Website

A full-stack portfolio application built with React, Node.js/Express, and MongoDB. Features team member portfolios, project management, contact form, and admin dashboards.

## 🚀 Quick Start

### Prerequisites
- Node.js 22.x or higher
- MongoDB running locally or MongoDB Atlas URI
- npm or yarn

### Backend Setup

```bash
cd backend

# Copy and configure environment variables
cp .env.example .env

# Install dependencies
npm install

# Seed the database with sample data
npm run seed

# Start development server
npm run dev
```

**Server runs on:** `http://localhost:5000`

### Frontend Setup

```bash
cd frontend

# Copy and configure environment variables
cp .env.example .env

# Install dependencies
npm install

# Start development server
npm run dev
```

**App opens on:** `http://localhost:5173`

## 📝 Default Login Credentials

After seeding the database:

**Admin Accounts:**
- arman@company.com / SecurePass123
- biswajit@company.com / SecurePass123
- debjit@company.com / SecurePass123
- sankha@company.com / SecurePass123

**Super Admin Account:**
- superadmin@company.com / SuperSecurePass123

## 📁 Project Structure

```
project/
├── backend/                 # Express.js backend
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── models/         # MongoDB models (User, Project, ContactMessage)
│   │   ├── controllers/    # Business logic
│   │   ├── middleware/     # Auth, rate limiting, validation
│   │   ├── routes/         # API routes
│   │   ├── utils/          # Helper functions
│   │   └── app.js          # Express app setup
│   ├── seed.js             # Database seeding
│   └── server.js           # Server entry point
│
└── frontend/                # React frontend
    ├── src/
    │   ├── api/            # API client and mock data
    │   ├── components/     # Reusable components
    │   ├── context/        # React Context (Auth)
    │   ├── pages/          # Page components
    │   ├── routes/         # Protected routes
    │   ├── App.jsx         # Main app component
    │   └── main.jsx        # Entry point
    ├── index.html          # HTML template
    └── index.css           # Global styles
```

## 🔗 API Endpoints

### Public Routes (No Auth Required)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/team` | GET | Get all team members |
| `/api/team/:slug` | GET | Get team member portfolio |
| `/api/organization-projects` | GET | Get organization projects |
| `/api/contact` | POST | Submit contact form |

### Authentication

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/login` | POST | Admin/Super Admin login |

### Protected Routes (JWT Required)

| Endpoint | Method | Description | Auth |
|----------|--------|-------------|---------|
| `/api/projects` | POST | Create personal project | Admin |
| `/api/projects/:id` | PUT | Update personal project | Owner/SuperAdmin |
| `/api/projects/:id` | DELETE | Delete personal project | Owner/SuperAdmin |
| `/api/superadmin/contacts` | GET | Get contact requests | SuperAdmin |
| `/api/superadmin/contacts/:id` | PUT | Update contact status | SuperAdmin |
| `/api/superadmin/organization-projects` | GET | Get org projects | SuperAdmin |
| `/api/superadmin/organization-projects` | POST | Create org project | SuperAdmin |
| `/api/superadmin/admins` | GET | Get admin accounts | SuperAdmin |

## 🛡️ Security Features

- JWT-based authentication
- Bcrypt password hashing
- Rate limiting on login and contact endpoints
- CORS protection
- Helmet.js for secure headers
- Input sanitization (NoSQL injection & XSS prevention)
- Role-based access control (RBAC)
- Ownership verification for project management

## 🎨 Tech Stack

**Backend:**
- Express.js 4.x
- MongoDB 7.x
- Mongoose 8.x
- JWT & Bcrypt
- Morgan, Helmet, CORS

**Frontend:**
- React 19.x
- React Router 7.x
- Axios
- Three.js & @react-three/fiber
- Tailwind CSS
- React Hot Toast

## 📊 Database Schema

### Users Collection
- Stores 4 admin accounts + 1 superadmin
- Fields: name, slug, email, password (hashed), role, title, avatar, bio

### Projects Collection
- Personal projects (owned by admins) & Organization projects
- Fields: title, image, liveLink, githubLink, description, techStack, type, owner

### ContactMessages Collection
- Public contact form submissions
- Fields: name, email, phone, address, message, status, createdAt

## 🧪 Testing

1. **Public Pages:** Visit Home, Services, Contact Us, Team Portfolios (no login required)
2. **Contact Form:** Submit a message and see it in Super Admin dashboard
3. **Admin Login:** Login with any admin account and access the dashboard
4. **Project Management:** Create, edit, delete personal projects
5. **Super Admin:** Login as superadmin to manage contacts and org projects

## 📝 Environment Variables

**Backend (.env)**
```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/portfolioDB
JWT_SECRET=your_long_random_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

**Frontend (.env)**
```
VITE_API_BASE_URL=http://localhost:5000/api
```

## 🚀 Deployment

### Backend (Render, Railway, Heroku)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Set environment variables
4. Deploy

### Frontend (Vercel, Netlify)
1. Connect GitHub repository
2. Set build command: `npm run build`
3. Set output directory: `dist`
4. Update `VITE_API_BASE_URL` to production backend URL
5. Deploy

## 📚 Documentation

- **Frontend Docs:** See `Portfolio-Frontend-Documentation-v5.md`
- **Backend Docs:** See `Portfolio-Backend-Documentation-v5.md`

## 🤝 Contributing

Feel free to fork this repository and submit pull requests.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Author

Debjit Das - Full-stack developer

---

**Need help?** Check the documentation files or open an issue on GitHub.
