const express = require('express');
const { bookEvent, cancelBooking } = require('../controllers/bookingController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/:eventId/book', protect, bookEvent);
router.delete('/:eventId/cancel', protect, cancelBooking);

module.exports = router;