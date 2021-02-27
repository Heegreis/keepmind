<template>
  <q-page>
    <div id="Map">
      <svg>
        <g id="canvas">
          <node
            v-for="node in nodes"
            v-bind:key="node.id"
            v-bind:db="db"
            v-bind:node="node"
            v-bind:isRoot="true"
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
import { getDB, getMindMap } from 'components/punchdbTools'
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
      db: {},
      rootsID: [],
      mindMap: {},
      zoom: {}
    }
  },
  computed: {
    nodes: function() {
      return this.mindMap.nodes
    }
  },
  created: function() {
    this.loadDB()
    getMindMap(this.db, 'afaf50ab-f1bf-41b2-8b27-9e27546cd68c').then(result => {
      this.mindMap = result
    })
  },
  mounted: function() {
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
  flex: 1;
}
</style>
