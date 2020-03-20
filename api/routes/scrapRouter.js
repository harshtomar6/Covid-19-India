// Dependencies
const express = require('express')
const router = express.Router();
const { fetchLatestData } = require('./../controllers/dataController');

router.get('/latest', async (req, res) => {
  let { err ,status , data } = await fetchLatestData()
  res.status(status).send({ err, data })
})

module.exports = router