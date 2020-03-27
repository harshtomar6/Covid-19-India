// Dependencies
const cheerio = require('cheerio')
const request = require('request')

function scrapWeb() {
  return new Promise((resolve, reject) => {

    const url = 'https://www.mohfw.gov.in/';
    
    request(url, (error, response, html) => {
      if(error) return reject(error)
      
      let $ = cheerio.load(html);  
      let totalPassengersScreened = $('body > div.main-section > div > div.contribution.col-sm-9 > div > div > div:nth-child(1) > div > span').text()
      let totalActiveCases = $('body > div.main-section > div > div.contribution.col-sm-9 > div > div > div:nth-child(2) > div > span').text()
      let curedCases = $('body > div.main-section > div > div.contribution.col-sm-9 > div > div > div:nth-child(3) > div > span').text()
      let migratedCases = $('body > div.main-section > div > div.contribution.col-sm-9 > div > div > div:nth-child(5) > div > span').text()
      let totalCuredCases = parseInt(curedCases)+parseInt(migratedCases)
      let totalDeathCases = $('body > div.main-section > div > div.contribution.col-sm-9 > div > div > div:nth-child(4) > div > span').text()
      
      // console.log(totalPassengersScreened)
      // console.log(totalActiveCases)
      // console.log(totalCuredCases)
      // console.log(totalDeathCases)
      
      let tableRow = $('#cases > div > div > table').text()
      // console.log(tableRow)
      let tableRowArr = tableRow.trim().split('\n')
      let sanitizedArr = [];    
      for(let arr of tableRowArr) {
        let ele = arr.trim()
        if(ele.length > 0)
        sanitizedArr.push(ele)
      }
      let dataObj = []
      
      sanitizedArr.splice(0, 6)
      sanitizedArr.splice(sanitizedArr.length-6, 6)
      // console.log(sanitizedArr[sanitizedArr.length-1])
      
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
      // console.log(dataObj)
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