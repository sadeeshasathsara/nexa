# Nexa - Educational Platform Connecting Students with Tutors

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.1-blue.svg)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-5.1-lightgrey.svg)](https://expressjs.com/)

**Nexa** is a comprehensive educational platform designed to connect underprivileged students with volunteer tutors, institutions, and donors. The platform facilitates educational content delivery, course management, and community engagement to bridge educational gaps.

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [User Roles](#-user-roles)
- [Development](#-development)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [Authors](#-authors)
- [License](#-license)

## ✨ Features

### Core Functionality
- **Multi-Role System**: Support for Students, Tutors, Institutions, Donors, and Admins
- **Course Management**: Create, manage, and deliver educational content
- **Lesson Management**: Video and material uploads for comprehensive learning
- **Authentication & Authorization**: Secure JWT-based authentication with role-based access control
- **Email Verification**: OTP-based email verification for user registration
- **User Profiles**: Customizable profiles for each user type
- **File Upload System**: Support for course materials, videos, and documents

### User-Specific Features

#### Students
- Browse and enroll in courses
- Access lessons and learning materials
- Track progress and achievements
- Connect with tutors

#### Tutors
- Create and manage courses
- Upload lessons and materials
- Monitor student progress
- Volunteer teaching opportunities

#### Institutions
- Institutional account management
- Bulk student enrollment
- Course oversight
- Progress tracking

#### Donors
- Support educational initiatives
- Track donations and impact
- Connect with beneficiaries

#### Admins
- Platform-wide management
- User verification and approval
- Content moderation
- Analytics and reporting

## 🏗 Architecture

Nexa follows a **monorepo architecture** with separate frontend and backend applications:

```
nexa/
├── nexa_express/     # Backend API (Node.js + Express)
└── nexa_react/       # Frontend Application (React + Vite)
```

### Design Patterns
- **MVC Architecture**: Models, Views (React), Controllers
- **Service Layer Pattern**: Business logic separation
- **Middleware Pattern**: Authentication, validation, error handling
- **Repository Pattern**: Database abstraction
- **Role-Based Access Control (RBAC)**: Security and authorization

## 🛠 Tech Stack

### Backend (`nexa_express`)
- **Runtime**: Node.js
- **Framework**: Express.js 5.1
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken) + bcryptjs
- **Validation**: express-validator
- **File Upload**: Multer
- **Email**: Nodemailer
- **Security**: CORS, cookie-parser
- **Development**: Nodemon

### Frontend (`nexa_react`)
- **Framework**: React 19.1
- **Build Tool**: Vite 7.1
- **Styling**: Tailwind CSS 4.1
- **Routing**: React Router DOM 7.8
- **State Management**: Redux 5.0 + React Redux 9.2
- **Forms**: React Hook Form 7.62
- **HTTP Client**: Axios 1.11
- **UI Components**: Lucide React (icons)
- **Charts**: Recharts 3.2
- **Notifications**: React Toastify 11.0
- **Security**: React Google reCAPTCHA
- **Calendar**: React Calendar

### Development Tools
- ESLint for code linting
- Git for version control
- dotenv for environment management

## 📁 Project Structure

### Backend Structure (`nexa_express/`)
```
nexa_express/
├── server.js                    # Application entry point
├── package.json
├── src/
│   ├── config/                  # Configuration files
│   │   ├── database.config.js   # MongoDB connection
│   │   ├── roleUrl.config.js    # Role-based URL mapping
│   │   └── [role].config/       # Role-specific configs
│   ├── controllers/             # Request handlers
│   │   ├── admin.controllers/
│   │   ├── donor.controllers/
│   │   ├── global.controllers/
│   │   ├── institution.controllers/
│   │   ├── student.controllers/
│   │   └── tutor.controllers/
│   ├── middlewares/             # Custom middleware
│   │   ├── admin.middlewares/
│   │   ├── donor.middlewares/
│   │   ├── global.middlewares/  # Auth, validation, error handling
│   │   ├── institution.middlewares/
│   │   ├── student.middlewares/
│   │   └── tutor.middlewares/
│   ├── models/                  # MongoDB schemas
│   │   ├── admin.models/
│   │   ├── donor.models/
│   │   ├── global.models/
│   │   ├── institution.models/
│   │   ├── student.models/
│   │   └── tutor.models/
│   ├── routes/                  # API routes
│   │   ├── global.routes/       # Main router
│   │   ├── admin.routes/
│   │   ├── donor.routes/
│   │   ├── institution.routes/
│   │   ├── student.routes/
│   │   └── tutor.routes/
│   ├── services/                # Business logic
│   │   ├── admin.services/
│   │   ├── donor.services/
│   │   ├── global.services/
│   │   ├── institution.services/
│   │   ├── student.services/
│   │   └── tutor.services/
│   ├── utils/                   # Helper functions
│   │   ├── admin.utils/
│   │   ├── donor.utils/
│   │   ├── global.utils/
│   │   ├── institution.utils/
│   │   ├── student.utils/
│   │   └── tutor.utils/
│   └── scripts/                 # Database seeds & utilities
│       └── seed.admin.js
├── tests/                       # Test suites
│   ├── admin_tests/
│   ├── donor_tests/
│   ├── institution_tests/
│   ├── student_services/
│   └── tutor_services/
└── uploads/                     # File storage
    ├── courses/
    └── lessons/
        ├── materials/
        └── videos/
```

### Frontend Structure (`nexa_react/`)
```
nexa_react/
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
├── docs/
│   └── registration_architecture_doc.md
├── public/                      # Static assets
├── src/
│   ├── main.jsx                 # Application entry
│   ├── App.jsx                  # Root component
│   ├── App.css
│   ├── index.css
│   ├── apis/                    # API integration
│   │   ├── admin.apis/
│   │   ├── donor.apis/
│   │   ├── global.apis/
│   │   ├── institution.apis/
│   │   ├── student.apis/
│   │   └── tutor.apis/
│   ├── assets/                  # Images, fonts, icons
│   │   ├── admin.assets/
│   │   ├── donor.assets/
│   │   ├── global.assets/
│   │   ├── institution.assets/
│   │   ├── student.assets/
│   │   └── tutor.assets/
│   ├── components/              # Reusable components
│   │   ├── admin.components/
│   │   ├── donor.components/
│   │   ├── global.components/
│   │   ├── institution.components/
│   │   ├── student.components/
│   │   └── tutor.components/
│   ├── configs/                 # Configuration files
│   │   ├── registration.config.jsx
│   │   └── admin.configs/
│   ├── pages/                   # Page components
│   │   ├── admin.pages/
│   │   ├── donor.pages/
│   │   ├── global.pages/
│   │   ├── institution.pages/
│   │   ├── student.pages/
│   │   └── tutor.pages/
│   ├── redux/                   # State management
│   │   ├── admin.redux/
│   │   └── [other role stores]
│   ├── routes/                  # Route configuration
│   └── tools/                   # Utility functions
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (comes with Node.js)
- **MongoDB**: v6.0 or higher (local installation or MongoDB Atlas account)
- **Git**: For version control

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/sadeeshasathsara/nexa.git
cd nexa
```

### 2. Install Root Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd nexa_express
npm install
cd ..
```

### 4. Install Frontend Dependencies
```bash
cd nexa_react
npm install
cd ..
```

## ⚙ Configuration

### Backend Configuration

1. **Create Environment File**
   
   Create a `.env` file in the `nexa_express/` directory:
   ```bash
   cd nexa_express
   cp .env.example .env  # If example exists, or create manually
   ```

2. **Configure Environment Variables**
   
   Edit `nexa_express/.env` with your settings:
   ```env
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/nexa
   # OR for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/nexa?retryWrites=true&w=majority
   
   # JWT Configuration
   JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
   JWT_EXPIRE=7d
   
   # Email Configuration (Nodemailer)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-specific-password
   EMAIL_FROM=noreply@nexa.com
   
   # CORS Configuration
   CORS_ORIGIN=http://localhost:3000
   
   # File Upload Configuration
   MAX_FILE_SIZE=10485760  # 10MB in bytes
   ALLOWED_FILE_TYPES=jpg,jpeg,png,pdf,mp4,avi
   
   # OTP Configuration
   OTP_EXPIRE_MINUTES=10
   ```

3. **Database Setup**
   
   - **Local MongoDB**: Ensure MongoDB is running
     ```bash
     # Windows (if installed as service)
     net start MongoDB
     
     # Or start manually
     mongod
     ```
   
   - **MongoDB Atlas**: Create a cluster and get your connection string
     1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
     2. Create a free cluster
     3. Create a database user
     4. Whitelist your IP address
     5. Get your connection string and add it to `.env`

4. **Seed Initial Data (Optional)**
   ```bash
   cd nexa_express
   node src/scripts/seed.admin.js
   ```

### Frontend Configuration

1. **Create Environment File**
   
   Create a `.env` file in the `nexa_react/` directory:
   ```bash
   cd nexa_react
   ```

2. **Configure Environment Variables**
   
   Edit `nexa_react/.env`:
   ```env
   # API Configuration
   VITE_API_BASE_URL=http://localhost:5000/api
   
   # Google reCAPTCHA (get keys from Google reCAPTCHA console)
   VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   
   # App Configuration
   VITE_APP_NAME=Nexa
   VITE_APP_VERSION=1.0.0
   ```

## 🏃 Running the Application

### Development Mode

#### Option 1: Run Both Servers Simultaneously

**Terminal 1 - Backend:**
```bash
cd nexa_express
npm run dev
```
Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd nexa_react
npm run dev
```
Frontend will run on `http://localhost:3000` (or the port Vite assigns)

#### Option 2: Using Concurrent Commands (if configured)

If you have a root-level script configured, you can run both from the root:
```bash
npm run dev
```

### Production Mode

#### Build Frontend
```bash
cd nexa_react
npm run build
```

#### Run Backend in Production
```bash
cd nexa_express
NODE_ENV=production node server.js
```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "password": "SecurePassword123!",
  "role": "student"
}
```

#### Verify Email (OTP)
```http
POST /api/auth/verify-otp
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "otp": "123456"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john.doe@example.com",
  "password": "SecurePassword123!"
}
```

#### Logout
```http
POST /api/auth/logout
Authorization: Bearer {token}
```

### User Endpoints

#### Get Profile
```http
GET /api/users/profile
Authorization: Bearer {token}
```

#### Update Profile
```http
PUT /api/users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "Jane",
  "lastName": "Doe"
}
```

### Course Endpoints (Tutor)

#### Create Course
```http
POST /api/tutor/courses
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "title": "Introduction to Programming",
  "description": "Learn the basics of programming",
  "category": "Computer Science",
  "thumbnail": [file]
}
```

#### Get All Courses
```http
GET /api/courses
```

#### Get Course by ID
```http
GET /api/courses/:id
```

### Lesson Endpoints

#### Create Lesson
```http
POST /api/tutor/courses/:courseId/lessons
Authorization: Bearer {token}
Content-Type: multipart/form-data

