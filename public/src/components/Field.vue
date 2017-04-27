<template lang="html">
  <div class="field">
    <input type="text" name="" value="" />
    <button type="button" name="button"></button>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
export default {
  name: 'field',
  data () {
    return {
      msg: 'bajs'
    }
  }
}
</script>

<style lang="css">
  background-color: red;
</style>
