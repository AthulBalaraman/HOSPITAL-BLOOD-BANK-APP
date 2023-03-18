const Hospital = require("../../model/Hospital");
const Blood = require("../../model/BloodBank");
const { count } = require("../../model/Hospital");

const addSample = async (req, res) => {
  try {
    let blocker = false;
    const { hospitalId, bloodGroup, count } = req.body;
    const bloodList = await Blood.find({ hospitalId: hospitalId });
    console.log("This is blood list", bloodList);
    await bloodList.map((item) => {
      console.log(item.bloodGroup);
      if (item.bloodGroup == bloodGroup) {
        blocker = true;
        res
          .status(503)
          .json({
            message: "Blood group already present please update the count",
          });
      }
    });
    if (blocker == false) {
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

const editSample = async(req,res)=>{
  console.log("reached edit")
  const bloodId = req.query.id
  const count = req.body.count
  await Blood.findByIdAndUpdate(bloodId,{
    count:count
  })
  const bloodDetails = await Blood.findById(bloodId)
  console.log("This is blood Details ", bloodDetails)
  const minimumCount = bloodDetails.count
  console.log("THis is minimum ", minimumCount)
  if(minimumCount == 0){
    await Blood.findByIdAndDelete(bloodId)
    res.status(200).json({message:"Blood group deleted"})
  }
  else{
    res.status(200).json({message:"Blood details updated"})
  }
}

const deleteSample = async(req,res)=>{
try {
  const bloodId = req.query.id
  await Blood.findByIdAndDelete(bloodId)
  res.status(200).json({message:"Blood group deleted"})
} catch (error) {
  res.status(500).json({message:"Delete Unsuccessfull"})
}
}

module.exports = {
  addSample,
  editSample,
  deleteSample
};
