require('import-export')

import {getSeries, getSeriesInfo} from './modules/seriesInfoModule'
import cors from 'cors'
const fetch = require('node-fetch');
const FormData = require('form-data')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static(__dirname + '/public'))

  app.get('/', function (req, res) {
    // res.sendFile(__dirname + '/public/index.html')
    res.sendfile(__dirname + '/public/index.html')
  })

  app.post('/getinfo', function (req, res) {
    console.log(req.body);
    if (req.body.series) {
      getSeries(req.body.series)
      .then(function (result) {
          getSeriesInfo(result)
          .then(function (result) {
            res.send(
              result
            )
          })
          .catch(function (err) {
            console.log(err);
          })
        })
        .catch(function (err) {
          console.log(err);
        })
    }else{
        res.send('error bre')
    }


  })


  app.listen(5000, function () {
    console.log('Example app listening on port 3000!')
  })
