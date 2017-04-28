<template lang="html">
  <div class="field">
    <input v-model="searchtext" type="text" placeholder="Name of series" name="Name of series" value="" />
    <button @click="getInfo(searchtext)" type="button" name="button"> How Long does It Take to watch</button>
    <div v-if="ok" class="">
      <h1>{{ name }}</h1>
      <img :src="poster" alt=""><br>
      <b>Hade permiär</b> <p>{{ airedAt }}</p>
      <b> Handlar om</b>   <p>{{ plot }}</p>
      <b>Att se hela serien tar</b> <p> {{ min }} minuter</p>
      <b>Vilket är</b> <p>{{ days }} dagar</p>
    </div>

  </div>
</template>


<script>
export default {
  name: 'field',
  data () {
    return {
      name: '',
      poster: '',
      airedAt: '',
      plot: '',
      min: '',
      days: '',
      ok: false
    }
  },
  methods: {
    getInfo (searchtext) {
      const that = this
      fetch('http://localhost:3000/getinfo',
        {
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            'series': searchtext
          })
        })
      .then(function (res) {
        return res.json()
      })
      .then(function (res) {
        console.log(res)
        that.name = res.name
        that.poster = res.picture
        that.airedAt = res.airedAt
        that.plot = res.blur
        that.min = res.time
        that.days = res.days
        that.ok = true
      })
    }

  }
}
</script>

<style lang="css">
background-color: red;
</style>
