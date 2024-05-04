const router = require("express").Router();
const Rental = require("../model/Rental");
const { User } = require("../model/User");
const { rentalValidation } = require("../validation");
const verify = require("../verifyToken");
const formidable = require("formidable");
const cloudinary = require("cloudinary");

// * FOR HANDLING IMAGE UPLOAD
const fs = require("fs");
const path = require("path");
const uploadFile = require("../uploadFile");


// * ADD RENTAL PROPERTY
router.post("/add", verify, async (req, res) => {
  try {
    const form = formidable.IncomingForm();
    // console.log(form);
    form.multiples = true;
    form.maxFileSize = 50 * 1024 * 1024; // 5MB
    form.parse(req, async (err, fields, files) => {
      if (err) {
        throw new Error("Error parsing the files");
      }
      const { error } = rentalValidation({ ...fields, ...files });
      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      const { rentalImage, ownerShip } = files;

      const rentalImageURL = await uploadFile(rentalImage.path);
      const ownerShipFileURL = await uploadFile(ownerShip.path);

      const coordinates = JSON.parse(fields.coordinates);

      // * CREATE A NEW RENTAL PROPERTY
      const rental = new Rental({
        propertyIdOnBlockChain: fields.propertyIdOnBlockChain,
        transactionHash: fields.transactionHash,
        propertyOwnershipHash: fields.propertyOwnershipHash,
        userId: req.user._id,
        name: fields.name,
        description: fields.description,
        address: fields.address,
        rentalImage: rentalImageURL.url,
        ownerShip: ownerShipFileURL.url,
        price: fields.price,
        coordinates: coordinates,
        propertyType: fields.propertyType,
        numBedrooms: fields.numBedrooms,
        numBathrooms: fields.numBathrooms,
        totalArea: fields.totalArea,
      });

      await rental.save();
      return res.status(201).send({ rental: rental._id });
    });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// * VIEW ALL RENTAL PROPERTIES
router.get("/viewAll", async (req, res) => {
  try {
    const query = await Rental.find();
    return res.send(query);
  } catch (err){
    return res.status(400).send(err);
  } 
});

// * VIEW LOGGED IN USER RENTAL PROPERTIES
router.get("/viewMyProperties", verify, async (req, res) => {
  try{
    const query = await Rental.find({ userId: req.user._id });
    return res.send(query).status(200);
  } catch (err){
    return res.status(400).send(err);
  }
});

// * VIEW SINGLE RENTAL PROPERTY BY ID
router.get("/view/:id", async (req, res) => {
  try {
    // * CHECK IF ID PARAMETER IS CORRECT
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/))
      return res.status(400).send("Invalid ID");

    const query = await Rental.find({ _id: req.params.id });
    if (query.length != 0) return res.send(query);
    else return res.status(404).send("Property not found.");
  } catch (err) {
    res.status(400).send(err);
  }
});

// * DELETE RENTAL PROPERTY
router.delete("/delete/:id", verify, async (req, res) => {

  // * CHECK IF ID PARAMETER IS CORRECT
  if (!req.params.id.match(/^[0-9a-fA-F]{24}$/))
    return res.status(400).send("Invalid ID");

  var query = await Rental.findByIdAndDelete(req.params.id);
  if (!query) return res.status(404).send("Property not found");
  fs.unlink(query.rentalImage, (err) => {
    if (err) throw err;
    console.log("File deleted " + query.rentalImage);
  });
  res.status(204).send("Deleted property");
});

router.put("/addTenant", verify, async (req, res) => {
  console.log("Add tenant");
  const rental = { tenant: req.body.tenant, available: false };
  var query = await Rental.findByIdAndUpdate(req.body.rentalId, rental);
  res.status(201).send(query);
});

router.put("/removeTenant", verify, async (req, res) => {
  console.log("Remove tenant");
  const rental = { tenant: undefined, available: true };
  var query = await Rental.findByIdAndUpdate(req.body.rentalId, rental);
  res.status(201).send(query);
});

module.exports = router;
