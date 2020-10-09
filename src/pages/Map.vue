<template>
  <q-page>
    <div id="Map">
      <svg>
        <g id="canvas"></g>
      </svg>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import * as d3 from 'd3'

export default Vue.extend({
  name: 'Map',
  data: function() {
    return {
      data: [
        { x: 10, y: 10 },
        { x: 50, y: 100 },
        { x: 60, y: 50 },
        { x: 100, y: 30 }
      ]
    }
  },
  created: function() {},
  mounted: function() {
    const line = d3
      .line()
      .x(function(d) {
        return d.x
      })
      .y(function(d) {
        return d.y
      })
    const svg = d3.select('#Map').select('svg')
    const canvas = d3.select('#canvas')
    const w = 800
    const h = 400
    canvas
      .append('g')
      .selectAll('line')
      .data(d3.range(0, w, 30))
      .enter()
      .append('line')
      .attr('x1', function(d) {
        return d
      })
      .attr('y1', 0)
      .attr('x2', function(d) {
        return d
      })
      .attr('y2', h)
      .attr('stroke', '#ddd')
      .attr('fill', 'none')
    canvas
      .append('g')
      .selectAll('line')
      .data(d3.range(0, h, 30))
      .enter()
      .append('line')
      .attr('x1', 0)
      .attr('y1', function(d) {
        return d
      })
      .attr('x2', w)
      .attr('y2', function(d) {
        return d
      })
      .attr('stroke', '#ddd')
      .attr('fill', 'none')
  },
  methods: {
    loadData() {
      canvas
        .append('path')
        .attr('d', line(this.data))
        .attr('y', 0)
        .attr('stroke', '#000')
        .attr('stroke-width', '5px')
        .attr('fill', 'none')
    }
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
  min-height: inherit;
}
</style>
