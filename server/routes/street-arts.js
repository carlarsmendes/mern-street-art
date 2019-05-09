// server/routes/street-arts.js
const uploader = require( '../configs/cloudinary');
const express = require('express');
const router = express.Router();
const StreetArt = require('../models/StreetArt');
const mongoose = require('mongoose');
// const multer = require('multer');

router.get('/', (req, res, next) => {
  // TODO
  //Route GET//api/street-arts to get all street art
  StreetArt.find()
  .then(streetArtFromDb => {
    res.json(streetArtFromDb)
      })
  }
  );
//Iteration 4 | Backend | GET /api/street-arts/:streetArtId

  router.get('/:id', (req, res, next) => {

    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }

    //Route GET//api/street-arts to get all street art
    StreetArt.findById(req.params.id)
    .then(streetArtFromDb => {
      res.json(streetArtFromDb)
        })
    } );

//Iteration 5 | Backend | POST /api/street-arts

// Route to create a street art
// `uploader.single('picture')` parses the data send with the name `picture` and save information inside `req.file`
router.post('/', uploader.single('pictureUrl'), (req, res, next) => {
  let { lat, lng } = req.body
  let pictureUrl = req.file.pictureUrl
  
  // TODO: continue
  StreetArt.create({
    pictureUrl: pictureUrl,
    location: {
      coordinates: [lat,lng]
    }
  })
    .then(createdStArt => {
      res.json({
        message: 'The Street Art was successfully created',
        data: createdStArt
      })
    })
});


module.exports = router;