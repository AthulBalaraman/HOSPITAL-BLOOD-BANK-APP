const bcrypt = require("bcrypt");
const Receiver = require("../../model/Receiver");

const registerReceiver = async (req, res) => {
  try {
    const { name, username, phoneNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); // ENCRYPTING THE PASSWORD

    const newReceiver = new Receiver({
      name,
      username,
      phoneNumber,
      password: hashedPassword,
    });
    const receiver = await newReceiver.save(); // RECEIVER REGISTERED

    res.status(200).json({ message: "Receiver registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const receiverLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const receiverDetails = await Receiver.findOne({ username: username });
    if(!receiverDetails){ 
      res.status(500).json({ message: "Username incorrect" });
    }else{
      const validPassword = await bcrypt.compare(
        password,
        receiverDetails.password
      );
      if(!validPassword){
        res.status(404).json({ message: "Password incorrect" });
      }else{
        res.status(200).json({
          message: "Receiver login successfull",
          receiverDetails: receiverDetails,
        }); // Receiver logged in 
      }
    }
    
  } catch (error) {
    console.log("reached error")
    res.status(500).json(error);
  }
};

module.exports = {
  registerReceiver,
  receiverLogin,
};
