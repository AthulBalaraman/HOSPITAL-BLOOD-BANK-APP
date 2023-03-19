const Blood = require("../../model/BloodBank");
const Hospital = require("../../model/Hospital");

const viewAllBloodSamples = async (req, res) => {
  try {
    const allBloodList = await Blood.find();
    const hospitalList = await Hospital.find();
    if (allBloodList.length == 0) {
      res.status(404).json({ message: "Blood Bank currently empty" });
    } else {
      res.status(200).json({
        message: "Blood list loaded successfully",
        allBloodList: allBloodList,
        hospitalList: hospitalList,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error loading blood list", error: error });
  }
};

const viewAllHospitals = async (req, res) => {
  try {
    const hospitalList = await Hospital.find();
    res.status(200).json({
      message: "Hospitals loaded successfully",
      hospitalList: hospitalList,
    });
  } catch (error) {
    res.status(500).json({ message: "Couldnt load hospital list" });
  }
};

const viewBloodListOfHospital = async (req, res) => {
  try {
    const hospitalID = req.body.hospitalId;
    const bloodList = await Blood.find({ hospitalId: hospitalID });
    if (bloodList.length == 0) {
      res
        .status(404)
        .json({ message: "Blood bank currently empty in hospital" });
    } else {
      res.status(200).json({
        message: "Blood samples in hospital loaded",
        bloodList: bloodList,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Couldn't load blood list in hospital" });
  }
};

const viewBloodGroupInHospital = async (req, res) => {
  try {
    const bloodGroup = req.body.bloodGroup;
    const bloodGroupList = await Blood.find({ bloodGroup: bloodGroup });
    if (bloodGroupList.length == 0) {
      res.status(404).json({ message: "Search result not found" });
    } else {
      res.status(200).json({
        message: "Searched blood group list loaded",
        bloodGroupList: bloodGroupList,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Couldnt load matching blood results" });
  }
};
module.exports = {
  viewAllBloodSamples,
  viewAllHospitals,
  viewBloodListOfHospital,
  viewBloodGroupInHospital,
};
