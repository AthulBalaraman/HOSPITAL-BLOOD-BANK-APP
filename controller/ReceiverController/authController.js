const bcrypt = require("bcrypt");
const Receiver = require("../../model/Receiver");


const showRegisterPage =  (req, res) => {
  try {
    res.status(200).json({ message: "This is receiver register page" });
  } catch (error) {
    res.status(404).json(error);
  }
};

const registerReceiver = async (req, res) => {
  try {
    const { name, username, phoneNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newReceiver = new Receiver({
      name,
      username,
      phoneNumber,
      password: hashedPassword,
    });
    const receiver = await newReceiver.save();

    res.status(200).json({ message: "Receiver registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const showLoginPage = (req, res) => {
  try {
    res.status(200).json({ message: "This is receiver login page" });
  } catch (error) {
    res.status(404).json(error);
  }
};

const receiverLogin =  async (req, res) => {
  try {
    const { username, password } = req.body;
    const receiverDetails = await Receiver.findOne({ username: username });
    !receiverDetails && res.status(404).json({ message: "Username incorrect" });
    const validPassword = await bcrypt.compare(
      password,
      receiverDetails.password
    );
    !validPassword && res.status(404).json({ message: "Password incorrect" });
    res
      .status(200)
      .json({
        message: "Receiver login successfull",
        receiverDetails: receiverDetails,
      });
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  showLoginPage,
  showRegisterPage,
  registerReceiver,
  receiverLogin
}