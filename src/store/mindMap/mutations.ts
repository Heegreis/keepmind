import { MutationTree } from 'vuex'
import { MindMapStateInterface } from './state'
import Vue from 'vue'

const mutation: MutationTree<MindMapStateInterface> = {
  someMutation(/* state: ExampleStateInterface */) {
    // your code
  },
  updateContentSize(state: MindMapStateInterface, payload) {
    Vue.set(state.contentSize, payload.id, payload.size)
  },
  updateNodeBlockSize(state: MindMapStateInterface, payload) {
    Vue.set(state.nodeBlockSize, payload.id, payload.size)
  }
}

export default mutation
