const router = require('express').Router();
const Rental = require('../model/Rental');
const {User} = require('../model/User');
const { rentalValidation } = require('../validation')
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const verify = require('../verifyToken');
const formidable = require("formidable");


// * FOR HANDLING IMAGE UPLOAD
const fs = require('fs');
const path = require('path');



// * ADD RENTAL PROPERTY
router.post('/add', verify , async (req, res) => {
    console.log("HI");
    const form = formidable.IncomingForm();
    // console.log(form);
    form.multiples = true;
    form.maxFileSize = 50 * 1024 * 1024; // 5MB
    // console.log(form);

    form.parse(req, async (err, fields, files) => {
        console.log(fields);
        console.log(files);
        const { error } = rentalValidation(fields);
        if (error) {
            console.log(error)
            return res.status(400).send(error.details[0].message)};

        const findUser = await User.findOne({ _id: req.user });
        if(!findUser) return res.status(404).send("User not Found");
        // for rental image
        var oldPath = files.rentalImage.path;
        var newFileName = "rentalImage"+ Date.now() + ".jpg";
        var newPath = path.join(__dirname, '../uploads')+ '/' + newFileName;
        console.log(newFileName);
        var rawData = fs.readFileSync(oldPath);
        // for ownership
        var ownershipOldPath = files.ownerShip.path;
        var newOwnerShipFileName = findUser.etherAccount + Date.now() + ".pdf";
        var newOwnerShipPath = path.join(__dirname, '../uploads')+ '/' + newOwnerShipFileName;
        console.log(newFileName);
        var ownerShipRawData = fs.readFileSync(ownershipOldPath);

        // * CREATE A NEW RENTAL PROPERTY
        const rental = new Rental({
            propertyIdOnBlockChain: fields.propertyIdOnBlockChain,
            transactionHash: fields.transactionHash,
            propertyOwnershipHash: fields.propertyOwnershipHash,
            userId: findUser._id,
            name: fields.name,
            description: fields.description,
            address: fields.address,
            rentalImage: `uploads/${newFileName}`,
            ownerShip: `uploads/${newOwnerShipFileName}`,
            price: fields.price
        });

        try {
            // for making image file
            fs.writeFile(newPath, rawData, function(err){
                if(err) {
                    console.log(err);
                    return res.status(500).send("Couldn't write file");
                }
            });
            // for making ownership file
            fs.writeFile(newOwnerShipPath, newOwnerShipPath, function(err){
                if(err) {
                    console.log(err);
                    return res.status(500).send("Couldn't write file");
                }
            });
            const savedRental = await rental.save();
            console.log("Success");
            res.status(201).send({ rental: rental._id });
        } catch (err) {
            console.log("error");
            res.status(400).send(err);
        }

    });
});


// * VIEW ALL RENTAL PROPERTIES
router.get('/viewAll', async (req, res) => {

    const query = await Rental.find();
    return res.send(query);


});


// * VIEW LOGGED IN USER RENTAL PROPERTIES
router.get('/viewMyProperties', verify , async (req, res) => {

    const query = await Rental.find({ userId: req.user._id });
    return res.send(query);


});

// * VIEW SINGLE RENTAL PROPERTY BY ID
router.get('/view/:id', async (req, res) => {

    
    try{
        // * CHECK IF ID PARAMETER IS CORRECT
        if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).send("Invalid ID");

        const query = await Rental.find({_id:req.params.id});
        if(query.length!=0) return res.send(query);

        else return res.status(404).send("Property not found.")

    }catch(err){
        res.status(400).send(err);

    }

});

// * GET IMAGE ROUTE
router.get('/getImage/:id', async (req, res) => {

    
    try{
        // * CHECK IF ID PARAMETER IS CORRECT
        // if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).send("Invalid ID");

        const query = await Rental.find({propertyIdOnBlockChain: req.params.id});
        if(query.length!=0) return res.send(query);

        else return res.status(404).send("Image not found.")

    }catch(err){
        res.status(400).send(err);

    }

});




// * UPDATE RENTAL PROPERTY 
router.put('/update/:id', verify, async (req, res) => {

    // * CHECK IF ID PARAMETER IS CORRECT
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).send("Invalid ID");

    const form = formidable.IncomingForm();
    // console.log(form);
    form.multiples = true;
    form.maxFileSize = 50 * 1024 * 1024; // 5MB
    // console.log(form);

    form.parse(req, async (err, fields, files) => {
        console.log(fields.address);
        const { error } = rentalValidation(fields);
        if (error) {
            console.log(error);
            return res.status(400).send(error.details[0].message)};

        if(files.rentalImage){
            var oldPath = files.rentalImage.path;
            var newFileName = "rentalImage"+ Date.now() + ".jpg";
            var newPath = path.join(__dirname, '../uploads')+ '/' + newFileName;
            var rawData = fs.readFileSync(oldPath);
            try {
                fs.writeFile(newPath, rawData, function(err){
                    if(err) {
                        console.log(err);
                        return res.statusCode(500).send("Couldn't write file");
                    }
                });
                const rental = { address: fields.address, rentalImage: `uploads/${newFileName}`};

                const findUser = await User.findOne({ _id: req.user });
                if(!findUser) return res.status(404).send("User not Found");

                

                var query = await Rental.findByIdAndUpdate(req.params.id, rental);
                if(!query) return res.status(404).send("Property not found");
                fs.unlink(query.rentalImage,(err)=>{
                    if(err) throw err;
                    console.log("File deleted "+ query.rentalImage);
                });
                query = await Rental.findById(req.params.id);
                console.log("Success");
                res.status(201).send(query); 
                
            } catch (err) {
                console.log("error");
                res.status(400).send(err);
            }

        }else{

            const rental = { address: fields.address};
            var query = await Rental.findByIdAndUpdate(req.params.id, rental);
            if(!query) return res.status(404).send("Property not found");
            query = await Rental.findById(req.params.id);
            res.status(201).send(query);

        }       

    });

    
});


// * DELETE RENTAL PROPERTY
router.delete('/delete/:id', verify, async (req, res) => {

    console.log("Delete clicked");

    // * CHECK IF ID PARAMETER IS CORRECT
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) return res.status(400).send("Invalid ID");

    var query = await Rental.findByIdAndDelete(req.params.id);
    if(!query) return res.status(404).send("Property not found");
    fs.unlink(query.rentalImage, (err)=>{
        if(err) throw err;
        console.log("File deleted "+ query.rentalImage);
    });
    res.status(204).send("Deleted property");
  
});


router.put('/addTenant', verify, async (req, res) => {
    console.log("Add tenant");
    console.log(req.body.tenant);
    console.log(req.body.rentalId);
    const rental = { tenant: req.body.tenant,available: false};
    var query = await Rental.findByIdAndUpdate(req.body.rentalId, rental);
    res.status(201).send(query);
})

router.put('/removeTenant', verify, async (req, res) => {
    console.log("Remove tenant");
    console.log(req.body.rentalId);
    const rental = { tenant: undefined, available: true};
    var query = await Rental.findByIdAndUpdate(req.body.rentalId, rental);
    res.status(201).send(query);
})




module.exports = router;