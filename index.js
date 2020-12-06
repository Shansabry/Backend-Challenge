const express = require('express');
const app = express();
const fs = require('fs');
const url = require('url');
const jsonSchema = require('./jsonSchema');
const Ajv = require('ajv').default;

//Gets data from JSON file
let jsonData = JSON.parse(
  fs.readFileSync('data.json', 'utf-8', (err, data) => {
    if (err) throw err;
    jsonData = JSON.parse(data);
  })
);

//validates json schema
const ajv = new Ajv({ allErrors: true });
const validate = ajv.compile(jsonSchema.JSON_SCHEMA);
const validSchema = validate(jsonData);

//REST-API call
app.get('/sites', async (req, res) => {
  if (!validSchema) {
    return res.status(500).json({ errors: validate.errors });
  }
  const { from, to, isInfoRequired } = url.parse(req.url, true).query;
  if (!from) {
    return res
      .status(400)
      .json({ errors: 'Specify the start date to proceed' });
  }
  const fromDate = new Date(from);
  const endDate = to === undefined ? fromDate : new Date(to);
  endDateCheck(fromDate, endDate, res);
  if (isDateValid(from, endDate)) {
    return res
      .status(400)
      .json({ errors: 'Ooopppss.., Something went wrong with the URL!!!!!' });
  } else {
    const messageList = messageListGenerator(
      fromDate,
      endDate,
      infoURLValidation(isInfoRequired)
    );
    return res.status(201).send(messageList);
  }
});

// Generates mesage list based on user decision
function messageListGenerator(fromDate, toDate, isInfoRequired) {
  const filteredData = filterByDate(fromDate, toDate);
  if (isInfoRequired) {
    let informationList = {};
    infoList(filteredData, informationList);
    return informationList;
  } else {
    return averageSiteVisit(filteredData);
  }
}

// Filters data on given date range
function filterByDate(fromDate, toDate) {
  return jsonData.filter(({ date }) => {
    const parsedDate = new Date(normalizeDate(date));
    return parsedDate >= fromDate && parsedDate <= toDate;
  });
}

// Generate message list with average site visits for given date range
function averageSiteVisit(filteredData) {
  let totalVisits = 0;
  const totalSites = filteredData.length;
  filteredData.map((data) => {
    totalVisits += data.visitors;
  });
  const averageVisitors = totalVisits / totalSites;

  return { averageVisitors: averageVisitors };
}

// Generate key-values pair of date and domain
function infoList(data, informationList) {
  data.map(({ date, domain }) => {
    const normalizedDate = normalizeDate(date);
    if (informationList[normalizedDate] !== undefined) {
      informationList[normalizedDate].push(domain);
    } else {
      informationList[normalizedDate] = [domain];
    }
  });
}

//Normalze the date from rawData
function normalizeDate(date) {
  return date.substring(0, 10);
}

function isDateValid(fromDate, toDate) {
  const validStartDate = Date.parse(fromDate);
  const validEndDate = Date.parse(toDate);
  return isNaN(validStartDate) || isNaN(validEndDate);
}

function endDateCheck(fromDate, toDate, res) {
  if (toDate < fromDate) {
    return res
      .status(400)
      .json({ errors: 'The end date is greater than start date' });
  }
}

function infoURLValidation(isInfoRequired) {
  if (isInfoRequired === 'false' || isInfoRequired === undefined) {
    return false;
  } else {
    return true;
  }
}
// Server created
app.listen(4000, () => {
  console.log('Listening on port 4000!!!!!!!!');
});
