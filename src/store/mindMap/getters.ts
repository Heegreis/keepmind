import { GetterTree } from 'vuex'
import { StoreInterface } from '../index'
import state, { MindMapStateInterface } from './state'

const getters: GetterTree<MindMapStateInterface, StoreInterface> = {
  someAction(/* context */) {
    // your code
  },
  nodeBlockSize: (state) => (nodeID) => {
    if (state.nodeBlockSize[nodeID]) {
      return state.nodeBlockSize[nodeID]
    } else {
      return 0
    }
  }
}

export default getters
