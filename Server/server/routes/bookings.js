const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// GET all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: 1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new booking
router.post('/', async (req, res) => {
  try {
    const { name, date, timeSlot, category, note } = req.body;

    if (!name || !date || !timeSlot || !category) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check for duplicate/overlapping booking
    const existing = await Booking.findOne({ date, timeSlot });
    if (existing) {
      return res.status(409).json({ message: 'This time slot is already booked' });
    }

    const booking = new Booking({ name, date, timeSlot, category, note });
    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE a booking (optional feature)
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;