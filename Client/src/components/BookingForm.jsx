import { useState } from 'react';
import { createBooking } from '../api';

const TIME_SLOTS = [
  '8:00 AM - 8:30 AM',
  '8:30 AM - 9:00 AM',
  '9:00 AM - 9:30 AM',
  '9:30 AM - 10:00 AM',
  '10:00 AM - 10:30 AM',
  '10:30 AM - 11:00 AM',
  '11:00 AM - 11:30 AM',
  '11:30 AM - 12:00 PM',
  '12:00 PM - 12:30 PM',
  '12:30 PM - 1:00 PM',
  '1:00 PM - 1:30 PM',
  '1:30 PM - 2:00 PM',
  '2:00 PM - 2:30 PM',
  '2:30 PM - 3:00 PM',
  '3:00 PM - 3:30 PM',
  '3:30 PM - 4:00 PM',
];

const CATEGORIES = ['Meeting', 'Interview', 'Discussion', 'Important Meeting', 'Consultation'];

function BookingForm({ onBookingCreated }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !date || !timeSlot || !category) {
      setError('Please fill in all required fields');
      return;
    }

    const bookingData = { name, date, timeSlot, category, note };

    try {
      setSubmitting(true);
      setError('');

      await createBooking(bookingData);

      setName('');
      setDate('');
      setTimeSlot('');
      setCategory('');
      setNote('');

      onBookingCreated();
    } catch (err) {
      if (err.response?.status === 409) {
        setError(err.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
  <form className="booking-form" onSubmit={handleSubmit}>
    <input
      className="form-input"
      type="text"
      placeholder="Your name"
      value={name}
      onChange={(e) => setName(e.target.value)}
      required
    />

    <input
      className="form-input"
      type="date"
      value={date}
      onChange={(e) => setDate(e.target.value)}
      required
    />

    <select
      className="form-input"
      value={timeSlot}
      onChange={(e) => setTimeSlot(e.target.value)}
      required
    >
      <option value="">Select a time slot</option>
      {TIME_SLOTS.map((slot) => (
        <option key={slot} value={slot}>
          {slot}
        </option>
      ))}
    </select>

    <select
      className="form-input"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      required
    >
      <option value="">Select a category</option>
      {CATEGORIES.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>

    <textarea
      className="form-input"
      placeholder="Short note (optional)"
      value={note}
      onChange={(e) => setNote(e.target.value)}
    />

    {error && <p className="form-error">{error}</p>}

    <button className="submit-btn" type="submit" disabled={submitting}>
      {submitting ? 'Booking...' : 'Book Slot'}
    </button>
  </form>
);}

export default BookingForm;