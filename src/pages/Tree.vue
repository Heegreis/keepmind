<template>
  <div class="q-pa-md row q-col-gutter-sm">
    <div class="q-pa-md">
      <div class="q-gutter-sm">
        <q-radio
          v-for="mindMap in mindMaps"
          :key="mindMap._id"
          v-model="selectedMindMap"
          :val="mindMap._id"
          :label="mindMap.name"
        />
      </div>

      <div class="q-px-sm">
        Your selection is: <strong>{{ selectedMindMap }}</strong>
      </div>
    </div>

    <div class="col-12 col-sm-6 q-gutter-sm">
      <div class="text-h6">Selected</div>
      <div>{{ selectedMindMap }}</div>

      <q-separator spaced />
      <q-btn label="add" @click="addMindMapBtn" />
      <q-btn label="delete" />
      <q-btn label="edit" />
      <q-input v-model="inputMindMapName" label="name" />
    </div>

    <q-tree
      class="col-12 col-sm-6"
      :nodes="treeData"
      node-key="id"
      :selected.sync="selected"
      default-expand-all
    >
      <template v-slot:default-header="prop">
        <div class="row items-center">
          <div>{{ prop.node.id }}</div>
        </div>
      </template>
    </q-tree>

    <div class="col-12 col-sm-6 q-gutter-sm">
      <div class="text-h6">Selected</div>
      <div>{{ selected }}</div>

      <q-separator spaced />
      <q-btn label="add" @click="addNodeBtn" />
      <q-btn label="delete" />
      <q-btn label="edit" />
      <q-input v-model="inputContent" label="content" />
      <q-input v-model="inputNotes" label="notes" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as d3 from 'd3'
import {
  getDB,
  getRootsID,
  addNode,
  getAllNodes,
  getAllMindMaps,
  addMindMap,
  getNodeStructure
} from 'components/punchdbTools'
import Node from 'components/Node.vue'

export default Vue.extend({
  name: 'Tree',
  components: {
    Node
  },
  data: function() {
    return {
      db: {},
      mindMaps: [],
      selectedMindMap: '',
      inputMindMapName: '',
      nodes: [],
      treeData: [],
      simple: [
        {
          content: 'Satisfied customers',
          id: '1',
          children: [
            {
              content: 'Good food',
              id: '1-1',
              children: [
                {
                  content: 'Quality ingredients',
                  id: '1-1-1'
                },
                {
                  content: 'Good recipe',
                  id: '1-1-2'
                }
              ]
            },
            {
              content: 'Good service',
              id: '1-2',
              children: [
                {
                  content: 'Prompt attention',
                  id: '1-2-1'
                },
                {
                  content: 'Professional waiter',
                  id: '1-2-2'
                }
              ]
            },
            {
              content: 'Pleasant surroundings',
              id: '1-3',
              children: [
                {
                  content: 'Happy atmosphere',
                  id: '1-3-1'
                },
                {
                  content: 'Good table presentation',
                  id: '1-3-2'
                },
                {
                  content: 'Pleasing decor',
                  id: '1-3-3'
                }
              ]
            }
          ]
        }
      ],
      selected: '',
      inputContent: '',
      inputNotes: ''
    }
  },
  computed: {},
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    selectedMindMap: function(newValue, oldValue) {
      if (this.selectedMindMap) {
        getNodeStructure(this.db, this.selectedMindMap).then(result => {
          this.treeData = result
        })
      }
    }
  },
  created: function() {
    this.loadDB()
    getAllMindMaps(this.db).then(result => {
      this.mindMaps = result
    })
  },
  mounted: function() {},
  methods: {
    loadDB() {
      this.db = getDB()
    },
    addMindMapBtn() {
      if (this.selectedMindMap === null) {
        this.selectedMindMap = ''
      }
      addMindMap(this.db, this.inputMindMapName)
      getAllMindMaps(this.db).then(result => {
        this.mindMaps = result
      })
    },
    addNodeBtn() {
      if (this.selected === null) {
        this.selected = ''
      }
      addNode(
        this.db,
        this.selectedMindMap,
        this.selected,
        this.inputContent,
        this.inputNotes
      ).then(d => {
        getNodeStructure(d.db, d.mindMapID).then(result => {
          // this.nodes = result
          // this.treeData = this.nodes
          this.treeData = result
          // this.treeData = this.sortNodeData(this.nodes)
        })
        return d
      })
    },
    sortNodeData(NodeData) {
      function replaceIDtoData(NodeData, node) {
        const childrenID = node.children
        if (childrenID.length === 0) {
          return node
        } else {
          const children = []
          childrenID.forEach(function(childID) {
            let child = {}
            NodeData.forEach(function(node) {
              if (node._id === childID) {
                child = node
              }
            })
            console.log(child)
            isRoot = false
            child.children = replaceIDtoData(NodeData, child)
            children.push(child)
          })
          return children
        }
      }

      const rootsNode = []
      NodeData.forEach(function(item) {
        if (item.parent === '') {
          rootsNode.push(Object.assign({}, item))
        }
      })
      for (let i = 0; i < rootsNode.length; i++) {
        const rootNode = rootsNode[i]
        if (rootNode.children.length !== 0) {
          rootsNode[i].children = replaceIDtoData(NodeData, rootNode)
        }
        const isRoot = true
      }
      return rootsNode
    }
  }
})
</script>

<style lang="scss" scoped></style>
