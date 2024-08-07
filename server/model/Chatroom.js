const mongoose = require('mongoose');
const { userSchema } = require('./User');

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
// * CHATROOM SCHEMA

const chatRoomSchema = new mongoose.Schema({
  propertyId: {},
  propertyIdOnBlockChain: {
    type: Number,
  },
  users: {
    type: [userSchema],
  },
  messages: {
    type: [messageSchema],
  },
});

module.exports = mongoose.model('Chatroom', chatRoomSchema);
