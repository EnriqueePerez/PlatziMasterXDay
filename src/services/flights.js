const mySqlLib = require('../db/mySQlLib');
const {
  parsingInsertedFlight,
  parsingUpdatedFlight,
} = require('../utils/flightsParser');

class FlightsServices {
  constructor() {
    this.table = 'Flight';
    this.mySQL = new mySqlLib();
  }

  async getFlights(details, callback) {
    const flights = await this.mySQL.getAll(this.table, details, callback);
    return flights;
  }

  async getCountFlights(details, callback) {
    const flights = await this.mySQL.getCount(this.table, details, callback);
    return flights;
  }

  async createFlight(data, callback) {
    console.log('imprimiendo datos crudos', data);
    const parsedValues = parsingInsertedFlight(data);
    console.log(parsedValues);

    const createdFlight = await this.mySQL.createFlight(
      this.table,
      parsedValues,
      callback
    );
    return createdFlight;
  }

  async updateFlight(data, callback) {
    // console.log(data);
    const parsedValues = parsingUpdatedFlight(data);
    const updatedFlight = await this.mySQL.updateFlight(
      this.table,
      parsedValues,
      callback
    );
    return updatedFlight;
  }

  async deleteFlight(data, callback) {
    const id = data.FlightId;
    const deletedFlight = await this.mySQL.deleteFlight(
      this.table,
      id,
      callback
    );
    return deletedFlight;
  }
}

module.exports = FlightsServices;
