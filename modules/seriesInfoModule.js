import config from '../config'
const mdb = require('moviedb')(config())

function getSeries(seriesName) {
  return new Promise(function(resolve, reject) {
    mdb.searchTv({ query: seriesName }, (err, res) => {
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



export { getSeries, getSeriesInfo };
