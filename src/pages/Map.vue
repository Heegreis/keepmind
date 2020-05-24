<template>
  <q-page>
    <p>Hello, D3.js.</p>
    <svg width="200" height="200">
      <circle cx="50" cy="50" r="50" style="fill:red" />
    </svg>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import * as d3 from 'd3'

export default Vue.extend({
  name: 'Map',
  mounted: function() {
    d3.select('p').style('color', 'red')
  }
})
</script>
