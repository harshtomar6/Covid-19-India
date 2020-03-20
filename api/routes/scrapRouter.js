// Dependencies
const express = require('express')
const router = express.Router();
const { scrapWeb } = require('./../controllers/scraper');

router.get('/', (req, res) => {
  scrapWeb()
})

module.exports = router