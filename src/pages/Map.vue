<template>
  <q-page>
    <div id="Map">
      <svg>
        <circle cx="50" cy="50" r="50" style="fill:red" />
      </svg>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import * as d3 from 'd3'

export default Vue.extend({
  name: 'Map',
  mounted: function() {
    // d3.select('p').style('color', 'red')
    d3.select('#Map').style('color', 'red')
  }
})
</script>

<style lang="scss" scoped>
#Map {
  width: 100%;
  min-height: inherit;
}
svg {
  width: 100%;
  height: 100%;
}
</style>
