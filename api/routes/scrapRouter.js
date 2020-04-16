// Dependencies
const express = require('express')
const router = express.Router();
const { fetchLatestData, getCoronaTrend } = require('./../controllers/dataController');

router.get('/latest', async (req, res) => {
  let { err ,status , data } = await fetchLatestData()
  res.status(status).send({ err, data })
});

router.get('/trend', async (req, res) => {
  let data = await getCoronaTrend();
})

module.exports = router