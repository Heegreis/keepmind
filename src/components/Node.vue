<template>
  <g
    ref="node"
    id="node"
    v-bind:transform="`translate(${translate.x},${translate.y})`"
  >
    <path v-if="!isRoot" ref="nodePath"></path>
    <foreignObject width="1" height="1" id="nodeForeignObject">
      <div ref="nodeContent" id="nodeContent">
        <!-- <div>node: {{ nodeID }}</div> -->
        <!-- <div>mindmapId: {{ data.mindmapId }}</div> -->
        <!-- <div>content: {{ data.content }}</div> -->
        <div>{{ data.content }}</div>
      </div>
    </foreignObject>
    <g v-if="children && children.length">
      <node
        v-for="child in children"
        v-bind:key="child.id"
        v-bind:db="db"
        v-bind:node="child"
        v-bind:parentSize="size"
      ></node>
    </g>
  </g>
</template>

<script lang="ts">
// import { defineComponent, PropType, computed, ref } from '@vue/composition-api'
import * as d3 from 'd3'
import { getRootsID, getNode } from 'components/punchdbTools'
import { event } from 'quasar'
// Node排版: 主要用g包裝
// g
//   path
//   foreignObject
//     div
//   child
// 流程:
// 有id: 外部取得db、child
// getNode取得節點資料
export default {
  name: 'Node',
  props: {
    db: {},
    node: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: false
    },
    parentSize: {}
  },
  data: function() {
    return {
      data: {},
      translate: { x: 50, y: 50 },
      size: { width: 0, height: 0 },
      line: [
        { x: 0, y: 0 },
        { x: 0, y: 0 }
      ],
      setLine: d3
        .line()
        .x(function(d) {
          return d.x
        })
        .y(function(d) {
          return d.y
        })
    }
  },
  computed: {
    nodeID: function() {
      return this.node.id
    },
    children: function() {
      return this.node.children
    }
  },
  created: function() {
    getNode(this.db, this.nodeID).then(result => {
      this.data = result
    })
    console.log('created fin')
  },
  mounted: function() {
    const drag = d3
      .drag()
      .container(function container() {
        // console.log(this.parentNode.parentNode.parentNode.parentNode)
        return this.parentNode.parentNode.parentNode.parentNode
      })
      .on('start', function() {
        // d3.select(this).attr({ fill: 'black' })
        // console.log('start')
      })
      .on('drag', (event, d) => this.drag_drag(event, d))
      .on('end', function() {
        // d3.select(this).attr({ fill: d.fill })
        // console.log('end')
      })
    d3.select(this.$refs.nodeContent).call(drag)
  },
  updated: function() {
    this.size.width = this.$refs.nodeContent.clientWidth
    this.size.height = this.$refs.nodeContent.clientHeight
    this.line[0].y = this.size.height / 2
    if (this.parentSize) {
      this.line[1].x = -this.translate.x + this.parentSize.width
      this.line[1].y = -this.translate.y + this.parentSize.height / 2
    }
    d3.select(this.$refs.nodePath)
      .attr('d', this.setLine(this.line))
      .attr('y', 0)
      .attr('stroke', 'red')
      .attr('stroke-width', '5px')
      .attr('fill', 'none')
  },
  methods: {
    getNodeInfo() {
      // 如果有多個rootNode怎辦？
      // 思考當要拖動群組的節點時，動畫如何設計
      // 繼續用一個連一個的方式ok嗎？
      // * 當child有多個parent，就會有重複建立的問題
      // 多parent的html結構? 拖拉時的歸屬問題，**頂多設為輔助parent一個主要parent
      // 若擔心沒有使用目前方式，會無法建立連結，考慮善用html的機制？
      // if (this.nodeID === '') {
      //   console.log(getRootsID(this.db))
      // } else {
      //   getNode(this.db, this.nodeID)
      //   console.log('showNodeInfo')
      // }
    },
    drag_drag(event, d) {
      this.translate.x += d3.event.dx
      this.translate.y += d3.event.dy

      if (this.parentSize) {
        this.line[1].x = -this.translate.x + this.parentSize.width
        this.line[1].y = -this.translate.y + this.parentSize.height / 2
      }
    }
  }
}
</script>

<style lang="scss" scoped>
foreignObject {
  overflow: visible;
}
#nodeContent {
  border: 1px #ffac55 solid;
  // background-color: blueviolet;
  white-space: nowrap;
  display: inline-block;
}
</style>
