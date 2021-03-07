const { config } = require('../config/dotenv');
const mysql = require('mysql');

//add credentials

class mySqlLib {
  constructor() {
    this.client = mysql.createConnection({
      host: config.dbHost,
      user: config.dbUser,
      password: config.dbPassword,
      database: config.dbName,
    });
    this.dbName = config.dbName;
  }

  connect() {
    if (!mySqlLib.connection) {
      //if no connection exists, create a new one
      mySqlLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err);
          } else {
            console.log('Connected to MySQL db');
            resolve(this.client);
          }
        });
      });
    }
    //If the connection already exists, return it
    return mySqlLib.connection;
  }

  getAll(table, details, callback) {
    return this.connect()
      .then((db) => {
        return db.query(`SELECT * FROM ${table} ${details}`, callback);
      })
      .catch((err) => {
        console.log('error in getAll mySqlLib', err);
      });
  }

  getCount(table, details, callback) {
    return this.connect()
      .then((db) => {
        return db.query(`SELECT COUNT(*) FROM ${table} ${details}`, callback);
      })
      .catch((err) => {
        console.log('error in getCount mySqlLib', err);
      });
  }

  async createFlight(table, data, callback) {
    const query = await this.connect()
      .then((db) => {
        return db.query(
          `INSERT INTO ${table}(RouteId, PlaneId, StatusId, NumPassanger, Date, Time) VALUES (?,?,?,?,?,?);`,
          data,
          callback
        );
      })
      .catch((err) => {
        console.log('error in create mySqlLib', err);
      });
    return query;
  }

  async updateFlight(table, data, callback) {
    const query = await this.connect()
      .then((db) => {
        return db.query(
          `UPDATE ${table} SET RouteId=?, PlaneId=?, StatusId=?, NumPassanger=?, Date=?, Time=? where FlightId=?;`,
          data,
          callback
        );
      })
      .catch((err) => {
        console.log('error in update mySqlLib', err);
      });
    return query;
  }

  async deleteFlight(table, data, callback) {
    const query = await this.connect()
      .then((db) => {
        return db.query(
          `DELETE FROM ${table} WHERE FlightId=? LIMIT 1;`,
          data,
          callback
        );
      })
      .catch((err) => {
        console.log('error in delete mySqlLib', err);
      });
    return query;
  }

  //   async updateFlights(table, data, callback) {
  //     const query = await this.connect().then((db) => {
  //         return db.query(`UPDATE ${table} SET `)
  //     })
  //   }
}

module.exports = mySqlLib;
