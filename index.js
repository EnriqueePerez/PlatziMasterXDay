const express = require('express');
const app = express();
const cors = require('cors');
const router = express.Router();

//env variables
const { config } = require('./src/config/dotenv');

//importing routes
const flights = require('./src/routes/flights');

app.use(cors({ origin: '*' }));

//body-parser json
app.use(express.json());

//adding routes
flights(app);

app.listen(config.port, () => {
  console.log(`Listening on http://localhost:${config.port}`);
});
