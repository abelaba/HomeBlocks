const mongoose = require('mongoose');

// * USER SCHEMA

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 4,
    max: 255,
  },
  email: {
    type: String,
    required: true,
    max: 255,
    min: 6,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 8,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  etherAccount: {
    type: String,
    required: true,
  },
});

module.exports = {
  User: mongoose.model('User', userSchema),
  userSchema: userSchema,
};
