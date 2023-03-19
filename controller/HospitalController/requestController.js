const Hospital = require("../../model/Hospital");
const Blood = require("../../model/BloodBank");
const Request = require("../../model/Requests");

const viewAllRequests = async (req, res) => {
  try {
    const hospitalId = req.body.hospitalId;
    const requestDetails = await Request.find({ hospitalId: hospitalId });
    res.status(200).json({
      message: "Request details loaded successfully",
      requestDetails: requestDetails,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Request details couldnt be loaded", error: error });
  }
};

const updateRequestStatus = async (req, res) => {
  try {
    const requestId = req.query.requestId;
    console.log("This is requestId: " + requestId);
    await Request.findByIdAndUpdate(requestId, {
      requestStatus: false,
    });
    res.status(200).json({ message: "Updated request status" });
  } catch (error) {
    res.status(500).json({ message: "Error updating request status" });
  }
};

const viewParticularBloodGroupRequests = async (req, res) => {
try {
  const bloodGroup = req.body.bloodGroup;
  const hospitalId = req.body.hospitalId;
  const requestResult = await Request.aggregate([
    { $match: { hospitalId: hospitalId } },
    { $match: { bloodGroup: bloodGroup } },
  ]);
  res.status(200).json(requestResult);
} catch (error) {
  res.status(500).json({message:"Couldn't load request", error:error.message})
}
};
module.exports = {
  viewAllRequests,
  updateRequestStatus,
  viewParticularBloodGroupRequests,
};
