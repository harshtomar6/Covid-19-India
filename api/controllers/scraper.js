// Dependencies
const cheerio = require('cheerio')
const request = require('request')

function scrapWeb() {
  return new Promise((resolve, reject) => {

    const url = 'https://www.mohfw.gov.in/';
    
    request(url, (error, response, html) => {
      if(error) return reject(error)
      
      let $ = cheerio.load(html);  
      // let totalPassengersScreened = $('body > div.main-section > div > div.contribution.col-sm-9 > div > div > div:nth-child(1) > div > span').text()
      let totalActiveCases = $('#site-dashboard > div > div > div > div > ul > li.bg-blue > strong').text()
      let curedCases = $('#site-dashboard > div > div > div > div > ul > li.bg-green > strong').text()
      let migratedCases = $('#site-dashboard > div > div > div > div > ul > li.bg-orange > strong').text()
      let totalCuredCases = parseInt(curedCases)+parseInt(migratedCases)
      let totalDeathCases = $('#site-dashboard > div > div > div > div > ul > li.bg-red > strong').text()
      
      // console.log(totalPassengersScreened)
      // console.log(totalActiveCases)
      // console.log(totalCuredCases)
      // console.log(totalDeathCases)
      
      let tableRow = $('#state-data > div > div > div > div > table').text()
      // console.log(tableRow)
      let tableRowArr = tableRow.trim().split('\n')
      let sanitizedArr = [];    
      for(let arr of tableRowArr) {
        let ele = arr.trim()
        if(ele.length > 0)
        sanitizedArr.push(ele)
      }
      let dataObj = []
      
      sanitizedArr.splice(0, 5)
      sanitizedArr.splice(sanitizedArr.length-4, 4)
      // console.log(sanitizedArr[sanitizedArr.length-1])
      
      for(let i=0;i<sanitizedArr.length;i++) {
        if(i%5 === 0)
        dataObj.push({
          sNo: sanitizedArr[i],
          'state': sanitizedArr[i+1],
          confirmedDomestic: sanitizedArr[i+2],
          cured: sanitizedArr[i+3],
          death: sanitizedArr[i+4]
        })
      }
      // console.log(dataObj)
      resolve ({
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