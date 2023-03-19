const bcrypt = require("bcrypt");
const Hospital = require("../../model/Hospital");


const registerHospital = async (req, res) => {
  try {
    const { hospitalName, address, email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newHospital = new Hospital({
      hospitalName,
      address,
      email,
      username,
      password: hashedPassword,
    });
    const hospital = await newHospital.save();
    res.status(200).json({ message: "Hospital registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



const hospitalLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hospitalDetails = await Hospital.findOne({ username: username });
    if (!hospitalDetails) {
      res.status(404).json({ message: "Username incorrect" });
    } else {
      const validPassword = await bcrypt.compare(
        password,
        hospitalDetails.password
      );
      if (!validPassword) {
        res.status(404).json({ message: "Password incorrect" });
      } else {
        req.session.hospitalID = hospitalDetails._id;
        res.status(200).json({
          message: "Hospital login successfull",
        });
      }
    }
  } catch (error) {
    res.json(error.message);
  }
};

module.exports = {
  registerHospital,
  hospitalLogin,
};
