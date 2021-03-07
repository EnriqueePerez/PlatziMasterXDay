function parsingInsertedFlight(values) {
  //Date
  //Time
  //RouteId
  //PlaneId
  //StatusId
  //NumPassenger

  const dateNow = new Date();

  const rawDate = dateNow.toLocaleDateString('en-US', {
    timeZone: 'America/Mexico_City',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const time = dateNow.toLocaleTimeString('en-US', {
    timeZone: 'America/Mexico_City',
    hour12: false,
  });

  const year = rawDate.slice(-4);
  const month = rawDate.slice(0, -8);
  const day = rawDate.slice(3, -5);
  const date = `${year}-${month}-${day}`;

  values.date = date;
  values.time = time;

  //extracting only the values from the object
  const onlyValues = Object.values(values);
  console.log('printing onlyValues', onlyValues);

  //Parsing the values to string to avoid errors in the db
  const parsedValues = onlyValues.map((i) => i.toString());
  return parsedValues;
}

function parsingUpdatedFlight(values) {
  //getting the data and parsing it
  //RouteId
  //PlaneId
  //StatusId
  //NumPassanger
  //Date
  //Time
  //FlightId

  const parsedData = {
    RouteId: values.RouteId,
    PlaneId: values.PlaneId,
    StatusId: values.StatusId,
    NumPassanger: values.NumPassanger,
    Date: values.Date,
    Time: values.Time,
    FlightId: values.id,
  };
  console.log('printing just the parsedObject of updatedFlight', parsedData);

  const parsedValues = Object.values(parsedData);
  console.log('printing just the values of updatedFlight', parsedValues);

  return parsedValues;
}

module.exports = { parsingInsertedFlight, parsingUpdatedFlight };
