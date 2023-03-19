const Receiver = require("../../model/Receiver");
const Requests = require("../../model/Requests");
const Blood = require("../../model/BloodBank");

const addRequest = async (req, res) => {
  try {
    const bloodSampleId = req.body.bloodSampleId;
    const receiverId = req.body.receiverId;
    const bloodDetails = await Blood.findById(bloodSampleId);
    const hospitalId = bloodDetails.hospitalId;
    const bloodGroup = bloodDetails.bloodGroup
    const newRequest = new Requests({
      bloodSampleId: bloodSampleId,
      receiverId: receiverId,
      hospitalId: hospitalId,
      bloodGroup: bloodGroup
    }).save()
    res.status(200).json({ message: "Request sent" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Couldnt add request", error: error.message });
  }
};

module.exports = {
  addRequest,
};
