// Dependencies
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const scrapRouter = require('./api/routes/scrapRouter')

// Define PORT
const PORT = process.env.PORT || 3000;

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

app.get('/', (req, res) => {
  res.render('index.ejs')
});

app.use('/scrape', scrapRouter)

app.listen(PORT, () => {
  console.log(`Server is LIVE at PORT: ${PORT}`)
})