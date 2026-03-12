# Internship Application Tracker

A full-stack web application that helps users track internship applications, manage statuses, and visualize job search progress through an interactive dashboard.

## Features

* Add and manage internship applications
* Update application status (Applied, Interview, Offer, Rejected)
* Delete applications
* Search by company or position
* Filter by application status
* Dashboard statistics for application progress
* Application deadline tracking
* Visual status indicators

## Tech Stack

Frontend:

* React
* Axios
* JavaScript

Backend:

* Flask (Python)
* REST API
* SQLAlchemy ORM

Database:

* SQLite

## Architecture

React frontend communicates with a Flask backend through REST APIs.
The backend processes requests and stores application data in a SQLite database.

Frontend → Axios → Flask API → SQLAlchemy → SQLite

## Screenshots

### Dashboard

<img width="917" height="162" alt="Screenshot 2026-03-12 at 1 08 04 PM" src="https://github.com/user-attachments/assets/454464a8-8ae8-496d-a351-984b08517850" />


### Add Application

<img width="805" height="123" alt="Screenshot 2026-03-12 at 1 07 52 PM" src="https://github.com/user-attachments/assets/75856dfc-dcb8-4553-ab9b-b2862424dcc5" />


### Application List

<img width="931" height="408" alt="Screenshot 2026-03-12 at 1 08 10 PM" src="https://github.com/user-attachments/assets/831b1997-ccba-43cd-9461-68359b2cf067" />


## Running the Project

### Backend

```
cd backend
source venv/bin/activate
python3 app.py
```

### Frontend

```
cd frontend
npm install
npm start
```

## Future Improvements

* User authentication
* Cloud deployment
* Email reminders for deadlines
* Application notes & attachments
