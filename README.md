# Employee Hierarchy Management - Frontend

A modern Next.js application for managing employee hierarchies with authentication and a clean, intuitive interface.

## Features

- 🔐 **Authentication**: Secure login/register functionality with JWT tokens
- 👥 **Employee Management**: Create, read, update, and delete employees
- 🌳 **Hierarchy Visualization**: Interactive tree view of organizational structure
- 🎨 **Modern UI**: Clean interface built with Tailwind CSS
- ⚡ **Performance**: Optimized with Next.js 14 App Router
- 🔒 **Route Protection**: Authentication guards for secure access
- 📊 **Real-time Updates**: Instant UI updates with optimistic rendering
- 🎯 **TypeScript**: Fully typed for better developer experience

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Material UI for components
- **State Management**: React Context API + Custom Hooks
- **HTTP Client**: Fetch API with custom wrapper
- **Icons**: Lucide React
- **Notifications**: Material UI snackbar
- **Authentication**: JWT with localStorage
- **Forms**: Native HTML5 with TypeScript & React-hook-form

## Project Structure

```
employee-hierarchy-frontend/
├── public/                          # Static assets
├── src/
│   ├── app/                        # Next.js App Router pages
│   │   ├── auth/                   # Authentication pages
│   │   │   ├── login/
│   │   │       └── page.tsx        # Login page
│   │   ├── main/                   # Protected main routes
│   │   │   ├── employees/          # Employee management
│   │   │   │   ├── [id]/
│   │   │   │   │   └── page.tsx    # Employee detail view and edit
│   │   │   │   ├── create/
│   │   │   │   │   └── page.tsx    # Create employee form
│   │   │   │   ├── list/
│   │   │   │   │   └── page.tsx    # Employee list view
│   │   │   ├── layout.tsx          # Dashboard layout with sidebar
│   │   │   └── page.tsx            # Dashboard home - to show hi
│   │   ├── globals.css             # Global styles and Tailwind imports
│   │   ├── layout.tsx              # Root layout with providers
│   │   └── page.tsx                # Landing page with redirects
│   ├── components/                 # Reusable React components
│   │   ├── auth/                   # Authentication components
│   │   │   ├── AuthGuard.tsx       # Route protection wrapper
│   │   │   ├── LoginForm.tsx       # Login form component
│   │   ├── employees/              # Employee-related components
│   │   │   ├── EmployeeRow.tsx    # Employee display card
│   │   │   ├── EmployeeForm.tsx    # Employee creation/edit form
│   │   │   ├── EmployeeUpdateModal.tsx    # Confirmation modal to show the updates of employee
│   │   │   └── Profile.tsx         # Profile image (Avatar)
│   │   ├── layout/                 # Layout components
│   │   │   ├── Header.tsx          # Main header with user info
│   │   │   └── Sidebar.tsx         # Dashboard sidebar navigation
│   ├── contexts/                   # React Context providers
│   │   └── AuthContext.tsx         # Authentication state management
│   ├── hooks/                      # Custom React hooks
│   │   ├── useEmployees.ts         # Employee data management hook
│   ├── lib/                        # Utility libraries
│   │   ├── api.ts                  # HTTP client with error handling
│   │   ├── auth.ts                 # Authentication service
│   │   └── utils.ts                # Common utility functions
│   ├── types/                      # TypeScript type definitions
│   │   ├── auth.ts                 # Authentication types
│   │   ├── employee.ts             # Employee data types
│   │   └── api.ts                  # API response types
│   └── middleware.ts               # Next.js middleware for auth
├── .env.local                      # Environment variables
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore rules
├── eslint.config.js               # ESLint configuration
├── next.config.js                 # Next.js configuration
├── package.json                   # Dependencies and scripts
├── postcss.config.js              # PostCSS configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
└── README.md                      # Project documentation
```

## Getting Started

### Prerequisites

- **Node.js** 18.0 or later
- **npm**, **yarn**, or **pnpm** package manager
- **Backend API** running (typically on `https://localhost:5111`)

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd employee-hierarchy-frontend
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables:**
```bash
cp .env.example .env.local
```

Edit `.env.local` and configure your API URL:
```env
NEXT_PUBLIC_API_HOST=http://localhost:5111
NEXT_PUBLIC_API_BASE_URL=/api

NEXT_PUBLIC_HEADER_AUTHORIZATION_KEY=Authorization

NEXT_PUBLIC_LOCALSTORAGE_USER_KEY=user

```

4. **Run the development server:**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

### Building for Production

```bash
# Build the application
npm run build

# Start the production server
npm run start
```

## API Integration

The frontend expects the backend API to provide the following endpoints:

### Authentication Endpoints
- `POST /api/auth/login` - User login

### Employee Endpoints
- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee
