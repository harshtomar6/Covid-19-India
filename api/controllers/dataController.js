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

module.exports = {
  getCoronaData,
  fetchLatestData
}