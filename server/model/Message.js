const mongoose = require('mongoose');

// * USER SCHEMA

const messageSchema = new mongoose.Schema({
  senderId: {
    type: String,
    required: 'senderId is required',
  },
  message: {
    type: String,
    required: 'Message is required',
  },
  messageType: {
    type: String,
    enum: ['MESSAGE', 'TRANSACTION'],
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Message', messageSchema);
