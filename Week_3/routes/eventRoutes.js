const express = require('express');
const {
  createEvent, getEvents, updateEvent, deleteEvent
} = require('../controllers/eventController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getEvents)
  .post(protect, adminOnly, createEvent);

router.route('/:id')
  .put(protect, adminOnly, updateEvent)
  .delete(protect, adminOnly, deleteEvent);

module.exports = router;