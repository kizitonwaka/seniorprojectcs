const express = require('express');
const app = express();
const estimateRoute = express.Router();

// Require Estimate model in our routes module
let Estimate = require('../models/Estimate');

// Defined store route
estimateRoute.route('/add').post(function (req, res) {
  let estimate = new Estimate(req.body);
  estimate.save()
    .then(estimate => {
      res.status(200).json({'estimate': 'estimate in added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
estimateRoute.route('/').get(function (req, res) {
    Estimate.find(function (err, estimates){
    if(err){
      console.log(err);
    }
    else {
      res.json(estimates);
    }
  });
});

// Defined edit route
estimateRoute.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  Estimate.findById(id, function (err, estimate){
      res.json(estimate);
  });
});

//  Defined update route
estimateRoute.route('/update/:id').post(function (req, res) {
    Estimate.findById(req.params.id, function(err, next, estimate) {
    if (!estimate)
      return next(new Error('Could not load Document'));
    else {
        estimate.person_name = req.body.person_name;
        estimate.business_name = req.body.business_name;
        estimate.business_gst_number = req.body.business_gst_number;

        estimate.save().then(estimate => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
estimateRoute.route('/delete/:id').get(function (req, res) {
    Estimate.findByIdAndRemove({_id: req.params.id}, function(err, estimate){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = estimateRoute;