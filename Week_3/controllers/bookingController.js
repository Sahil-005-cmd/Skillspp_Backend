const Booking = require('../models/Booking');
const Event = require('../models/Event');

exports.bookEvent = async (req, res) => {
  const event = await Event.findById(req.params.eventId);
  if (!event) return res.status(404).json({ message: 'Event not found' });

  if (event.bookings.length >= event.capacity)
    return res.status(400).json({ message: 'Event is fully booked' });

  const booking = await Booking.create({ user: req.user._id, event: event._id });
  event.bookings.push(booking._id);
  await event.save();

  res.status(201).json(booking);
};

exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findOneAndDelete({
    user: req.user._id,
    event: req.params.eventId
  });

  if (!booking) return res.status(404).json({ message: 'Booking not found' });

  await Event.findByIdAndUpdate(req.params.eventId, {
    $pull: { bookings: booking._id }
  });

  res.json({ message: 'Booking cancelled' });
};