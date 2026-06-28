# OPTrack

OPTrack is a full-stack internship and job application tracker built for students and early-career developers. It helps users manage applications across platforms like LinkedIn, WellFound, Internshala, referrals, and company career pages from one clean dashboard.

**Live App:** https://op-track-vert.vercel.app/

[![Installation Guide](https://img.shields.io/badge/Installation%20Guide-Open-blue?style=for-the-badge)](INSTALLATION.md)


## Motivation

Applying across multiple platforms can quickly become difficult to manage. OPTrack was built to solve that problem by giving students a simple, focused, and production-ready tool to track every opportunity, deadline, status, and note in one place.

## Features

* User signup, login, and logout with Django session authentication
* Protected dashboard and app routes
* Add, edit, delete, and update job/internship applications
* Track application status, platform, deadline, salary, links, notes, and follow-ups
* Dashboard overview with real user-specific data
* Analytics page for application insights
* Profile page with backend persistence
* Settings and Support pages
* Deployed frontend and backend with production-ready API configuration

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router

**Backend:** Django, Django REST Framework, PostgreSQL

**Deployment:** Vercel, Render, Supabase PostgreSQL

## Security Notes

* Frontend communicates only with the Django backend API
* Supabase/PostgreSQL is used only behind Django and is not accessed directly from the frontend
* Django session authentication is used
* CSRF protection is handled for cross-domain frontend/backend communication
* User data is protected through authenticated, user-specific API routes
* Secret keys and environment variables are not committed to GitHub

## Future Improvements

* Email reminders for deadlines and follow-ups
* Calendar integration
* Resume version tracking
* Import/export application data
* Browser extension for quickly saving applications
* Real notification system backed by backend data
* More advanced analytics and filtering

## Author

Built by [Vedanshu Meharia](https://github.com/Verkan39)
