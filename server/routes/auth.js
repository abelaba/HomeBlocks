const router = require("express").Router();
const { User } = require("../model/User");
const { registervalidation, loginValidation } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verify = require("../verifyToken");

// * REGISTER
router.post("/register", async (req, res) => {
  // *LETS VALIDATE THE DATA
  const { error } = registervalidation(req.body);
  if (error) {
    console.log("Signup validation error");
    return res.status(400).send(error.details[0].message);
  }

  // * CHECK IF EMAIL EXISTS
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send("Email already exists");

  // const etherAccountExist = await User.findOne({ etherAccount: req.body.etherAccount });
  // if (etherAccountExist) return res.status(400).send("EtherAccount already exists");

  // * Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // * Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
    etherAccount: req.body.etherAccount,
  });
  try {
    const savedUser = await user.save();
    res.status(201).send({ user: user._id });
    console.log("Signed Up");
  } catch (err) {
    res.status(400).send(err);
    console.log(err);
  }
});

// * LOGIN
router.post("/login", async (req, res) => {
  // * VALIDATE INPUT
  const { error } = loginValidation(req.body);
  if (error) {
    console.log(`Error ${error}`);
    return res.status(400).send(error.details[0].message);
  }

  // * CHECK IF EMAIL EXISTS
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    console.log("Email or password is wrong.");
    return res.status(400).send("Email or password is wrong.");
  }

  //* CHECK IF PASSWORD IS CORRECT
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Email or password is wrong.");
  }

  // * CREATE AND ASSIGN TOKEN
  // const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  const token = jwt.sign({ _id: user._id }, "secret");
  res.header("auth-token", token).send(token);
  console.log("Logged in");
});

// * UPDATE ACCOUNT
router.put("/updateAccount", verify, async (req, res) => {
  // *LETS VALIDATE THE DATA
  const user = await User.findOne({ _id: req.user });
  if (user) {
    const { error } = registervalidation(req.body);
    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = hashPassword;
    user.phoneNumber = req.body.phoneNumber;

    try {
      const savedUser = await user.save();
      res.send({ user: user._id });
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    res.status(404).send("User not found");
  }
});

// * DELETE ACCOUNT
router.delete("/deleteAccount", verify, async (req, res) => {
  // * LETS VALIDATE THE DATA
  const user = await User.findOne({ _id: req.user });
  if (user) {
    try {
      const removedUser = await user.remove();
      res.status(204).send({ user: removedUser });
    } catch (err) {
      res.status(400).send(err);
    }
  } else {
    res.status(404).send("User not found");
  }
});

module.exports = router;
