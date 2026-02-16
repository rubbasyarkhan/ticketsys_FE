# Ticketing System - Admin Dashboard

A production-grade React admin dashboard for a ticketing system, built with Vite, TailwindCSS, and Axios.

## 🚀 Features

- **Authentication System**: Secure login with JWT, protected routes, and role-based access (Admin/Agent).
- **Interactive Dashboard**: Real-time stats, recent activity, and performance trends.
- **Advanced Ticket Management**: Search, filter, and paginated list view of all tickets.
- **Conversational Ticket View**: Chat-style UI for customer interactions with internal notes support.
- **Agent Analytics**: Detailed performance metrics and efficiency tracking for administrators.

## 🛠 Tech Stack

- **Framework**: React 18 (Vite)
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **State Management**: React Context API
- **HTTP Client**: Axios with interceptors
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📦 Getting Started

### 1. Installation

```bash
cd frontend
npm install
```

### 2. Configuration

Update the `.env` file if your backend is running on a different port:

```env
VITE_API_URL=http://localhost:5050/api
```

### 3. Development

```bash
npm run dev
```

### 4. Build

```bash
npm run build
```

## 📂 Folder Structure

- `src/api/`: Axios configuration and interceptors.
- `src/components/`: Reusable UI components.
- `src/context/`: Auth state management.
- `src/hooks/`: Custom hooks for Auth.
- `src/layouts/`: Main application shells.
- `src/pages/`: Page-level components.
- `src/utils/`: Helper functions.

## 🛡 Security

- Routes are protected by `ProtectedRoute`.
- Unauthorized 401 responses trigger auto-logout.
- Admin pages are restricted via role checks.
- Sensitive actions (like assigning agents) are restricted to admin users.
