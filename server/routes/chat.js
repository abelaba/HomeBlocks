const router = require('express').Router()
const {User} = require('../model/User');
const Message = require('../model/Message');
const Rental = require('../model/Rental');
const Chatroom = require('../model/Chatroom');

const verify = require('../verifyToken')


router.post('/createChat',verify,async (req,res)=>{
    console.log("create called");

    console.log(req.body.propertyIdOnBlockChain );

    const rental = await Rental.findOne({ propertyIdOnBlockChain: req.body.propertyIdOnBlockChain });
    if(!rental) return res.status(404).send("Rental not Found");
    console.log(rental);
    const user1 = await User.findOne({ _id: req.user._id });
    if(!user1) return res.status(404).send("User not Found");
    console.log(user1);

    const user2 = await User.findOne({ _id: req.body.user2Id});
    if(!user2) return res.status(404).send("User not Found");
    console.log(user2);
    // * Create a new user
    const chatRoom = new Chatroom({
        propertyIdOnBlockChain: req.body.propertyIdOnBlockChain,
        users:[
            user1,user2
        ]
    });
    try {
        const char = await chatRoom.save();
        // var query = await User.findByIdAndUpdate(user1._id,
        //     { "$push": { "mychats": chatRoom._id} }
        // );
        // var query2 = await User.findByIdAndUpdate(user2._id,
        //     { "$push": { "mychats": chatRoom._id} }
        // );
        res.status(201).send({ chatRoom: chatRoom._id });
        console.log("Room created");
    } catch (err) {
        res.status(400).send(err);
        console.log(err); 

    }
});

router.get('/loadChats',verify,async(req,res)=>{
    console.log("Load called");
    // const chats = await Chatroom.find({$or:[{user._id: req.user._id},{user2Id:req.user._id}]});
    const chats = await Chatroom.find({ 
        users: { 
           $elemMatch: { _id: req.user._id } 
        }
     });
    console.log(chats);
    res.send(chats);

});


router.get('/loadMessages/:id',verify,async(req,res)=>{
    console.log("LoadMessages");
    console.log(req.params.id);
    
    const chat = await Chatroom.findById(req.params.id);
    // const rental = await Rental.findOne({ _id: chat.rental });
    res.send(chat);

});


router.put('/sendMessage',verify,async(req,res)=>{

    console.log(req.user._id);
    const user = await User.findOne({ _id: req.user._id });
    if(!user) return res.status(404).send("User not Found");
    
    const chat = await Chatroom.findOne({ _id: req.body.chatId });
    if(!chat) return res.status(404).send("Chat not Found");
    var message = new Message({
        senderId : req.user._id,
        message: req.body.message,
        messageType: req.body.messageType
    });
    var query = await Chatroom.findByIdAndUpdate(chat._id,
        { "$push": { "messages": message}});
    console.log(query);
    res.status(201).send(chat);

});




module.exports = router;