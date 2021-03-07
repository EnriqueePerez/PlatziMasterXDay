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

  router.post(
    '/:RouteId/:StatusId/:PlaneId/:NumPassanger',
    async (req, res) => {
      try {
        await flightServices.createFlight(req.params, (err, results) => {
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
    }
  );

  router.put('/:id', async (req, res) => {
    try {
      const bodyWithId = { ...req.body, ...req.params };
      console.log(req.params);
      await flightServices.updateFlight(bodyWithId, (err, results) => {
        if (err) {
          console.log('error en flightServices.updateFlight', err);
        } else {
          console.log(results);
          res.status(201).send('flight updated correctly');
        }
      });
    } catch (error) {
      console.log('error in updateFlight', error);
    }
  });

  router.delete('/:id', async (req, res) => {
    try {
      const bodyWithId = { ...req.body, ...req.params };
      await flightServices.deleteFlight(bodyWithId, (err, results) => {
        if (err) {
          console.log('err in flightServices.deleteFlight', err);
        } else {
          console.log(results);
          console.log('flight deleted sucesfully');
          res.status(201).send('flight deleted sucesfully');
        }
      });
      //code to delete flights
    } catch (error) {
      console.log('error in deleteFlight', error);
    }
  });
}

module.exports = flights;
