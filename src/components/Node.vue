<template>
  <g id="node">
    <foreignObject>
      <div>node: {{ nodeID }}</div>
      <div>mindmapId: {{ data.mindmapId }}</div>
      <div>content: {{ data.content }}</div>
    </foreignObject>
    <g v-if="data.children && data.children.length">
      <node
        v-for="child in data.children"
        :key="child"
        v-bind:db="db"
        v-bind:nodeID="child"
      ></node>
    </g>
  </g>
</template>

<script lang="ts">
// import { defineComponent, PropType, computed, ref } from '@vue/composition-api'
import { getRootsID, getNode } from 'components/punchdbTools'
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
    nodeID: {
      type: String,
      default: ''
      // required: true
    }
  },
  data: function() {
    return {
      data: {}
    }
  },
  created: function() {
    getNode(this.db, this.nodeID).then(result => {
      this.data = result
      console.log(result)
    })
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
