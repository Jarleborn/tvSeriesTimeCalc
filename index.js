require('import-export')
const fetch = require('node-fetch');
const FormData = require('form-data')
import config from './config'
const mdb = require('moviedb')(config())

function getSeries() {
  return new Promise(function(resolve, reject) {
  mdb.searchTv({ query: 'friends' }, (err, res) => {
      resolve(res.results[0])
    })
  })
}

function getSeriesInfo(series) {
  return new Promise(function(resolve, reject) {
    mdb.tvInfo({ id: series.id }, (err, res) => {
      resolve(res.episode_run_time[0] * res.number_of_episodes)
    })
  });
}


getSeries()
.then(function (res) {
  console.log('Att se serien ' + res.name);
    getSeriesInfo(res)
    .then(function (res) {
      console.log('tar exakt ' + res + ' minuter');
      console.log('vilket är ' + Math.round((res/60/24) * 10) / 10 + ' dagar');
    })
  })
