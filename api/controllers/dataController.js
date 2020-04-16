// Dependencies
const { CoronaData } = require('./../models')
const { scrapWeb }  = require('./../controllers/scraper')

const getCoronaData = async () => {
  try {
    let data = await CoronaData.findOne({} , {} , { sort: { createdAt: -1 }});

    if(!data)
      return { err: 'No Data Found!', status: 404, data: null }

    return { err: null, status: 200, data }

  } catch (err) {
    return { err: err.toString(), status: 500, data: null }
  }
}

const fetchLatestData = async () => {
  try {
    let data = await scrapWeb();
    let coronaData = new CoronaData(data)
    await coronaData.save()
    return { err: null, status: 200, data }
  } catch (err) {
    return { err: err.toString(), status: 500, data: null }
  }
}

// Get Corono rising report
async function getCoronaTrend() {
  try {
    let data = await CoronaData.find();
    let tempObj = {}, obj = {};

    for(let dataPoint of data) {
      let date = new Date(dataPoint.createdAt).toDateString();
      if(!tempObj.hasOwnProperty(date))
        tempObj[date] = []
      
      tempObj[date].push(dataPoint)
    }

    for(let dataPoint of data) {
      let date = new Date(dataPoint.createdAt).toDateString();
      let currentData = tempObj[date];

      let highest = currentData[0];
      for(let currentd of currentData) {
        if(parseInt(currentd.totalActiveCases) > parseInt(highest.totalActiveCases))
          highest = currentd;
      }
      obj[date] = highest;
    }

    return { err: null, status: 200, data: obj };
  } catch (err) {
    return { err: err.toString(), status: 500, data: null }
  }
}

module.exports = {
  getCoronaData,
  fetchLatestData,
  getCoronaTrend
}