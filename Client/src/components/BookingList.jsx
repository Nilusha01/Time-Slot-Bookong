function BookingList({ bookings }) {
  return (
  <div className="booking-list">
    <h2>Bookings</h2>

    {bookings.length === 0 && <p className="empty-state">No bookings yet.</p>}

    {bookings.length > 0 && (
      <ul className="booking-items">
        {bookings.map((booking) => (
          <li className="booking-card" key={booking._id}>
            <strong>{booking.date}</strong> — {booking.timeSlot} — {booking.category}
            <br />
            Booked by: {booking.name}
            {booking.note && <p className="booking-note">Note: {booking.note}</p>}
          </li>
        ))}
      </ul>
    )}
  </div>
);
}

export default BookingList;