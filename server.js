// Dependencies
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')
dotenv.config()
const scrapRouter = require('./api/routes/scrapRouter')
const { getCoronaData } = require('./api/controllers/dataController')
const mongoose = require('mongoose')

// Define PORT
const PORT = process.env.PORT || 3000;

// COnnect DB
mongoose.connect(process.env.DATABASE_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// Use Logger
app.use(morgan('dev'))

// User Body Parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Set render engine
app.set('view engine', 'ejs')
app.set('views', __dirname+'/src/views')

// Set Static
app.use(express.static(__dirname+'/src'))

app.get('/', async (req, res) => {

  let { err, status, data } = await getCoronaData();
  res.render('index.ejs', { data })
});

app.use('/scrap', scrapRouter)

app.listen(PORT, () => {
  console.log(`Server is LIVE at PORT: ${PORT}`)
})