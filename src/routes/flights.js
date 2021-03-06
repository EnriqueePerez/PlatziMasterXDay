const express = require('express');
const FlightsServices = require('../services/flights');

function flights(app) {
  const router = express.Router();

  app.use('/api/flights', router);

  const flightServices = new FlightsServices();

  router.get('/', async (req, res) => {
    try {
      const details = '';
      await flightServices.getFlights(details, (err, results) => {
        if (err) {
          console.log('error in flightServices.getFlights', err);
        } else {
          res.status(200).send(results);
          console.log('Flights sent');
        }
      });
      //code to get flights
    } catch (error) {
      console.log('error in getFlights', error);
    }
  });

  router.get('/count', async (req, res) => {
    try {
      const details = '';
      await flightServices.getCountFlights(details, (err, results) => {
        if (err) {
          console.log('error in flightServices.getCountFlights', err);
        } else {
          res.status(200).send(results);
          console.log('Flights sent');
        }
      });
      //code to get flights
    } catch (error) {
      console.log('error in getFlights', error);
    }
  });

  router.post('/', async (req, res) => {
    try {
      await flightServices.createFlight(req.body, (err, results) => {
        if (err) {
          console.log('error in flightServices.createFlight', err);
        } else {
          console.log(results);
          res.status(201).send('flight inserted correctly');
        }
      });
      //code to post flight
    } catch (error) {
      console.log('error in postFlight', error);
    }
  });

  router.put('/', async (req, res) => {
    try {
    } catch (error) {
      console.log('error in updateFlight', error);
    }
  });

  router.delete('/', async (req, res) => {
    try {
      await flightServices.deleteFlight(req.body, (err, results) => {
        if (err) {
          console.log('err in flightServices.deleteFlight', err);
        } else {
          console.log(results);
          console.log('flight deleted sucesfully');
          res.send(201).send('flight deleted sucesfully');
        }
      });
      //code to delete flights
    } catch (error) {
      console.log('error in deleteFlight', error);
    }
  });
}

module.exports = flights;
