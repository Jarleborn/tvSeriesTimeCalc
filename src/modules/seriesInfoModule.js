import config from './config'
const mdb = require('moviedb')(config())

function getSeries(seriesName) {
  console.log(seriesName);
  return new Promise(function(resolve, reject) {
    mdb.searchTv({ query: seriesName }, (err, res) => {
      if(err){
      return reject(err)
      }
      resolve(res.results[0])
    })

  })
}

function getSeriesInfo(series) {
  return new Promise(function(resolve, reject) {
    mdb.tvInfo({ id: series.id }, (err, res) => {

      if(err){
      return reject(err)
      }
      resolve({
        'time': res.episode_run_time[0] * res.number_of_episodes,
        'name': res.name,
        'blur': res.overview,
        'airedAt': res.first_air_date,
        'days':Math.round((res.episode_run_time[0] * res.number_of_episodes/60/24) * 10) / 10,
        'picture': 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/' + res.poster_path,
        'background': 'https://image.tmdb.org/t/p/w1400_and_h450_bestv2//' + res.backdrop_path
        })
    })

  });
}



export { getSeries, getSeriesInfo };