{
  "title": "Lesson 1: Variables",
  "description": "Understanding variables",
  "video": [file],
  "materials": [files]
}
```

### Role-Based Routes

- `/api/admin/*` - Admin-only routes
- `/api/student/*` - Student routes
- `/api/tutor/*` - Tutor routes
- `/api/institution/*` - Institution routes
- `/api/donor/*` - Donor routes

> **Note**: Detailed API documentation with all endpoints, request/response examples, and authentication requirements will be available in the `/docs` folder or via Swagger UI (if configured).

## 👥 User Roles

### 1. Student
- Browse and search courses
- Enroll in courses
- Access lessons and materials
- Track learning progress
- Connect with tutors

### 2. Tutor (Volunteer)
- Create and manage courses
- Upload lessons (videos and materials)
- Monitor student progress
- Communicate with students
- Manage course content

### 3. Institution
- Manage institutional profile
- Enroll multiple students
- Track student progress
- Oversee course offerings
- Generate reports

### 4. Donor
- View educational initiatives
- Make donations
- Track donation impact
- Connect with beneficiaries
- Receive updates and reports

### 5. Admin
- User management and verification
- Content moderation
- Platform configuration
- Analytics and reporting
- System monitoring

## 💻 Development

### Code Structure Guidelines

#### Backend
- **Models**: Define MongoDB schemas in `src/models/[role].models/`
- **Controllers**: Handle HTTP requests in `src/controllers/[role].controllers/`
- **Services**: Implement business logic in `src/services/[role].services/`
- **Routes**: Define API endpoints in `src/routes/[role].routes/`
- **Middleware**: Custom middleware in `src/middlewares/[role].middlewares/`
- **Utils**: Helper functions in `src/utils/[role].utils/`

#### Frontend
- **Components**: Reusable UI components in `src/components/[role].components/`
- **Pages**: Full page components in `src/pages/[role].pages/`
- **Redux**: State management in `src/redux/[role].redux/`
- **APIs**: API integration in `src/apis/[role].apis/`
- **Assets**: Static files in `src/assets/[role].assets/`

### Registration System Architecture

The registration system uses a **step-based flow** with role-specific configurations:

1. **RegistrationOnboarding**: Role selection
2. **RegistrationStepper**: Multi-step form navigation
3. **Step Components**:
   - AccountStep: Personal information
   - OtpStep: Email verification
   - TncStep: Terms and conditions

See `nexa_react/docs/registration_architecture_doc.md` for detailed documentation.

### Adding a New Feature

1. **Backend**:
   ```bash
   # Create model
   touch nexa_express/src/models/[role].models/newFeature.model.js
   
   # Create controller
   touch nexa_express/src/controllers/[role].controllers/newFeature.controller.js
   
   # Create service
   touch nexa_express/src/services/[role].services/newFeature.service.js
   
   # Add routes
   # Edit nexa_express/src/routes/[role].routes/
   ```

2. **Frontend**:
   ```bash
   # Create component
   touch nexa_react/src/components/[role].components/NewFeature.jsx
   
   # Create API integration
   touch nexa_react/src/apis/[role].apis/newFeature.api.js
   
   # Add Redux slice (if needed)
   touch nexa_react/src/redux/[role].redux/newFeatureSlice.js
   ```

### Environment-Specific Behavior

```javascript
// Backend
if (process.env.NODE_ENV === 'production') {
  // Production-specific code
}

// Frontend (Vite)
if (import.meta.env.MODE === 'production') {
  // Production-specific code
}
```

## 🧪 Testing

### Backend Tests

```bash
cd nexa_express
npm test
```

Test files are organized by role in `nexa_express/tests/`:
- `admin_tests/`
- `donor_tests/`
- `institution_tests/`
- `student_services/`
- `tutor_services/`

### Frontend Tests

```bash
cd nexa_react
npm test
```

### Test Coverage

```bash
# Backend
cd nexa_express
npm run test:coverage

# Frontend
cd nexa_react
npm run test:coverage
```

## 🤝 Contributing

We welcome contributions to Nexa! Please follow these guidelines:

### Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/nexa.git
   cd nexa
   ```
3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Workflow

1. **Make your changes**
   - Follow the existing code structure
   - Write clean, documented code
   - Add tests for new features

2. **Test your changes**
   ```bash
   npm test
   ```

3. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```
   
   Follow [Conventional Commits](https://www.conventionalcommits.org/) format:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting)
   - `refactor:` Code refactoring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

4. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Select your feature branch
   - Provide a clear description of your changes

### Code Style

- **JavaScript/JSX**: Follow ESLint rules
- **Indentation**: 2 spaces
- **Naming**: camelCase for variables, PascalCase for components
- **Comments**: Write clear, concise comments for complex logic

### Pull Request Guidelines

- Ensure all tests pass
- Update documentation if needed
- Keep PRs focused on a single feature/fix
- Link related issues in the PR description

## � Team

**Project Lead**: [Sadeesha Sathsara](https://github.com/sadeeshasathsara)

### Contributors

- **Sadeesha Sathsara** - [@sadeeshasathsara](https://github.com/sadeeshasathsara) - Project Lead & Full Stack Developer
- **Eric Devon** - [@Eric-Devon](https://github.com/Eric-Devon) - Full Stack Developer
- **Ehara Perera** - [@EHARAPERERA](https://github.com/EHARAPERERA) - Full Stack Developer
- **Vageesha Udawatta** - [@vageeshau](https://github.com/vageeshau) - Full Stack Developer

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who help make Nexa better
- Inspired by the mission to bridge educational gaps
- Built with modern web technologies and best practices

---

<p align="center">Made with ❤️ by the Nexa Team</p>
