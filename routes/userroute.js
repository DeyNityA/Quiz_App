const express = require("express");
const router = new express.Router();
const User = require("../db/model/user");
const Result = require("../db/model/result");
const { createToken } = require("../service/auth");
const { getUser } = require("../service/auth");

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const emailCheck = await User.findOne({ email: email });
    if (emailCheck) {
      return res
        .status(400)
        .json({ message: "Email already exists", status: false });
    }

    const user = await User.create({ name, email, password });
    return res.status(200).json({ status: true });
  } catch (err) {
    if (err) {
      return res.json({ status: false, message: "Internal server error" });
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const token = await createToken(user);
    return res.json({ status: true, token: token, user: user });
  } catch (err) {
    if (err) {
      return res.json({ status: false, msg: "Internal server error" });
    }
  }
});

router.post("/userauth", async (req, res) => {
  try {
    const { token } = req.body;
    if (!token) return res.send({ status: false });
    const user = await getUser(token);
    if (!user) return res.send({ status: false });
    const dbuser = await User.findOne({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
    if (!dbuser) return res.send({ status: false });
    return res.send({ status: true, user: user });
  } catch (err) {
    if (err) {
      return res.json({ status: false, msg: "Internal server error" });
    }
  }
});

router.post("/saveResult", async (req, res) => {
  try {
    const { id, attempted, correct } = req.body;
    const result = await Result.create({
      id,
      attempted,
      correct,
      attempt_time: Date.now(),
    });
    return res.status(200).json({ status: true });
  } catch (err) {
    if (err) {
      return res.json({ status: false, msg: "Internal server error" });
    }
  }
});
router.post("/getResult", async (req, res) => {
  try {
    const { id } = req.body;
    const result = await Result.find({
      id
    }).sort({"createdAt":-1})
    return res.status(200).json({ status: true,results:result });
  } catch (err) {
    if (err) {
      return res.json({ status: false, msg: "Internal server error" });
    }
  }
});

module.exports = router;
