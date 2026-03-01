###MERN Task Management System

The project has been fully built out according to the requested specifications, secure Express/MongoDB backend and a React/Vite frontend.

##Features Implemented
1. Robust Backend Architecture
- Mongoose & MongoDB Atlas: Connected securely using standard production models (User and Task).
- Advanced Authentication:
    JWT Access Tokens (15m expiry).
    JWT Refresh Tokens (7d expiry) via HttpOnly cookies for secure session rotation without forcing frequent logouts.
    Passwords hashed using bcryptjs.
- Role-Based Access Control (RBAC): Middleware (protect, authorizeRoles) secures endpoints so regular users can only interact with their own tasks, while admin users can query the entire dataset.
2. Frontend Interface
Tech Stack: Vite, React Router DOM, Axios, Tailwind CSS, and Shadcn UI principles. (Configured dynamically with custom @tailwindcss/postcss integration for Vite v5/Tailwind v4 compatibility).
- Rich Aesthetics:
Glassmorphism effects on the Navbar (backdrop-blur-md, bg-card/80).
Dark Mode by default following standard Shadcn styling conventions (bg-background, text-foreground).
Interactive micro-animations (hover:scale-105, transition-all on cards and buttons).
- Core Pages Built:
Login.jsx & Register.jsx: Clean centralized forms with error handling and role-selection.
Dashboard.jsx: Conditional rendering grid layout showing either 'Your Tasks' or 'All Workspace Tasks' based on the user's role.
AdminAnalyticsPanel.jsx: Visual top-level statistics components explicitly built for administrators.
- Automated Token Management: Axios instance with interceptors automatically attaches the Authorization header and handles silent token refreshes via the /api/auth/refresh endpoint on 401 Unauthorized errors.

##Verification Run
- Server Startup: Successfully booted both Express APIs on port 5000 and Vite dev server on port 5173.
- API Communication: Checked that both servers respond successfully (HTTP 200).
- Database Connection: Validated that MongoDB connected to the Atlas instance accurately based on the .env settings.

##TIP
Getting Started
- Open your terminal to the project root: cd MTM
- Run npm start. This uses concurrently to spin up both the Vite frontend and the Express backend simultaneously, working on both Windows and Linux.
- Go to http://localhost:5173.
- Register a new user as an "admin" through the signup form to see the analytics panel, or as a "user" to see the standard view.
