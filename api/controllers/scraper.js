// Dependencies
const cheerio = require('cheerio')
const request = require('request')

function scrapWeb() {
  return new Promise((resolve, reject) => {

    const url = 'https://www.mohfw.gov.in/';
    
    request(url, (error, response, html) => {
      if(error) return reject(error)
      
      let $ = cheerio.load(html);
      let totalPassengersScreened = $('body > div:nth-child(3) > div > div > div > ol > li > p > strong').text().split(':')[1].trim()
      let totalActiveCases = $('body > div:nth-child(3) > div > div > div > ol > p > strong').text().split(':')[1].trim()
      let curedCases = $('body > div:nth-child(3) > div > div > div > ol > strong > p > strong').text().split(':')[1].trim()
      let migratedCases = $('body > div:nth-child(3) > div > div > div > ol > strong > strong > p > strong').text().split(':')[1].trim()
      let totalCuredCases = parseInt(curedCases)+parseInt(migratedCases)
      let totalDeathCases = $('body > div:nth-child(3) > div > div > div > ol > strong > strong > strong > p > strong').text().split(':')[1].trim()
      
      // console.log(totalPassengersScreened)
      // console.log(totalActiveCases)
      // console.log(totalCuredCases)
      // console.log(totalDeathCases)
      
      let tableRow = $('body > div:nth-child(3) > div > div > div > ol > strong > strong > strong > strong > div > table').text()
      let tableRowArr = tableRow.trim().split('\n')
      let sanitizedArr = [];    
      for(let arr of tableRowArr) {
        let ele = arr.trim()
        if(ele.length > 0)
        sanitizedArr.push(ele)
      }
      let dataObj = []
      
      sanitizedArr.splice(0, 6)
      sanitizedArr.splice(sanitizedArr.length-5, 5)
      
      for(let i=0;i<sanitizedArr.length;i++) {
        if(i%6 === 0)
        dataObj.push({
          sNo: sanitizedArr[i],
          'state': sanitizedArr[i+1],
          confirmedDomestic: sanitizedArr[i+2],
          confirmedForeign: sanitizedArr[i+3],
          cured: sanitizedArr[i+4],
          death: sanitizedArr[i+5]
        })
      }
      resolve ({
        totalPassengersScreened,
        totalActiveCases,
        totalCuredCases,
        totalDeathCases,
        stateWise: dataObj
      })
    })

  })
}

module.exports = {
  scrapWeb
}