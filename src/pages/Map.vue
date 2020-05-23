<template>
  <q-page>
    <p> Hello, D3.js. </p>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import * as d3 from 'd3'

export default Vue.extend({
  name: 'Map',
  mounted: function () {
    d3.select('p').style('color', 'red')
  }
})
</script>
