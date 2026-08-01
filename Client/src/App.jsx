import { useState, useEffect } from 'react';
import BookingForm from './components/BookingForm';
import BookingList from './components/BookingList';
import { getBookings } from './api';
import './App.css';

function App() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await getBookings();
      setBookings(response.data);
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    }
  };
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="app-container">
      <h1>Time Slot Booking</h1>
      <BookingForm onBookingCreated={fetchBookings} />
      <BookingList bookings={bookings} />
    </div>
  );
}

export default App;