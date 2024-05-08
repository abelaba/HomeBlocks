const router = require('express').Router();
const { User } = require('../model/User');
const Message = require('../model/Message');
const Rental = require('../model/Rental');
const Chatroom = require('../model/Chatroom');

const verify = require('../verifyToken');

router.post('/createChat', verify, async (req, res) => {
  try {
    // * Check if property and users exist
    const rental = await Rental.findById(req.body.propertyId);
    if (!rental) {
      return res.status(404).send('Rental not Found');
    }
    const user1 = await User.findOne({ _id: req.user._id });
    if (!user1) {
      return res.status(404).send('User not Found');
    }

    const user2 = await User.findOne({ _id: req.body.user2Id });
    if (!user2) {
      return res.status(404).send('User not Found');
    }

    // * Check if chatroom already exists
    const existingChatroom = await Chatroom.findOne({
      propertyId: rental._id,
      propertyIdOnBlockChain: rental.propertyIdOnBlockChain,
      users: { $all: [user1, user2] },
    });
    if (existingChatroom) {
      return res.status(200).send({ chatRoom: existingChatroom._id });
    }

    // * Create a new chatroom
    const chatRoom = new Chatroom({
      propertyId: rental._id,
      propertyIdOnBlockChain: rental.propertyIdOnBlockChain,
      users: [user1, user2],
    });
    await chatRoom.save();
    return res.status(201).send({ chatRoom: chatRoom._id });
  } catch (err) {
    return res.status(400).send(err);
  }
});

router.get('/loadChats', verify, async (req, res) => {
  try {
    const chats = await Chatroom.find({
      users: {
        $elemMatch: { _id: req.user._id },
      },
    });
    return res.status(200).send(chats);
  } catch (error) {
    return res.status(500).send('Server error');
  }
});

router.get('/loadMessages/:id', verify, async (req, res) => {
  try {
    const chat = await Chatroom.findById(req.params.id);
    return res.status(200).send(chat);
  } catch (error) {
    return res.status(500).send('Server error');
  }
});

router.put('/sendMessage', verify, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res.status(404).send('User not Found');
    }

    const chat = await Chatroom.findOne({ _id: req.body.chatId });
    if (!chat) {
      return res.status(404).send('Chat not Found');
    }
    const message = new Message({
      senderId: req.user._id,
      message: req.body.message,
      messageType: req.body.messageType,
    });
    await Chatroom.findByIdAndUpdate(chat._id, {
      $push: { messages: message },
    });
    return res.status(201).send(chat);
  } catch (error) {
    return res.status(500).send('Server error');
  }
});

module.exports = router;
