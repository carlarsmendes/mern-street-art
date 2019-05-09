const express = require('express');
const StreetArt = require('../models/StreetArt');
const Visit = require('../models/Visit');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const mongoose = require('mongoose');

// Route protected for logged in user
router.get('/my-visits', isLoggedIn, (req, res, next) => {
// router.get('/my-visits', (req, res, next) => {
  // You should use `.populate`
  Visit.find()
  .populate('_streetArt')
  .populate('_user')
  .then(allVisitsFromDb => {
    res.json(allVisitsFromDb)
      })
  .catch(err => {
    res.json(err);
  })
  });

  //Iteration 7 | Backend | POST /api/visits
router.post('/my-visits', isLoggedIn, (req, res, next) => {
// router.post('/my-visits', isLoggedIn, (req, res, next) => {
  Visit.create({
      _user:req.user._id,
       _streetArt:req.body._streetArt
  })
  .then(createdVisit => {
    res.json({
      message: 'The Visit was successfully created',
      data: createdVisit
    })
      })
    .catch(err => {
      res.json(err);
    })
  }
  );

    //Iteration 8 | Backend | DELETE /api/visits/:visitId

    // router.delete('/:id', isLoggedIn,  (req, res, next)=>{
    router.delete('/visits/:visitId',  (req, res, next)=>{

      if(!mongoose.Types.ObjectId.isValid(req.params.visitId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
      }

      Visit.findById(req.params.visitId)
      .then(visit => {
       if(visit._user === req.user.id) {
        Visit.findByIdAndRemove(req.params.visitId)
       } else {
        res.json({message: `You are not allowed to ddelete this one`})
       }})
        .then(() => {
         res.json({message: `Visit with ID ${req.params.visitId} is removed successfully.`});
        })
        .catch(err => {
          res.json(err);
        })
       })


module.exports = router;