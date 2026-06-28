# Installation Guide

This guide explains how to install and run OPTrack locally.

[![Back to README](https://img.shields.io/badge/Back%20to-README-blue?style=for-the-badge)](README.md)



## Prerequisites

Make sure you have the following installed:

* Python 3.11+
* Node.js 18+
* npm
* Git
* PostgreSQL database URL, Supabase PostgreSQL URL, or any PostgreSQL-compatible database

## 1. Clone the Repository

```bash
git clone https://github.com/Verkan39/OPTrack.git
cd OPTrack
```

## 2. Backend Setup

Move into the backend folder:

```bash
cd backend
```

Create a virtual environment:

```bash
python3 -m venv venv
```

Activate it:

```bash
source venv/bin/activate
```

Install backend dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the `backend/` folder:

```env
SECRET_KEY=your-local-secret-key
DEBUG=True
DATABASE_URL=your-database-url

ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173
CSRF_TRUSTED_ORIGINS=http://localhost:5173

SESSION_COOKIE_SAMESITE=Lax
CSRF_COOKIE_SAMESITE=Lax
SESSION_COOKIE_SECURE=False
CSRF_COOKIE_SECURE=False
```

Run migrations:

```bash
python manage.py migrate
```

Create an admin user:

```bash
python manage.py createsuperuser
```

Start the backend server:

```bash
python manage.py runserver
```

The backend will run at:

```txt
http://localhost:8000
```

## 3. Frontend Setup

Open a new terminal from the project root and move into the frontend folder:

```bash
cd frontend
```

Install frontend dependencies:

```bash
npm install
```

Create a `.env` file inside the `frontend/` folder:

```env
VITE_API_BASE_URL=http://localhost:8000
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run at:

```txt
http://localhost:5173
```

## 4. Running the App

Keep both servers running:

Backend:

```bash
cd backend
source venv/bin/activate
python manage.py runserver
```

Frontend:

```bash
cd frontend
npm run dev
```

Then open:

```txt
http://localhost:5173
```

## 5. Useful Commands

Run backend checks:

```bash
python manage.py check
python manage.py test
```

Run frontend build:

```bash
npm run build
```

Run frontend lint:

```bash
npm run lint
```

## 6. Notes

* Do not commit `.env` files.
* Do not commit `venv/`.
* Do not commit `staticfiles/`.
* The frontend should communicate only with the Django backend API.
* The database should be accessed through Django, not directly from the frontend.
