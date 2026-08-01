# Time-Slot-Bookong# Time Slot Booking App

A simple web application to book available time slots, with duplicate/overlap prevention. Built as part of the Rotaract Club of University of Moratuwa IT Team Recruitment task.

## Live Demo
- Frontend: https://time-slot-bookong.vercel.app <!-- replace with your actual Vercel URL -->
- Backend API: https://time-slot-bookong.onrender.com <!-- replace with your actual Render URL -->

> Note: The backend is hosted on Render's free tier, which spins down after inactivity. The first request after idle time may take 30–50 seconds to respond while the server wakes up.

## Tech Stack
- **Frontend:** React (Vite)
- **Backend:** Node.js, Express
- **Database:** MongoDB Atlas (via Mongoose)
- **Deployment:** Vercel (frontend), Render (backend)

## Features
- Book a time slot with name, date, time slot, category, and note
- Prevents duplicate bookings for the same date + time slot (checked on the backend before saving)
- View all existing bookings in a live-updating list
- Responsive, styled interface with clear error feedback on booking conflicts

### Optional Features
<!-- Update this list based on what you actually built, e.g.: -->
- [ ] Filter bookings by date, time, category, or priority
- [ ] Simple calendar view
- [ ] Edit or delete a booking

## How Duplicate Prevention Works
Time slots are selected from a fixed dropdown list rather than free-typed, so overlap checking simplifies to an exact match check. Before saving a new booking, the backend queries the database for an existing booking with the same `date` and `timeSlot`. If one exists, the request is rejected with a `409 Conflict` response and a message explaining the slot is already booked. The frontend displays this message directly on the form.

## Setup Instructions (Local Development)

### Prerequisites
- Node.js installed
- A MongoDB Atlas account with a cluster set up (or any MongoDB connection string)

### Backend
```bash
cd Server/server
npm install
```
Create a `.env` file inside `Server/server/` with:
```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```
Run the server:
```bash
npm run dev
```
The API will be available at `http://localhost:5000`.

### Frontend
```bash
cd Client
npm install
```
Open `src/api.js` and set `API_URL` to point to your local backend for development:
```javascript
const API_URL = 'http://localhost:5000/api/bookings';
```
Run the frontend:
```bash
npm run dev
```
Vite will print a local URL (typically `http://localhost:5173`) — open that in your browser.

> Both the backend and frontend need to be running at the same time for the app to work locally.

## Project Structure
```
/Server/server   - Express API: server.js, routes, models, MongoDB connection config
/Client          - React frontend (Vite): components, api.js, styling
```

## API Endpoints
| Method | Endpoint            | Description                          |
|--------|----------------------|---------------------------------------|
| GET    | /api/bookings         | Fetch all bookings                    |
| POST   | /api/bookings         | Create a new booking (rejects duplicates with 409) |
| DELETE | /api/bookings/:id     | Delete a booking by ID                |

## Demo Data
The deployed database includes 5+ demo booking records, added through the live application form to confirm the full frontend → backend → database flow works end to end in production.
