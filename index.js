require('import-export')

import {getSeries, getSeriesInfo} from './modules/seriesInfoModule'

const fetch = require('node-fetch');
const FormData = require('form-data')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

  app.get('/', function (req, res) {
    res.send('Hello World!')
  })

  app.post('/getinfo', function (req, res) {
    getSeries(req.body.series)
    .then(function (result) {
        getSeriesInfo(result)
        .then(function (result) {
          const resObj = {
            'minutes': result,
            'days': Math.round((result/60/24) * 10) / 10,
          }
          console.log(resObj);
          res.send(resObj)
        })
      })
  })


  app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
  })
