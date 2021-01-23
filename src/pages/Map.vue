<template>
  <q-page>
    <div id="Map">
      <svg>
        <g id="canvas">
          <node
            v-for="rootID in rootsID"
            :key="rootID"
            v-bind:db="db"
            v-bind:nodeID="rootID"
          ></node>
        </g>
      </svg>
      <div>
        <q-btn label="reset" @click="restBtn" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'
import * as d3 from 'd3'
import { getDB, getRootsID } from 'components/punchdbTools'
import Node from 'components/Node.vue'

// 先搜尋根節點(parents為空)，在mounted()先搜尋一次，填入root資訊到template，啟動root Node
// Node 會去 根據自己children的資料去啟動下一層的子Node
// 每個Node資訊須至少包含 parents, children
// 要思考怎構成響應式資料：
//     data: {roots: [parents: [], children: [1, 2]]} (須實驗更改children會不會即時更新資訊)
export default Vue.extend({
  name: 'Map',
  components: {
    Node
  },
  data: function() {
    return {
      data: [
        { x: 10, y: 10 },
        { x: 50, y: 100 },
        { x: 60, y: 50 },
        { x: 100, y: 30 }
      ],
      db: {},
      rootsID: [],
      zoom: {}
    }
  },
  created: function() {
    this.loadDB()
    getRootsID(this.db).then(result => {
      this.rootsID = result
    })
  },
  mounted: function() {
    // const svg = d3.select('#Map').select('svg')
    // const canvas = d3.select('#canvas')
    // const w = 800
    // const h = 400
    // canvas
    //   .append('g')
    //   .selectAll('line')
    //   .data(d3.range(0, w, 30))
    //   .enter()
    //   .append('line')
    //   .attr('x1', function(d) {
    //     return d
    //   })
    //   .attr('y1', 0)
    //   .attr('x2', function(d) {
    //     return d
    //   })
    //   .attr('y2', h)
    //   .attr('stroke', '#ddd')
    //   .attr('fill', 'none')
    // canvas
    //   .append('g')
    //   .selectAll('line')
    //   .data(d3.range(0, h, 30))
    //   .enter()
    //   .append('line')
    //   .attr('x1', 0)
    //   .attr('y1', function(d) {
    //     return d
    //   })
    //   .attr('x2', w)
    //   .attr('y2', function(d) {
    //     return d
    //   })
    //   .attr('stroke', '#ddd')
    //   .attr('fill', 'none')
    // this.loadData(canvas)
    // console.log(this.data)

    function zoomed() {
      const container = d3.select('#canvas')
      container.attr('transform', d3.event.transform)
    }
    this.zoom = d3
      .zoom()
      .scaleExtent([1, 10])
      .on('zoom', zoomed)
    d3.select('#Map')
      .select('svg')
      .call(this.zoom)
  },
  methods: {
    loadData(canvas) {
      const line = d3
        .line()
        .x(function(d) {
          return d.x
        })
        .y(function(d) {
          return d.y
        })
      canvas
        .append('path')
        .attr('d', line(this.data))
        .attr('y', 0)
        .attr('stroke', '#000')
        .attr('stroke-width', '5px')
        .attr('fill', 'none')
    },
    loadDB() {
      this.db = getDB()
    },
    restBtn() {
      console.log('restBtn')
      d3.select('#Map')
        .select('svg')
        .transition()
        .duration(750)
        .call(this.zoom.transform, d3.zoomIdentity)
    }
  }
})
</script>

<style lang="scss" scoped>
#Map {
  width: 100%;
  min-height: inherit;
  display: flex;
  flex-direction: column;
}
svg {
  width: 100%;
  // min-height: initial;
  flex: 1;
}
</style>
