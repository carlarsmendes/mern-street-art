// server/routes/street-arts.js
const express = require('express');
const router = express.Router();
const StreetArt = require('../models/StreetArt');

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

  router.get('/:streetArtId', (req, res, next) => {
    // TODO
    //Route GET//api/street-arts to get all street art
    StreetArt.findById(streetArtId)
    .then(streetArtFromDb => {
      res.json(streetArtFromDb)
        })
    }
    );

//Iteration 5 | Backend | POST /api/street-arts



module.exports = router;