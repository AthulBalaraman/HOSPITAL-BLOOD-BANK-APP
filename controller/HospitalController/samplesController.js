const Hospital = require("../../model/Hospital");
const Blood = require("../../model/BloodBank");

const addSample = async (req, res) => {
  try {
    let blocker = false;
    const { hospitalId, bloodGroup, count } = req.body;
    const bloodList = await Blood.find({ hospitalId: hospitalId });
    await bloodList.map((item) => {
      // Restricting adding the blood group already added.
      if (item.bloodGroup == bloodGroup) {
        blocker = true;
        res.status(503).json({
          message: "Blood group already present please update the count",
        });
      }
    });
    if (blocker == false) {
      // If the blood group with the same name is not there , then add the new blood group
      const newBloodSample = new Blood({
        bloodGroup: bloodGroup,
        count: count,
        hospitalId: hospitalId,
      });
      const bloodSample = newBloodSample.save();
      res.status(200).json({ message: "Blood group added successfully" });
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const editSample = async (req, res) => {
  try {
    const bloodId = req.query.id;
    const count = req.body.count;
    await Blood.findByIdAndUpdate(bloodId, {
      count: count,
    });
    const bloodDetails = await Blood.findById(bloodId);
    const minimumCount = bloodDetails.count;

    // Deleting the blood sample if the updated count is zero
    if (minimumCount == 0) {
      await Blood.findByIdAndDelete(bloodId);
      res.status(200).json({ message: "Blood group deleted" });
    } else {
      res.status(200).json({ message: "Blood details updated" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteSample = async (req, res) => {
  try {
    const bloodId = req.query.id;
    await Blood.findByIdAndDelete(bloodId);
    res.status(200).json({ message: "Blood group deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete Unsuccessfull" });
  }
};

const showBloodList = async (req, res) => {
try {
  const hospitalId = req.body.hospitalId
  console.log("This is hosptial id from veiw bloodlist",hospitalId)
  const bloodList = await Blood.find({hospitalId:hospitalId})
  console.log("this is response.data ", bloodList)
  res.status(200).json({bloodList:bloodList})
} catch (error) {
  res.status(500).json({message:"Couldnt load the details", error:error.message})
}
}



module.exports = {
  addSample,
  editSample,
  deleteSample,
  showBloodList
};
