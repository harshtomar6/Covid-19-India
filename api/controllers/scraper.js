// Dependencies
const cheerio = require('cheerio')
const request = require('request')

function scrapWeb() {
  const url = 'https://www.mohfw.gov.in/';

  request(url, (error, response, html) => {
    if(error) return console.log(error)

    let $ = cheerio.load(html);
    let totalPassengersScreened = $('body > div:nth-child(3) > div > div > div > ol > li > p > strong').text().split(':')[1].trim()
    let totalActiveCases = $('body > div:nth-child(3) > div > div > div > ol > p > strong').text().split(':')[1].trim()
    let totalCuredCases = $('body > div:nth-child(3) > div > div > div > ol > strong > p > strong').text().split(':')[1].trim()
    let totalDeathCases = $('body > div:nth-child(3) > div > div > div > ol > strong > strong > strong > p > strong').text().split(':')[1].trim()

    console.log(totalPassengersScreened)
    console.log(totalActiveCases)
    console.log(totalCuredCases)
    console.log(totalDeathCases)

    let tableRow = $('body > div:nth-child(3) > div > div > div > ol > strong > strong > strong > strong > div > table').text()
    let tableRowArr = tableRow.trim().split('\n')
    
    for(let arr of tableRowArr)
      console.log(arr.trim())

  })
}

module.exports = {
  scrapWeb
}